"use strict";
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
require("dotenv/config");
var server_1 = require("@apollo/server");
var hapi_1 = require("@as-integrations/hapi");
var hapi_2 = require("@hapi/hapi");
var schema_1 = require("./schema");
var context_1 = require("./context");
function startServer() {
    return __awaiter(this, void 0, void 0, function () {
        var apollo, app;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apollo = new server_1.ApolloServer({
                        schema: schema_1.schema,
                    });
                    return [4 /*yield*/, apollo.start()];
                case 1:
                    _a.sent();
                    app = new hapi_2.Server({
                        port: 4000,
                    });
                    return [4 /*yield*/, app.register({
                            plugin: hapi_1.default,
                            options: {
                                path: '/graphql',
                                context: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    return [2 /*return*/, (context_1.context)];
                                }); }); },
                                apolloServer: apollo,
                            }
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, app.start()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
startServer()
    .then(function () {
    console.log("\uD83D\uDE80 Server ready at: http://localhost:4000/graphql\n\u2B50\uFE0F See sample queries: http://pris.ly/e/ts/graphql-hapi#using-the-graphql-api\n");
})
    .catch(function (err) { return console.log(err); });
