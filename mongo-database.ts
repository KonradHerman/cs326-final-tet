export class Database {
	private MongoClient = require("mongodb").MongoClient;
	private secrets;
	private password: string;
	private uri =
		"mongodb+srv://konrad:"+ this.password +"@cluster0-oz7gz.mongodb.net/test?retryWrites=true&w=majority";
	private client;
	private collectionName: string;
	private dbName: string = "boredgames";

	constructor(collectionName) {
		this.collectionName = collectionName;
		this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });

		// Assign password to uri
		if (!process.env.PASSWORD) {
			this.secrets = require('secrets.json');
			this.password = this.secrets.password;
		} else {
			this.password = process.env.PASSWORD;
		}

		(async () => {
			await this.client.connect().catch((err) => {
				console.log(err);
			});
		})();
	}

	public async add(value: string): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("add: value = " + value);
		let val = JSON.parse(value);
		let result = collection.insertOne(val);
		console.log("result = " + result);
	}

	public async push(name: string, key: string, value: string): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("push: value = " + value);
		let result = key==="own" ? collection.updateOne({"name": name}, {$addToSet: { own : value}}):
			collection.updateOne({"name": name}, {$addToSet: { want : value}});
		console.log("result = " + JSON.stringify(result));
	}

	public async pull(name: string, key: string, value: string): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("pull: value = " + value);
		let result = key==="own" ? collection.updateOne({"name": name}, {$pull: { own : value}}):
			collection.updateOne({"name": name}, {$pull: { want : value}});
		console.log("result = " + JSON.stringify(result));
	}

	public async get(key: string): Promise<string> {
		let db = this.client.db(this.dbName); // this.level(this.dbFile);
		let collection = db.collection(this.collectionName);
		console.log("get: key = " + key);
		const result = await collection.findOne({"name": key});
		console.log("get: returned " + JSON.stringify(result));
		if (result) {
			return result;
		} else {
			return null;
		}
	}

	public async getAll(): Promise<string | null> {
		console.log(this.dbName);
		let db = this.client.db(this.dbName);
		console.log(this.collectionName);
		let collection = db.collection(this.collectionName);
		console.log("getting all games");
		const result = await collection.find().sort({name : 1}).toArray();
		console.log(result);
		console.log("getAll returned");
		if (result) {
			return result;
		} else {
			return null;
		}
	}

	public async del(key: string): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("delete: key = " + key);
		let result = await collection.deleteOne({ name: key });
		console.log("result = " + result);
		// await this.db.del(key);
	}

	public async isFound(key: string): Promise<boolean> {
		console.log("isFound: key = " + key);
		let v = await this.get(key);
		console.log("is found result = " + v);
		if (v === null) {
			return false;
		} else {
			return true;
		}
	}
}
