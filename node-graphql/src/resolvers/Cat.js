const Cat = {
  id: root => root.id,
  name: root => root.name,
  color: root => root.color,
  favBrother: (root, args, ctx) => ctx.db.cat({ id: root.id }).favBrother(),
};

module.exports = {
  Cat
}
