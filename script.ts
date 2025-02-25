#!/usr/bin/env bun

import { readdir, stat } from 'fs/promises'
import { join } from 'path'
import { spawn } from 'child_process'

/**
 * Runs `npm install` in the given directory.
 */
async function runNpmInstall(subDirPath: string) {
  return new Promise<void>((resolve, reject) => {
    console.log(`Running npm install in ${subDirPath}...`)
    const child = spawn('npm', ['install'], {
      cwd: subDirPath,
      stdio: 'inherit',
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(
          new Error(
            `npm install failed in ${subDirPath} with exit code ${code}`,
          ),
        )
      }
    })

    child.on('error', (error: any) => {
      reject(
        new Error(
          `Failed to run npm install in ${subDirPath}: ${error.message}`,
        ),
      )
    })
  })
}

async function main() {
  // Set the root directory as provided.
  const rootDir = '/Users/ankur/Work/constants/prisma-examples/orm'

  let entries
  try {
    entries = await readdir(rootDir, { withFileTypes: true })
  } catch (error: any) {
    console.error(`Failed to read directory ${rootDir}: ${error.message}`)
    process.exit(1)
  }

  // Gather npm install tasks from subdirectories that have a package.json
  const tasks: Promise<void>[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const subDirPath = join(rootDir, entry.name)
    try {
      await stat(join(subDirPath, 'package.json'))
    } catch {
      console.log(`Skipping ${subDirPath} (no package.json found)`)
      continue
    }

    tasks.push(runNpmInstall(subDirPath))
  }

  // Run all npm install tasks in parallel
  try {
    await Promise.all(tasks)
    console.log('All npm install tasks completed successfully.')
  } catch (error: any) {
    console.error(error.message)
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
