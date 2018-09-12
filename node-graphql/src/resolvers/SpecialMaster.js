const SpecialMaster = {
  id: root => root.id,
  catBrothers: (root, args, ctx) => ctx.db.master({ id: root.id }).catz(),
};

module.exports = {
  SpecialMaster
}
