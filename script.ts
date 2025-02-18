#!/usr/bin/env bun

import { readdir, readFile, writeFile, stat } from 'fs/promises'
import { join } from 'path'

// Regular expression to match the SQLite datasource configuration,
// ignoring spacing differences.
const oldDatasourcePattern =
  /datasource\s+db\s*{[^}]*provider\s*=\s*"sqlite"[^}]*url\s*=\s*"file:\.\/dev\.db"[^}]*}/gm

const newDatasource = `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}`

async function processSubdirectory(subDirPath: string) {
  // Assume the prisma schema file is located at `<subDir>/prisma/schema.prisma`
  const prismaSchemaPath = join(subDirPath, 'prisma', 'schema.prisma')

  try {
    const schemaContent = await readFile(prismaSchemaPath, 'utf8')

    if (oldDatasourcePattern.test(schemaContent)) {
      console.log(`Updating schema in ${prismaSchemaPath}...`)
      const newContent = schemaContent.replace(
        oldDatasourcePattern,
        newDatasource,
      )
      await writeFile(prismaSchemaPath, newContent, 'utf8')
    } else {
      console.log(`No matching datasource block found in ${prismaSchemaPath}.`)
    }
  } catch (error: any) {
    // If the file doesn't exist or another error occurs, skip this directory.
    console.error(`Skipping ${subDirPath}: ${error.message}`)
    return
  }
}

async function main() {
  // The root directory is provided as a command-line argument,
  // or defaults to the current working directory.
  const rootDir = '/Users/ankur/Work/constants/prisma-examples/orm'

  let entries
  try {
    entries = await readdir(rootDir, { withFileTypes: true })
  } catch (error: any) {
    console.error(`Failed to read directory ${rootDir}: ${error.message}`)
    process.exit(1)
  }

  // Process each subdirectory
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subDirPath = join(rootDir, entry.name)
      // Optionally, check if a package.json exists to ensure it's a project.
      try {
        const pkgPath = join(subDirPath, 'package.json')
        await stat(pkgPath)
      } catch {
        console.log(`Skipping ${subDirPath} (no package.json found)`)
        continue
      }

      await processSubdirectory(subDirPath)
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
