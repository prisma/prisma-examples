"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.DateTime = void 0;
var nexus_1 = require("nexus");
var graphql_scalars_1 = require("graphql-scalars");
exports.DateTime = (0, nexus_1.asNexusMethod)(graphql_scalars_1.DateTimeResolver, 'date');
var Query = (0, nexus_1.objectType)({
    name: 'Query',
    definition: function (t) {
        t.nonNull.list.nonNull.field('allUsers', {
            type: 'User',
            resolve: function (_parent, _args, context) {
                return context.prisma.user.findMany();
            },
        });
        t.nullable.field('postById', {
            type: 'Post',
            args: {
                id: (0, nexus_1.intArg)(),
            },
            resolve: function (_parent, args, context) {
                return context.prisma.post.findUnique({
                    where: { id: args.id || undefined },
                });
            },
        });
        t.nonNull.list.nonNull.field('feed', {
            type: 'Post',
            args: {
                searchString: (0, nexus_1.stringArg)(),
                skip: (0, nexus_1.intArg)(),
                take: (0, nexus_1.intArg)(),
                orderBy: (0, nexus_1.arg)({
                    type: 'PostOrderByUpdatedAtInput',
                }),
            },
            resolve: function (_parent, args, context) {
                var or = args.searchString
                    ? {
                        OR: [
                            { title: { contains: args.searchString } },
                            { content: { contains: args.searchString } },
                        ],
                    }
                    : {};
                return context.prisma.post.findMany({
                    where: __assign({ published: true }, or),
                    take: args.take || undefined,
                    skip: args.skip || undefined,
                    orderBy: args.orderBy || undefined,
                });
            },
        });
        t.list.field('draftsByUser', {
            type: 'Post',
            args: {
                userUniqueInput: (0, nexus_1.nonNull)((0, nexus_1.arg)({
                    type: 'UserUniqueInput',
                })),
            },
            resolve: function (_parent, args, context) {
                return context.prisma.post.findMany({
                    where: {
                        published: false,
                        author: {
                            id: args.userUniqueInput.id || undefined,
                            email: args.userUniqueInput.email || undefined,
                        },
                    },
                });
            },
        });
    },
});
var Mutation = (0, nexus_1.objectType)({
    name: 'Mutation',
    definition: function (t) {
        var _this = this;
        t.nonNull.field('signupUser', {
            type: 'User',
            args: {
                data: (0, nexus_1.nonNull)((0, nexus_1.arg)({
                    type: 'UserCreateInput',
                })),
            },
            resolve: function (_, args, context) {
                var _a;
                var postData = (_a = args.data.posts) === null || _a === void 0 ? void 0 : _a.map(function (post) {
                    return { title: post.title, content: post.content || undefined };
                });
                return context.prisma.user.create({
                    data: {
                        name: args.data.name,
                        email: args.data.email,
                        posts: {
                            create: postData,
                        },
                    },
                });
            },
        });
        t.field('createDraft', {
            type: 'Post',
            args: {
                data: (0, nexus_1.nonNull)((0, nexus_1.arg)({
                    type: 'PostCreateInput',
                })),
                authorEmail: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve: function (_, args, context) {
                return context.prisma.post.create({
                    data: {
                        title: args.data.title,
                        content: args.data.content,
                        author: {
                            connect: { email: args.authorEmail },
                        },
                    },
                });
            },
        });
        t.field('togglePublishPost', {
            type: 'Post',
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
            },
            resolve: function (_, args, context) { return __awaiter(_this, void 0, void 0, function () {
                var post, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, context.prisma.post.findUnique({
                                    where: { id: args.id || undefined },
                                    select: {
                                        published: true,
                                    },
                                })];
                        case 1:
                            post = _a.sent();
                            return [2 /*return*/, context.prisma.post.update({
                                    where: { id: args.id || undefined },
                                    data: { published: !(post === null || post === void 0 ? void 0 : post.published) },
                                })];
                        case 2:
                            e_1 = _a.sent();
                            throw new Error("Post with ID ".concat(args.id, " does not exist in the database."));
                        case 3: return [2 /*return*/];
                    }
                });
            }); },
        });
        t.field('incrementPostViewCount', {
            type: 'Post',
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
            },
            resolve: function (_, args, context) {
                return context.prisma.post.update({
                    where: { id: args.id || undefined },
                    data: {
                        viewCount: {
                            increment: 1,
                        },
                    },
                });
            },
        });
        t.field('deletePost', {
            type: 'Post',
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
            },
            resolve: function (_, args, context) {
                return context.prisma.post.delete({
                    where: { id: args.id },
                });
            },
        });
    },
});
var User = (0, nexus_1.objectType)({
    name: 'User',
    definition: function (t) {
        t.nonNull.int('id');
        t.string('name');
        t.nonNull.string('email');
        t.nonNull.list.nonNull.field('posts', {
            type: 'Post',
            resolve: function (parent, _, context) {
                return context.prisma.post.findMany({
                    where: { authorId: parent.id || undefined },
                });
            },
        });
    },
});
var Post = (0, nexus_1.objectType)({
    name: 'Post',
    definition: function (t) {
        var _this = this;
        t.nonNull.int('id');
        t.nonNull.field('createdAt', { type: 'DateTime' });
        t.nonNull.field('updatedAt', { type: 'DateTime' });
        t.nonNull.string('title');
        t.string('content');
        t.nonNull.boolean('published');
        t.nonNull.int('viewCount');
        t.field('author', {
            type: 'User',
            resolve: function (parent, _, context) { return __awaiter(_this, void 0, void 0, function () {
                var post;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, context.prisma.post.findUnique({
                                where: { id: parent.id || undefined },
                                include: {
                                    author: true,
                                },
                            })];
                        case 1:
                            post = _a.sent();
                            return [2 /*return*/, post.author];
                    }
                });
            }); },
        });
    },
});
var SortOrder = (0, nexus_1.enumType)({
    name: 'SortOrder',
    members: ['asc', 'desc'],
});
var PostOrderByUpdatedAtInput = (0, nexus_1.inputObjectType)({
    name: 'PostOrderByUpdatedAtInput',
    definition: function (t) {
        t.nonNull.field('updatedAt', { type: 'SortOrder' });
    },
});
var UserUniqueInput = (0, nexus_1.inputObjectType)({
    name: 'UserUniqueInput',
    definition: function (t) {
        t.int('id');
        t.string('email');
    },
});
var PostCreateInput = (0, nexus_1.inputObjectType)({
    name: 'PostCreateInput',
    definition: function (t) {
        t.nonNull.string('title');
        t.string('content');
    },
});
var UserCreateInput = (0, nexus_1.inputObjectType)({
    name: 'UserCreateInput',
    definition: function (t) {
        t.nonNull.string('email');
        t.string('name');
        t.list.nonNull.field('posts', { type: 'PostCreateInput' });
    },
});
exports.schema = (0, nexus_1.makeSchema)({
    types: [
        Query,
        Mutation,
        Post,
        User,
        UserUniqueInput,
        UserCreateInput,
        PostCreateInput,
        SortOrder,
        PostOrderByUpdatedAtInput,
        exports.DateTime,
    ],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            {
                module: require.resolve('../prisma/generated/client'),
                alias: 'prisma',
            },
        ],
    },
});
