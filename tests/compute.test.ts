import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

import { execa } from 'execa'
import { describe, expect, test } from 'vitest'

const repositoryRoot = path.resolve(import.meta.dirname, '..')
const supportedFrameworks = new Set(['hono', 'nextjs', 'tanstack-start'])
const smokeRouteByFramework = new Map([
  ['hono', 'src/index.ts'],
  ['nextjs', 'src/app/page.tsx'],
  ['tanstack-start', 'src/routes/index.tsx'],
])
const packageManager = 'bun@1.3.14'
const lockfileNames = new Set([
  'bun.lock',
  'bun.lockb',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
])

interface TemplateManifest {
  version: number
  templates: Array<{
    id: string
    name: string
    description: string
    path: string
    framework: string
    smoke: {
      path: string
      expectedText: string
    }
  }>
}

describe('Prisma Compute examples', () => {
  test('the template manifest references deployable root folders', async () => {
    const manifestPath = path.join(repositoryRoot, 'compute', 'templates.json')
    const manifestContents = await readFile(manifestPath, 'utf8')
    const manifest = JSON.parse(manifestContents) as TemplateManifest

    expect(Buffer.byteLength(manifestContents)).toBeLessThanOrEqual(256 * 1024)
    expect(manifest.version).toBe(1)
    expect(manifest.templates).toHaveLength(3)
    expect(manifest.templates.length).toBeLessThanOrEqual(100)
    expect(manifest.templates.map((template) => template.id)).toEqual([
      'hono',
      'nextjs',
      'tanstack-start',
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

      expect(template.smoke.path).toMatch(/^\/(?!\/)/)
      expect(template.smoke.path.length).toBeLessThanOrEqual(128)
      expect(template.smoke.path).not.toMatch(/:\/\/|\?|#|\\|%|\.\./)
      expect(template.smoke.expectedText.length).toBeGreaterThan(0)
      expect(template.smoke.expectedText.length).toBeLessThanOrEqual(256)

      const templateDirectory = path.join(repositoryRoot, template.path)
      const rootEntries = await readdir(templateDirectory)
      expect(
        rootEntries.filter((entry) => entry === 'prisma-composer.config.ts'),
      ).toHaveLength(1)
      expect(rootEntries).toContain('module.ts')
      expect(rootEntries).toContain('prisma.config.ts')
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
      expect(packageJson.dependencies?.['@prisma/composer']).toBe('0.10.0')
      expect(packageJson.dependencies?.['@prisma/composer-prisma-cloud']).toBe(
        '0.10.0',
      )
      expect(packageJson.dependencies?.['@prisma/orm-postgres']).toBe(
        '8.0.0-rc.4',
      )
      // The consolidated Prisma CLI runs every ORM and cloud script; the
      // matching @prisma/composer-cli provides the local prisma-composer bin
      // that prisma/cloud-deploy-action prefers over its npx fallback, so the
      // deploy runs the same Composer version the app depends on.
      expect(packageJson.devDependencies?.['prisma']).toBe('8.0.0-rc.6')
      expect(packageJson.devDependencies?.['@prisma/composer-cli']).toBe(
        '0.10.0',
      )
      expect(packageJson.scripts?.['contract:emit']).toBe(
        'prisma contract emit',
      )

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
      expect(computeScripts).toHaveLength(4)
      for (const [, command] of computeScripts) {
        expect(command).toMatch(/^prisma /)
      }

      await execa(
        'bun',
        ['install', '--frozen-lockfile', '--ignore-scripts'],
        { cwd: templateDirectory },
      )
      await execa('bun', ['run', 'build'], { cwd: templateDirectory })

      // Every build re-emits the contract, so a contract.prisma edit that was
      // committed without re-emitting shows up here as a dirty working tree.
      await execa(
        'git',
        ['diff', '--exit-code', '--', `${template.path}/src/prisma`],
        { cwd: repositoryRoot },
      )

      const smokeRoute = smokeRouteByFramework.get(template.framework)
      expect(smokeRoute).toBeDefined()
      const smokeRouteContents = await readFile(
        path.join(templateDirectory, smokeRoute!),
        'utf8',
      )
      expect(smokeRouteContents.includes(template.smoke.expectedText)).toBe(
        true,
      )
    }
  })
})
