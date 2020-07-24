const { IncomingWebhook } = require('@slack/webhook')

async function post(url, message) {
  const webhook = new IncomingWebhook(url)
  await webhook.send({
    text: message,
    icon_emoji: ':microscope:',
  })
}

module.exports = post
