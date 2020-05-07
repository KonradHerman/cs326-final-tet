export class Database {
	private MongoClient = require("mongodb").MongoClient;
	private password: string;
	private uri: string;
	private client;
	private collectionName: string;
	private dbName: string = "boredgames";

	constructor(collectionName) {
		// Assign password to uri
		this.password = process.env.PASSWORD;
		this.uri =
			"mongodb+srv://konrad:" +
			this.password +
			"@cluster0-oz7gz.mongodb.net/test?retryWrites=true&w=majority";

		this.collectionName = collectionName;
		this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });

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

	public async put(name: string, value: string): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("putting: value = " + value);
		let result = collection.updateOne(
			{ name: name },
			{ $set: { sessionId: value } }
		);
		console.log("result = " + result);
	}

	public async push(name: string, key: string, value: string): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("push: value = " + value);
		let result =
			key === "own"
				? collection.updateOne({ name: name }, { $addToSet: { own: value } })
				: collection.updateOne({ name: name }, { $addToSet: { want: value } });
		console.log("result = " + JSON.stringify(result));
	}

	public async pull(name: string, key: string, value: string): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("pull: value = " + value);
		let result =
			key === "own"
				? collection.updateOne({ name: name }, { $pull: { own: value } })
				: collection.updateOne({ name: name }, { $pull: { want: value } });
		console.log("result = " + JSON.stringify(result));
	}

	public async get(key: string): Promise<string> {
		let db = this.client.db(this.dbName); // this.level(this.dbFile);
		let collection = db.collection(this.collectionName);
		console.log("get: key = " + key);
		const result = await collection.findOne({ name: key });
		console.log("get: returned " + JSON.stringify(result));
		if (result) {
			return result;
		} else {
			return null;
		}
	}

	public async getEmail(key: string): Promise<string> {
		let db = this.client.db(this.dbName); // this.level(this.dbFile);
		let collection = db.collection(this.collectionName);
		console.log("get: key = " + key);
		const result = await collection.findOne({ email: key });
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
		const result = await collection.find().sort({ name: 1 }).toArray();
		console.log(result);
		console.log("getAll returned");
		if (result) {
			return result;
		} else {
			return null;
		}
	}

	public async getSome(key: string[]): Promise<string | null> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("getting some");
		const result = await collection
			.find({ name: { $in: key } }, { password: 0 })
			.sort({ name: 1 })
			.toArray();
		console.log(result);
		console.log("getSome returned");
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
