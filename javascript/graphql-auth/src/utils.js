const { verify } = require('jsonwebtoken')

const APP_SECRET = 'appsecret321'

function getUserId(req) {
  const Authorization = req.headers.authorization
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET)
    return verifiedToken && verifiedToken.userId
  }
}

module.exports = {
  getUserId,
  APP_SECRET,
}
