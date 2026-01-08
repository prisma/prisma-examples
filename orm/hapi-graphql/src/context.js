"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
var adapter_pg_1 = require("@prisma/adapter-pg");
var client_1 = require("../prisma/generated/client");
var pool = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
var prisma = new client_1.PrismaClient({ adapter: pool });
exports.context = {
    prisma: prisma,
};
