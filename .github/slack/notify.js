const { spawnSync } = require('child_process')

const post = require('./post')

async function run() {
  const url = process.env.webhook
  const message = process.argv[2]

  const gitBranchName = spawnSync('git', ['branch', '--show-current'], {
    encoding: 'utf-8',
  })
  const branchName = gitBranchName.stdout.trim()

  await post(url, `(Branch: ${branchName}) ` + message)
}

run().catch((err) => {
  throw err
})
