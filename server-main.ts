"use strict";

import { Database } from "./mongo-database";
import { MyServer } from "./myserver-post";

const userDB = new Database("users");
const gameDB = new Database("games");
const theServer = new MyServer(userDB, gameDB);

theServer.listen(process.env.PORT);
