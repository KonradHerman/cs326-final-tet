if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
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
		//login
		this.router.post(
			"/users/login",
			passport.authenticate("local"),
			this.loginHandler.bind(this)
		);
		//home
		this.router.post("/home", this.homeHandler.bind(this));
		//register
		this.router.post("/register", this.registerHandler.bind(this));
		// Set a single handler for a route.
		this.router.post("/games/create", this.createHandler.bind(this));
		// Set multiple handlers for a route, in sequence.
		this.router.post(
			"/games/readall",
			//this.errorHandler.bind(this),
			this.readallHandler.bind(this)
		);
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
		this.router.post("*", async (request, response) => {
			response.send(JSON.stringify({ result: "command-not-found" }));
		});
		// Start up the counter endpoint at '/counter'.
		this.server.use("/counter", this.router);
	}
	private async registerHandler(request, response): Promise<void> {
		await this.registerUser(
			request.body.email,
			request.body.name,
			request.body.password,
			response
		);
	}
	private async homeHandler(request, response): Promise<void> {
		await response.redirect("html/home.html");
	}
	private async loginHandler(request, response): Promise<void> {
		await response.redirect("/home.html");
	}

	public async registerUser(
		name: string,
		email: string,
		password: string,
		response
	): Promise<void> {
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			await this.users.put(
				name,
				`{name:${name},email:${email}, password:${hashedPassword} }`
			);
		} catch {
			await response.redirect("/register");
		}
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

	private async createUserHandler(request, response): Promise<void> {
		await this.createUser(
			request.body.name,
			request.body.password,
			request.body.img,
			request.body.zip,
			response
		);
	}

	private async readUserHandler(request, response): Promise<void> {
		await this.readUser(request.body.id, response);
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
		await this.games.put(name, "{name:" + name + ",own:[],want:[]}");
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
		let game: object = {
			name: "Azul",
			id: 12345,
			own: [90876, 27465],
			want: [16254, 26443],
		};
		response.write(JSON.stringify({ result: "read", game: game }));
		response.end();
	}

	public async updateGame(
		game: string,
		user: number,
		own: boolean,
		add: boolean,
		response
	): Promise<void> {
		//await this.theDatabase.put(name, value);
		response.write(JSON.stringify({ result: "updated", game: game }));
		response.end();
	}

	public async createUser(
		name: string,
		password: string,
		img: string,
		zip: string,
		response
	): Promise<void> {
		response.write(
			JSON.stringify({ result: "created", name: name, id: 17435 })
		);
		response.end();
	}

	public async readUser(id: number, response): Promise<void> {
		let user: Object = {
			name: "ChessFreak",
			id: 69420,
			zip: "11226",
			picture: "knight.jpg",
			own: [65554, 92845],
			want: [29999],
		};
		response.write(JSON.stringify({ result: "read", user: user }));
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

	public async deleteUser(id: number, response): Promise<void> {
		//await this.theDatabase.del(name);
		response.write(JSON.stringify({ result: "deleted", id: id }));
		response.end();
	}
}
