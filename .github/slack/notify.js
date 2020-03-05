const post = require('./post')

async function run() {
	const url = process.env.webhook
	const message = process.argv[2]

	await post(url, message)
}

run().catch((err) => {
	throw err
})
