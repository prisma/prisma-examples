const AuthPayload = {
  token: root => root.token,
  user: root => root.user,
}

module.exports = {
  AuthPayload,
}
