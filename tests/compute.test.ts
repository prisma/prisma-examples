import { readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { execa } from 'execa'
import { describe, expect, test } from 'vitest'

const repositoryRoot = path.resolve(import.meta.dirname, '..')
const supportedFrameworks = new Set([
  'astro',
  'hono',
  'nextjs',
  'tanstack-start',
])
const databaseTemplateIds = new Set(['hono', 'nextjs', 'tanstack-start'])
const packageManager = 'bun@1.3.14'
const lockfileNames = new Set([
  'bun.lock',
  'bun.lockb',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
])

// A framework build does not prove that Composer emitted a bootable bundle.
// Database templates may return 500 here, but any response proves they booted.
const bundleVerifyScript = `import path from 'node:path'
import { rm } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'

const port = await new Promise<number>((resolve, reject) => {
  const server = createServer()
  server.once('error', reject)
  server.listen(0, '127.0.0.1', () => {
    const address = server.address()
    if (address === null || typeof address === 'string') {
      server.close()
      reject(new Error('could not allocate a local port'))
      return
    }
    server.close((error) => {
      if (error) reject(error)
      else resolve(address.port)
    })
  })
})

let child
try {
  const service = (await import('./src/service.ts')).default
  const control = await import(\`\${service.build.extension}/control\`)
  const bundle = await control.assemble({
    cwd: process.cwd(),
    address: 'ci-verify',
    build: service.build,
  })
  const entry = path.join(bundle.dir, bundle.entry)
  child = spawn(process.execPath, [entry], {
    env: {
      ...process.env,
      PORT: String(port),
      DATABASE_URL: 'postgresql://placeholder:placeholder@localhost:5432/db',
    },
    stdio: 'inherit',
  })
  let exited = false
  child.once('exit', () => {
    exited = true
  })
  const deadline = Date.now() + 60_000
  let status
  while (status === undefined && !exited && Date.now() < deadline) {
    try {
      status = (await fetch(\`http://127.0.0.1:\${port}/\`)).status
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }
  if (status === undefined) {
    throw new Error(
      exited
        ? 'the assembled bundle exited before serving a request'
        : 'the assembled bundle never answered on its port',
    )
  }
  console.log(\`bundle answered with HTTP \${status}\`)
} finally {
  child?.kill('SIGKILL')
  await rm(path.join(process.cwd(), '.prisma-composer'), {
    recursive: true,
    force: true,
  })
}
`

async function verifyDeployBundle(templateDirectory: string) {
  const scriptPath = path.join(templateDirectory, '.bundle-verify.mts')
  await writeFile(scriptPath, bundleVerifyScript)
  try {
    await execa('bun', ['.bundle-verify.mts'], {
      cwd: templateDirectory,
      stdio: 'inherit',
    })
  } finally {
    await rm(scriptPath, { force: true })
  }
}

interface TemplateManifest {
  version: number
  templates: Array<{
    id: string
    name: string
    description: string
    path: string
    framework: string
  }>
}

describe('Prisma Compute examples', () => {
  test('the template manifest references deployable root folders', async () => {
    const manifestPath = path.join(repositoryRoot, 'compute', 'templates.json')
    const manifestContents = await readFile(manifestPath, 'utf8')
    const manifest = JSON.parse(manifestContents) as TemplateManifest

    expect(Buffer.byteLength(manifestContents)).toBeLessThanOrEqual(256 * 1024)
    expect(manifest.version).toBe(1)
    expect(manifest.templates).toHaveLength(4)
    expect(manifest.templates.length).toBeLessThanOrEqual(100)
    expect(manifest.templates.map((template) => template.id)).toEqual([
      'hono',
      'nextjs',
      'tanstack-start',
      'personal-site',
    ])
    expect(
      new Set(manifest.templates.map((template) => template.id)).size,
    ).toBe(manifest.templates.length)

    for (const template of manifest.templates) {
      expect(template.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      expect(template.id.length).toBeLessThanOrEqual(64)
      expect(template.name.trim()).not.toBe('')
      expect(template.description.trim()).not.toBe('')
      expect(supportedFrameworks.has(template.framework)).toBe(true)

      expect(template.path).toBe(`compute/${template.id}`)
      expect(template.path).toBe(path.posix.normalize(template.path))
      expect(template.path).not.toMatch(/(?:^|\/)\.\.(?:\/|$)|\\|%/)

      const templateDirectory = path.join(repositoryRoot, template.path)
      const rootEntries = await readdir(templateDirectory)
      expect(
        rootEntries.filter((entry) => entry === 'prisma-composer.config.ts'),
      ).toHaveLength(1)
      expect(rootEntries).toContain('module.ts')
      expect(rootEntries.includes('prisma.config.ts')).toBe(
        databaseTemplateIds.has(template.id),
      )
      expect(rootEntries).not.toContain('prisma-next.config.ts')
      expect(rootEntries).not.toContain('prisma.compute.json')
      expect(rootEntries.filter((entry) => lockfileNames.has(entry))).toEqual([
        'bun.lock',
      ])

      const packageJson = JSON.parse(
        await readFile(path.join(templateDirectory, 'package.json'), 'utf8'),
      ) as {
        dependencies?: Record<string, string>
        devDependencies?: Record<string, string>
        packageManager?: string
        scripts?: Record<string, string>
      }
      expect(packageJson.packageManager).toBe(packageManager)
      const isDatabaseTemplate = databaseTemplateIds.has(template.id)
      expect(packageJson.dependencies?.['@prisma/composer']).toBe(
        isDatabaseTemplate ? '0.11.0' : '0.10.0',
      )
      expect(packageJson.dependencies?.['@prisma/composer-prisma-cloud']).toBe(
        isDatabaseTemplate ? '0.11.0' : '0.10.0',
      )
      expect(packageJson.devDependencies?.['prisma']).toBe(
        isDatabaseTemplate ? '8.0.0-rc.7' : '8.0.0-rc.6',
      )
      expect(packageJson.devDependencies?.['@prisma/composer-cli']).toBe(
        isDatabaseTemplate ? undefined : '0.10.0',
      )
      expect(
        packageJson.dependencies?.['@prisma/composer-cli'],
      ).toBeUndefined()
      if (databaseTemplateIds.has(template.id)) {
        expect(packageJson.dependencies?.['@prisma/orm-postgres']).toBe(
          '8.0.0-rc.4',
        )
        expect(packageJson.scripts?.['contract:emit']).toBe(
          'prisma contract emit',
        )
      } else {
        expect(
          packageJson.dependencies?.['@prisma/orm-postgres'],
        ).toBeUndefined()
        expect(packageJson.scripts?.['contract:emit']).toBeUndefined()
      }

      const workflowPath = path.join(
        templateDirectory,
        '.github/workflows/prisma-deploy.yml',
      )
      const workflowContents = await readFile(workflowPath, 'utf8')
      expect(workflowContents).toContain('prisma/cloud-deploy-action@v1')
      expect(workflowContents).toContain('id-token: write')
      expect(workflowContents).toContain(
        "prisma-deploy-${{ github.event_name == 'delete' && github.event.ref || github.ref_name }}",
      )

      const computeScripts = Object.entries(packageJson.scripts ?? {}).filter(
        ([name]) => name.startsWith('compute:'),
      )
      expect(computeScripts).toHaveLength(
        databaseTemplateIds.has(template.id) ? 4 : 3,
      )
      for (const [, command] of computeScripts) {
        expect(command).toMatch(/^prisma /)
      }

      await execa('bun', ['install', '--frozen-lockfile', '--ignore-scripts'], {
        cwd: templateDirectory,
      })
      await execa('bun', ['run', 'build'], { cwd: templateDirectory })

      if (databaseTemplateIds.has(template.id)) {
        // The generated contract must match the source contract committed with it.
        await execa(
          'git',
          ['diff', '--exit-code', '--', `${template.path}/src/prisma`],
          { cwd: repositoryRoot },
        )
      }

      await verifyDeployBundle(templateDirectory)
    }
  })
})
