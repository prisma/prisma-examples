const glob = require('glob')
const path = require('path')

const core = require('@actions/core')

const getTestName = (filePath) => {
  return path.dirname(filePath).split(path.sep).pop()
}

const getBaseFolder = (filePath) => {
  let pathTokens = path.dirname(filePath).split(path.sep)
  pathTokens.pop()
  return pathTokens.pop()
}

async function main() {
  const cwd = process.cwd()

  const files = glob
    .sync('**/package.json', {
      cwd: cwd,
      ignore: '**/node_modules/**',
    })
    .filter((file) => {
      const folder = getBaseFolder(file)
      const allowList = ['javascript', 'typescript', 'databases', 'data-modeling']
      return allowList.includes(folder)
    })
    .map((file) => {
      const folder = getBaseFolder(file)
      const test = getTestName(file)
      return { path: `${folder}/${test}` }
    })

  core.setOutput('matrix', JSON.stringify({ include: files }))
}

main()
