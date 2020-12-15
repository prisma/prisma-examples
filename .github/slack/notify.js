const { spawnSync } = require('child_process')
const arg = require('arg')
const post = require('./post')

async function run() {
  const args = arg({
    '--branch-name': String,
  })
  let branchName = args['--branch-name']
  const url = process.env.webhook
  const message = args._[0]

  const gitBranchName = spawnSync('git', ['branch', '--show-current'], {
    encoding: 'utf-8',
  })
  branchName = branchName || gitBranchName.stdout.trim()

  await post(url, `(Branch: ${branchName}) ` + message)
}

run().catch((err) => {
  throw err
})
