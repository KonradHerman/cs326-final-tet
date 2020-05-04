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
        // Assign password to uri
        var _this = this;
        this.MongoClient = require("mongodb").MongoClient;
        this.dbName = "boredgames";
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
    Database.prototype["if"] = function (, process, env, PASSWORD) {
        this.secrets = require('secrets.json');
        this.password = this.secrets.password;
    };
    return Database;
}());
exports.Database = Database;
{
    this.password = process.env.PASSWORD;
}
this.uri =
    "mongodb+srv://konrad:" + this.password + "@cluster0-oz7gz.mongodb.net/test?retryWrites=true&w=majority";
this.collectionName = collectionName;
this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
async;
push(name, string, key, string, value, string);
Promise < void  > {
    let: let, db: db,
    let: let, collection: collection,
    console: console, : .log("push: value = " + value),
    let: let, result: result,
    console: console, : .log("result = " + JSON.stringify(result))
};
async;
pull(name, string, key, string, value, string);
Promise < void  > {
    let: let, db: db,
    let: let, collection: collection,
    console: console, : .log("pull: value = " + value),
    let: let, result: result,
    console: console, : .log("result = " + JSON.stringify(result))
};
async;
get(key, string);
Promise < string > {
    let: let, db: db,
    let: let, collection: collection,
    console: console, : .log("get: key = " + key),
    "const": result = await collection.findOne({ "name": key }),
    console: console, : .log("get: returned " + JSON.stringify(result)),
    "if": function (result) {
        return result;
    }, "else": {
        "return": null
    }
};
async;
getAll();
Promise < string | null > {
    console: console, : .log(this.dbName),
    let: let, db: db,
    console: console, : .log(this.collectionName),
    let: let, collection: collection,
    console: console, : .log("getting all games"),
    "const": result = await collection.find().sort({ name: 1 }).toArray(),
    console: console, : .log(result),
    console: console, : .log("getAll returned"),
    "if": function (result) {
        return result;
    }, "else": {
        "return": null
    }
};
async;
del(key, string);
Promise < void  > {
    let: let, db: db,
    let: let, collection: collection,
    console: console, : .log("delete: key = " + key),
    let: let, result: result,
    console: console, : .log("result = " + result)
};
async;
isFound(key, string);
Promise < boolean > {
    console: console, : .log("isFound: key = " + key),
    let: let, v: v,
    console: console, : .log("is found result = " + v),
    "if": function (v) { }
} === null;
{
    return false;
}
{
    return true;
}
