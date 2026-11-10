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
const databaseTemplateIds = new Set([
  'hono',
  'nextjs',
  'tanstack-start',
  'room-booking-prisma-template',
])
const packageManager = 'bun@1.3.14'
// @prisma/composer matches the @prisma/composer-cli that this prisma depends
// on; @prisma/orm-postgres is the peer @prisma/composer-prisma-cloud requires.
// alchemy and effect must be the versions this Composer release pins.
const firstPartyToolchain = {
  composer: '0.38.0',
  prisma: '8.0.0-rc.33',
  ormPostgres: '8.0.0-rc.23',
  alchemy: '2.0.0-beta.84',
  effect: '4.0.5',
}
// Community templates pin their own toolchain and have no compute:* scripts.
const communityToolchains: Record<string, typeof firstPartyToolchain> = {
  'room-booking-prisma-template': firstPartyToolchain,
}
const lockfileNames = new Set([
  'bun.lock',
  'bun.lockb',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
])

// A framework build does not prove that Composer emitted a bootable bundle.
// Database templates may return 500 here, but any response proves they booted.
// The bundle boots from a copy outside the repository, so it cannot resolve
// packages from the template's node_modules that deploy would not ship.
const bundleVerifyScript = `import os from 'node:os'
import path from 'node:path'
import { cp, mkdtemp, rm } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { pathToFileURL } from 'node:url'

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
const isolated = await mkdtemp(path.join(os.tmpdir(), 'compute-bundle-'))
try {
  const service = (await import(pathToFileURL(path.resolve(process.argv[2])).href))
    .default
  const control = await import(\`\${service.build.extension}/control\`)
  const bundle = await control.assemble({
    cwd: process.cwd(),
    address: 'ci-verify',
    build: service.build,
  })
  await cp(bundle.dir, isolated, { recursive: true, verbatimSymlinks: true })
  const entry = path.join(isolated, bundle.entry)
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
  await rm(isolated, { recursive: true, force: true })
}
`

async function verifyDeployBundle(
  templateDirectory: string,
  serviceModule: string,
) {
  const scriptPath = path.join(templateDirectory, '.bundle-verify.mts')
  await writeFile(scriptPath, bundleVerifyScript)
  try {
    await execa('bun', ['.bundle-verify.mts', serviceModule], {
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
    expect(manifest.templates).toHaveLength(5)
    expect(manifest.templates.length).toBeLessThanOrEqual(100)
    expect(manifest.templates.map((template) => template.id)).toEqual([
      'hono',
      'nextjs',
      'tanstack-start',
      'personal-site',
      'room-booking-prisma-template',
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
      // Composer reads its config only from the composer section of
      // prisma.config.ts and refuses the retired file beside it.
      expect(rootEntries).not.toContain('prisma-composer.config.ts')
      expect(rootEntries).toContain('module.ts')
      expect(rootEntries).toContain('prisma.config.ts')
      expect(
        await readFile(
          path.join(templateDirectory, 'prisma.config.ts'),
          'utf8',
        ),
      ).toMatch(/composer:\s*composer\(/)
      expect(rootEntries.includes('migrations')).toBe(
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
        overrides?: Record<string, string>
        packageManager?: string
        scripts?: Record<string, string>
      }
      expect(packageJson.packageManager).toBe(packageManager)
      const toolchain = communityToolchains[template.id] ?? firstPartyToolchain
      expect(packageJson.dependencies?.['@prisma/composer']).toBe(
        toolchain.composer,
      )
      expect(packageJson.dependencies?.['@prisma/composer-prisma-cloud']).toBe(
        toolchain.composer,
      )
      expect(packageJson.devDependencies?.['prisma']).toBe(toolchain.prisma)
      expect(
        packageJson.dependencies?.['alchemy'] ??
          packageJson.devDependencies?.['alchemy'],
      ).toBe(toolchain.alchemy)
      expect(packageJson.overrides?.['effect']).toBe(toolchain.effect)
      expect(
        packageJson.devDependencies?.['@prisma/composer-cli'],
      ).toBeUndefined()
      expect(packageJson.dependencies?.['@prisma/composer-cli']).toBeUndefined()
      if (databaseTemplateIds.has(template.id)) {
        expect(packageJson.dependencies?.['@prisma/orm-postgres']).toBe(
          toolchain.ormPostgres,
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
        template.id in communityToolchains
          ? 0
          : databaseTemplateIds.has(template.id)
            ? 4
            : 3,
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
        await execa(
          'bun',
          ['run', 'prisma', 'migration', 'check', '--space', 'app'],
          { cwd: templateDirectory, stdio: 'inherit' },
        )
      }

      await verifyDeployBundle(
        templateDirectory,
        rootEntries.includes('service.ts')
          ? './service.ts'
          : './src/service.ts',
      )
    }
  })

  // A first deploy into a project the Console created has no default
  // database, so Composer 0.29 cannot resolve an inherited database region.
  test('templates with a database set an explicit region', async () => {
    const manifest = JSON.parse(
      await readFile(
        path.join(repositoryRoot, 'compute', 'templates.json'),
        'utf8',
      ),
    ) as TemplateManifest

    for (const template of manifest.templates) {
      const templateDirectory = path.join(repositoryRoot, template.path)
      if (!(await readdir(templateDirectory)).includes('migrations')) {
        continue
      }

      const config = (
        await readFile(path.join(templateDirectory, 'prisma.config.ts'), 'utf8')
      )
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/(^|[^:])\/\/.*$/gm, '$1')
      expect(config, template.id).toMatch(
        /prismaCloud\(\{\s*region:\s*['"][a-z0-9-]+['"]/,
      )
    }
  })
})
