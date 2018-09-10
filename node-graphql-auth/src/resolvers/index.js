const { Query } = require("./Query");
const { Mutation } = require("./Mutation");
const { AuthPayload } = require("./AuthPayload");
const { User } = require("./User");

export const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  User
};
