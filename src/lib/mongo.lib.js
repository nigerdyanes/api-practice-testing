const { MongoClient, ObjectId } = require('mongodb');

const { database: { url, name } } = require('../config');

class MongoLib {
  constructor() {
    this.client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.databaseName = name;
  }

  async connect() {
    if (!MongoLib.connection) {
      await this.client.connect();
      MongoLib.connection = this.client.db(this.databaseName);
      return MongoLib.connection;
    }
    return MongoLib.connection;
  }

  async findAll(collection, query) {
    const db = await this.connect();
    return db.collection(collection).find(query).toArray();
  }

  async findOne(collection, id) {
    const db = await this.connect();
    return db.collection(collection).findOne({ _id: ObjectId(id) });
  }

  async create(collection, data) {
    const db = await this.connect();
    const rta = await db.collection(collection).insertOne(data);
    return this.get(collection, rta.insertedId);
  }
}

module.exports = MongoLib;
