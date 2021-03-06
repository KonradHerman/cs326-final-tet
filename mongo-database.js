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
var Database = /** @class */ (function () {
    function Database(collectionName) {
        var _this = this;
        this.MongoClient = require("mongodb").MongoClient;
        this.dbName = "boredgames";
        // Assign password to uri
        this.password = process.env.PASSWORD;
        this.uri =
            "mongodb+srv://konrad:" +
                this.password +
                "@cluster0-oz7gz.mongodb.net/test?retryWrites=true&w=majority";
        this.collectionName = collectionName;
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()["catch"](function (err) {
                            console.log(err);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    Database.prototype.add = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, val, result;
            return __generator(this, function (_a) {
                db = this.client.db(this.dbName);
                collection = db.collection(this.collectionName);
                console.log("add: value = " + value);
                val = JSON.parse(value);
                result = collection.insertOne(val);
                console.log("result = " + result);
                return [2 /*return*/];
            });
        });
    };
    Database.prototype.put = function (name, value) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                db = this.client.db(this.dbName);
                collection = db.collection(this.collectionName);
                console.log("putting: value = " + value);
                result = collection.updateOne({ name: name }, { $set: { sessionId: value } });
                console.log("result = " + result);
                return [2 /*return*/];
            });
        });
    };
    Database.prototype.push = function (name, key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                db = this.client.db(this.dbName);
                collection = db.collection(this.collectionName);
                console.log("push: value = " + value);
                result = key === "own"
                    ? collection.updateOne({ name: name }, { $addToSet: { own: value } })
                    : collection.updateOne({ name: name }, { $addToSet: { want: value } });
                console.log("result = " + JSON.stringify(result));
                return [2 /*return*/];
            });
        });
    };
    Database.prototype.pull = function (name, key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                db = this.client.db(this.dbName);
                collection = db.collection(this.collectionName);
                console.log("pull: value = " + value);
                result = key === "own"
                    ? collection.updateOne({ name: name }, { $pull: { own: value } })
                    : collection.updateOne({ name: name }, { $pull: { want: value } });
                console.log("result = " + JSON.stringify(result));
                return [2 /*return*/];
            });
        });
    };
    Database.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("get: key = " + key);
                        return [4 /*yield*/, collection.findOne({ name: key })];
                    case 1:
                        result = _a.sent();
                        console.log("get: returned " + JSON.stringify(result));
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getEmail = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("get: key = " + key);
                        return [4 /*yield*/, collection.findOne({ email: key })];
                    case 1:
                        result = _a.sent();
                        console.log("get: returned " + JSON.stringify(result));
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.dbName);
                        db = this.client.db(this.dbName);
                        console.log(this.collectionName);
                        collection = db.collection(this.collectionName);
                        console.log("getting all games");
                        return [4 /*yield*/, collection.find().sort({ name: 1 }).toArray()];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        console.log("getAll returned");
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getSome = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("getting some");
                        return [4 /*yield*/, collection
                                .find({ name: { $in: key } }, { password: 0 })
                                .sort({ name: 1 })
                                .toArray()];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        console.log("getSome returned");
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.del = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("delete: key = " + key);
                        return [4 /*yield*/, collection.deleteOne({ name: key })];
                    case 1:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.isFound = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("isFound: key = " + key);
                        return [4 /*yield*/, this.get(key)];
                    case 1:
                        v = _a.sent();
                        console.log("is found result = " + v);
                        if (v === null) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());
exports.Database = Database;
