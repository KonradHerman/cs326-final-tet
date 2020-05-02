"use strict";
exports.__esModule = true;
var mongo_database_1 = require("./mongo-database");
var myserver_post_1 = require("./myserver-post");
var userDB = new mongo_database_1.Database("users");
var gameDB = new mongo_database_1.Database("games");
var theServer = new myserver_post_1.MyServer(userDB, gameDB);
theServer.listen(process.env.PORT);
