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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
var http = require("http");
var url = require("url");
var express = require("express");
var bcrypt = require("bcrypt");
var passport = require("passport");
var flash = require("express-flash");
var session = require("express-session");
var initializePassport = require("./passport-config");
var MyServer = /** @class */ (function () {
    // Accepts two arguments:
    // udb = user database
    // gdb = games database
    function MyServer(udb, gdb) {
        var _this = this;
        // Server stuff: use express instead of http.createServer
        this.server = express();
        this.port = process.env.PORT;
        this.router = express.Router();
        this.users = udb;
        this.games = gdb;
        // initializePassport(passport, (username) => this.users.get(username));
        // from https://enable-cors.org/server_expressjs.html
        this.router.use(function (request, response, next) {
            response.header("Content-Type", "application/json");
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "*");
            next();
        });
        // Serve static pages from a particular path.
        this.server.use("/", express.static("./html"));
        // NEW: handle POST in JSON format
        this.server.use(express.json());
        //flash
        this.server.use(flash());
        // this.server.use(
        // 	session({
        // 		secret: process.env.SESSION_SECRET,
        // 		resave: false,
        // 		saveUninitialized: false,
        // 	})
        // );
        // this.server.use(passport.initialize());
        // this.server.use(passport.session());
        //login
        this.router.post("/users/login", passport.authenticate("local"), this.loginHandler.bind(this));
        //home
        this.router.post("/home", this.homeHandler.bind(this));
        //register
        this.router.post("/register", this.registerHandler.bind(this));
        // Set a single handler for a route.
        this.router.post("/games/create", this.createHandler.bind(this));
        // Set multiple handlers for a route, in sequence.
        this.router.post("/games/readall", 
        //this.errorHandler.bind(this),
        this.readallHandler.bind(this));
        this.router.post("/games/read", this.readHandler.bind(this));
        this.router.post("/games/update", [
            // this.errorHandler.bind(this),
            this.updateHandler.bind(this),
        ]);
        this.router.post("/users/create", this.createUserHandler.bind(this));
        this.router.post("/users/read", this.readUserHandler.bind(this));
        this.router.post("/users/update", this.updateUserHandler.bind(this));
        this.router.post("/users/delete", [
            // this.errorHandler.bind(this),
            this.deleteHandler.bind(this),
        ]);
        // Set a fall-through handler if nothing matches.
        this.router.post("*", function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.send(JSON.stringify({ result: "command-not-found" }));
                return [2 /*return*/];
            });
        }); });
        // Start up the counter endpoint at '/counter'.
        this.server.use("/counter", this.router);
    }
    MyServer.prototype.registerHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerUser(request.body.email, request.body.name, request.body.password, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.homeHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, response.redirect("html/home.html")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.loginHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, response.redirect("/home.html")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.registerUser = function (name, email, password, response) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 1:
                        hashedPassword = _b.sent();
                        return [4 /*yield*/, this.users.put(name, "{name:" + name + ",email:" + email + ", password:" + hashedPassword + " }")];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _a = _b.sent();
                        return [4 /*yield*/, response.redirect("/register")];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.errorHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.users.isFound(request.params["userId"] + "-" + request.body.name)];
                    case 1:
                        value = _a.sent();
                        //	console.log("result from database.isFound: " + JSON.stringify(value));
                        if (!value) {
                            response.write(JSON.stringify({ result: "error" }));
                            response.end();
                        }
                        else {
                            next();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.createHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createGame(request.body.name, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.readallHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readallGames(request, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.readHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readGame(request.body.name, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.updateHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateGame(request.body.game, request.body.user, request.body.own, request.body.add, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.createUserHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createUser(request.body.name, request.body.password, request.body.img, request.body.zip, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.readUserHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readUser(request.body.id, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.updateUserHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateUser(request.body.id, request.body.img, request.body.zip, request.body["new"], request.body.own, request.body.game, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.deleteHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteUser(request.body.id, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.listen = function (port) {
        this.server.listen(port);
    };
    MyServer.prototype.createGame = function (name, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("creating game named '" + name + "'");
                        //await this.theDatabase.put(name, 0);
                        return [4 /*yield*/, this.games.put(name, "{name:" + name + ",own:[],want:[]}")];
                    case 1:
                        //await this.theDatabase.put(name, 0);
                        _a.sent();
                        response.write(JSON.stringify({ result: "created", name: name }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.errorCounter = function (name, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.write(JSON.stringify({ result: "error" }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.readallGames = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var games;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.games.getAll()];
                    case 1:
                        games = _a.sent();
                        console.log(games.data);
                        response.write(JSON.stringify({ result: "read", games: games.data }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.readGame = function (name, response) {
        return __awaiter(this, void 0, void 0, function () {
            var game;
            return __generator(this, function (_a) {
                game = {
                    name: "Azul",
                    id: 12345,
                    own: [90876, 27465],
                    want: [16254, 26443]
                };
                response.write(JSON.stringify({ result: "read", game: game }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.updateGame = function (game, user, own, add, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //await this.theDatabase.put(name, value);
                response.write(JSON.stringify({ result: "updated", game: game }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.createUser = function (name, password, img, zip, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.write(JSON.stringify({ result: "created", name: name, id: 17435 }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.readUser = function (id, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = {
                    name: "ChessFreak",
                    id: 69420,
                    zip: "11226",
                    picture: "knight.jpg",
                    own: [65554, 92845],
                    want: [29999]
                };
                response.write(JSON.stringify({ result: "read", user: user }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.updateUser = function (id, img, zip, add, own, game, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.write(JSON.stringify({ result: "updated", id: id }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.deleteUser = function (id, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //await this.theDatabase.del(name);
                response.write(JSON.stringify({ result: "deleted", id: id }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    return MyServer;
}());
exports.MyServer = MyServer;
