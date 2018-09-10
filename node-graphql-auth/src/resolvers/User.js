const User = {
  id: root => root.id,
  email: root => root.email,
  name: root => root.name
};

module.exports = {
  User
}