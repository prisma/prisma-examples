import { spawn, type ChildProcess } from 'node:child_process'
import * as net from 'node:net'
import * as path from 'node:path'
import * as fs from 'node:fs'

export interface PrismaDevServer {
  url: string
  stop: () => Promise<void>
}

async function waitForPort(
  host: string,
  port: number,
  timeoutMs = 60000,
): Promise<void> {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise<void>((resolve, reject) => {
        const socket = net.createConnection({ host, port })
        socket.once('connect', () => {
          socket.destroy()
          resolve()
        })
        socket.once('error', reject)
      })
      return
    } catch {
      await new Promise((r) => setTimeout(r, 100))
    }
  }
  throw new Error(`Timeout waiting for ${host}:${port}`)
}

export async function startPrismaDev(): Promise<PrismaDevServer> {
  console.log('Starting Prisma Dev server as child process...')

  // Create a simple script to start the server
  const scriptContent = `
import { context, trace } from '@opentelemetry/api';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { BasicTracerProvider } from '@opentelemetry/sdk-trace-base';
import { startPrismaDevServer } from '@prisma/dev';

context.setGlobalContextManager(new AsyncLocalStorageContextManager());
trace.setGlobalTracerProvider(new BasicTracerProvider());

const server = await startPrismaDevServer({ databaseIdleTimeoutMillis: 300000 });
console.log(server.database.connectionString);

process.once('SIGTERM', async () => {
  await server.close();
  process.exit(0);
});

process.once('SIGINT', async () => {
  await server.close();
  process.exit(0);
});
`

  const uniqueId = Math.random().toString(36).substring(2, 15)
  const tempScriptPath = path.join(
    process.cwd(),
    `.prisma-dev-server-${uniqueId}.mjs`,
  )
  fs.writeFileSync(tempScriptPath, scriptContent)

  return new Promise((resolve, reject) => {
    let url = ''
    let childProcess: ChildProcess

    childProcess = spawn('node', [tempScriptPath], {
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: false,
    })

    const timeout = setTimeout(() => {
      childProcess.kill()
      fs.unlinkSync(tempScriptPath)
      reject(new Error('Timeout waiting for Prisma Dev server URL'))
    }, 60000)

    childProcess.stdout?.on('data', async (data: Buffer) => {
      const output = data.toString().trim()
      console.log(`[prisma-dev] ${output}`)

      if (output.startsWith('postgres://')) {
        url = output
        clearTimeout(timeout)

        const urlObj = new URL(url)
        const host = urlObj.hostname
        const port = parseInt(urlObj.port, 10)

        // Replace localhost with 127.0.0.1 for consistency
        const fixedUrl = url.replace('localhost', '127.0.0.1')
        url = fixedUrl

        console.log(`Prisma Dev server started: ${url}`)
        console.log(`Waiting for database at ${host}:${port}...`)

        try {
          await waitForPort(host, port)
          console.log('Database is ready!')

          resolve({
            url,
            stop: async () => {
              console.log('Stopping Prisma Dev server...')
              childProcess.kill('SIGTERM')
              // Wait for process to exit
              await new Promise<void>((res) => {
                childProcess.on('exit', () => res())
                setTimeout(res, 5000) // Timeout after 5s
              })
              try {
                fs.unlinkSync(tempScriptPath)
              } catch {}
              console.log('Prisma Dev server stopped.')
            },
          })
        } catch (err) {
          childProcess.kill()
          fs.unlinkSync(tempScriptPath)
          reject(err)
        }
      }
    })

    childProcess.stderr?.on('data', (data: Buffer) => {
      console.error(`[prisma-dev stderr] ${data.toString().trim()}`)
    })

    childProcess.on('error', (err) => {
      clearTimeout(timeout)
      try {
        fs.unlinkSync(tempScriptPath)
      } catch {}
      reject(err)
    })

    childProcess.on('exit', (code) => {
      if (!url) {
        clearTimeout(timeout)
        try {
          fs.unlinkSync(tempScriptPath)
        } catch {}
        reject(new Error(`Prisma Dev server exited with code ${code}`))
      }
    })
  })
}
