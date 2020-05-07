// if (process.env.NODE_ENV !== "production") {
// 	require("dotenv").config();
// }
let http = require("http");
let url = require("url");
let express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require("./passport-config");
export class MyServer {
	private users;
	private games;

	// Server stuff: use express instead of http.createServer
	private server = express();
	private port = process.env.PORT;
	private router = express.Router();

	// Accepts two arguments:
	// udb = user database
	// gdb = games database
	constructor(udb, gdb) {
		this.users = udb;
		this.games = gdb;

		// initializePassport(passport, (username) => this.users.get(username));
		// from https://enable-cors.org/server_expressjs.html
		this.router.use((request, response, next) => {
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

		//home
		this.router.post("/home", this.homeHandler.bind(this));
		// Set a single handler for a route.
		this.router.post("/games/create", this.createHandler.bind(this));
		// Set multiple handlers for a route, in sequence.
		this.router.post(
			"/games/readall",
			//this.errorHandler.bind(this),
			this.readallHandler.bind(this)
		);
		this.server.get("/home", this.homeHandler.bind(this));
		this.router.post("/games/read", this.readHandler.bind(this));
		this.router.post("/games/update", [
			// this.errorHandler.bind(this),
			this.updateHandler.bind(this),
		]);
		this.router.post("/users/create", this.createUserHandler.bind(this));
		this.router.post("/users/login", this.loginUserHandler.bind(this));
		this.router.post("/users/read", this.readUserHandler.bind(this));
		this.router.post("/users/update", this.updateUserHandler.bind(this));
		this.router.post("/users/session", this.sessionUserHandler.bind(this));
		this.router.post("/users/delete", [
			// this.errorHandler.bind(this),
			this.deleteHandler.bind(this),
		]);
		// Set a fall-through handler if nothing matches.
		this.router.post("*", async (request, response) => {
			response.send(JSON.stringify({ result: "command-not-found" }));
		});
		// Start up the counter endpoint at '/counter'.
		this.server.use("/counter", this.router);
	}

	private async homeHandler(request, response): Promise<void> {
		await response.redirect("https://tet326.herokuapp.com");
	}

	private async loginUserHandler(request, response): Promise<void> {
		await this.loginUser(request.body.name, request.body.password, response);
	}

	private async errorHandler(request, response, next): Promise<void> {
		let value: boolean = await this.users.isFound(
			request.params["userId"] + "-" + request.body.name
		);
		//	console.log("result from database.isFound: " + JSON.stringify(value));
		if (!value) {
			response.write(JSON.stringify({ result: "error" }));
			response.end();
		} else {
			next();
		}
	}

	private async createHandler(request, response): Promise<void> {
		console.log(request);
		await this.createGame(request.body.name, response);
	}

	private async readallHandler(request, response): Promise<void> {
		await this.readallGames(request, response);
	}

	private async readHandler(request, response): Promise<void> {
		await this.readGame(request.body.name, response);
	}

	private async updateHandler(request, response): Promise<void> {
		await this.updateGame(
			request.body.game,
			request.body.user,
			request.body.own,
			request.body.add,
			response
		);
	}

	private async sessionUserHandler(request, response): Promise<void> {
		await this.sessionUser(
			request.body.username,
			request.body.sessionId,
			response
		);
	}

	private async createUserHandler(request, response): Promise<void> {
		await this.createUser(
			request.body.name,
			request.body.email,
			request.body.password,
			request.body.img,
			request.body.zip,
			request.body.sessionId,
			response
		);
	}

	private async readUserHandler(request, response): Promise<void> {
		await this.readUser(request.body.name, response);
	}

	private async updateUserHandler(request, response): Promise<void> {
		await this.updateUser(
			request.body.id,
			request.body.img,
			request.body.zip,
			request.body.new,
			request.body.own,
			request.body.game,
			response
		);
	}

	private async deleteHandler(request, response): Promise<void> {
		await this.deleteUser(request.body.id, response);
	}

	public listen(port): void {
		this.server.listen(port);
	}

	public async createGame(name: string, response): Promise<void> {
		console.log("creating game named '" + name + "'");
		//await this.theDatabase.put(name, 0);
		console.log("start");
		await this.games.add('{"name":"' + name + '","own":[],"want":[]}');
		response.write(JSON.stringify({ result: "created", name: name }));
		response.end();
	}

	public async errorCounter(name: string, response): Promise<void> {
		response.write(JSON.stringify({ result: "error" }));
		response.end();
	}

	public async readallGames(request, response): Promise<void> {
		// let values = [];
		// for (let i = 0; i < 10; ++i) {
		// 	let num = "" + i;
		// values.push(await this.theDatabase.get(num));
		// }
		let games = await this.games.getAll();
		response.write(JSON.stringify({ result: "read", games: games }));
		response.end();
	}

	public async readGame(name: string, response): Promise<void> {
		let game = await this.games.get(name);
		console.log(game);
		console.log(JSON.stringify({ result: "read", game: game }));
		response.write(JSON.stringify({ result: "read", game: game }));
		response.end();
	}

	public async updateGame(
		game: string,
		user: string,
		own: boolean,
		add: boolean,
		response
	): Promise<void> {
		let key: string;
		switch (own) {
			case true:
				key = "own";
				break;
			default:
				key = "want";
				break;
		}
		switch (add) {
			case true:
				await this.users.push(user, key, game);
				await this.games.push(game, key, user);
				break;
			default:
				await this.users.pull(user, key, game);
				await this.games.pull(game, key, user);
				break;
		}
		response.write(
			JSON.stringify({ result: "updated", game: game, user: user })
		);
		response.end();
	}

	public async createUser(
		name: string,
		email: string,
		password: string,
		img: string,
		zip: string,
		sessionId: string,
		response
	): Promise<void> {
		const userName = await this.users.get(name); // username searched in database
		const emailUser = await this.users.getEmail(email);
		// const hardcode = "$2b$10$yTmyWxD1cDNE1z2Th7Ja3e3yFzGQjX1/TJ04xjVNvMmbFLKjxteLS"; // hardcoded password
		console.log("console log works and the thing underneith is user");
		console.log(userName);
		if (userName !== null) {
			// if username doesn't exist
			console.log('response to be sent ot user: {result: "username in use"}');
			response.write(JSON.stringify({ result: "username in use" }));
			response.end();
		}
		else if (emailUser !== null) {
			// if email doesn't exist
			console.log('response to be sent ot user: {result: "email in use"}');
			response.write(JSON.stringify({ result: "email in use" }));
			response.end();
		}
		else {
			try {
				console.log("creating user named '" + name + "'");
				const hashedPassword = await bcrypt.hash(password, 10);
				await this.users.add(
					'{"name":"' +
					name +
					'","email":"' +
					email +
					'","password":"' +
					hashedPassword +
					'","img":"none","zip":"' +
					zip +
					'","sessionId":"' +
					sessionId +
					'","own":[],"want":[]}'
				);
				response.write(JSON.stringify({ result: "created", name: name }));

				response.end();
			} catch {
				response.write(JSON.stringify({ result: "error" }));
				response.end();
			}
		}
	}

	public async loginUser(
		name: string,
		password: string,
		response
	): Promise<void> {
		const user = await this.users.get(name); // (!) waiting on get
		// const hardcode = "$2b$10$yTmyWxD1cDNE1z2Th7Ja3e3yFzGQjX1/TJ04xjVNvMmbFLKjxteLS"; // hardcoded password
		console.log("console log works and the thing underneith is user");
		console.log(user);
		if (user == null) {
			// if user doesnt exist
			response.write(JSON.stringify({ result: "user not found" })); // some other response?
			response.end();
		} else {
			try {
				// the hashing works, just need user.password to return the password in the database as a string
				if (await bcrypt.compare(password, user.password)) {
					let sessionId = (Math.random() * 2147483647).toString() // largest 32 bit signed integer
					let hashedSessionId = await bcrypt.hash(sessionId, 10);
					await this.users.put(name, sessionId);
					response.write(
						JSON.stringify({
							result: "redirect",
							username: name,
							sessionId: hashedSessionId,
						})
					);
					// heroku build me
					response.end();
				} else {
					response.write(JSON.stringify({ result: "Incorrect Password" }));
					response.end();
				}
			} catch {
				response.write(JSON.stringify({ result: "caught error" }));
				response.end();
			}
		}
	}

	public async readUser(name: string, response): Promise<void> {
		let user = this.users.get(name);
		response.write(JSON.stringify({ result: "read", user: JSON.stringify(user) }));
		response.end();
	}

	public async updateUser(
		id: number,
		img: string,
		zip: string,
		add: boolean,
		own: boolean,
		game: number,
		response
	): Promise<void> {
		response.write(JSON.stringify({ result: "updated", id: id }));
		response.end();
	}

	// public removeItem(arr, value): Promise<any[]> {
	// 	let index = arr.indexOf(value);
	// 	if (index > -1) {
	// 		arr.splice(index, 1);
	// 	}
	// 	return arr;
	// }

	public async deleteUser(id: number, response): Promise<void> {
		//await this.theDatabase.del(name);
		response.write(JSON.stringify({ result: "deleted", id: id }));
		response.end();
	}

	public async sessionUser(
		username: string,
		sessionId: string,
		response
	): Promise<void> {
		let user = await this.users.get(username);
		if (user == null) {
			response.write(JSON.stringify({ result: "user not found" })); // some other response?
			response.end();
		}
		if (user.sessionId === "-1"){
			response.write(JSON.stringify({ result: "user not logged in" })); // some other response?
			response.end();
		}
		else {
			try {
				if (await bcrypt.compare(user.sessionId, sessionId)) {
					response.write(JSON.stringify({ result: "session valid" }));
					response.end();
				} else {
					response.write(JSON.stringify({ result: "session invalid" }));
					response.end();
				}
			} catch {
				response.write(JSON.stringify({ result: "error" }));
				response.end();
			}
		}
	}

}
