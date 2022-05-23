const MongoLib = require('../lib/mongo.lib');

class BookService {
  constructor() {
    this.collection = 'books';
    this.mongoDB = new MongoLib();
  }

  async getAll(query) {
    const books = await this.mongoDB.findAll(this.collection, query);
    return books;
  }

  async getOne(bookId) {
    if (!bookId) {
      return false;
    }
    const book = await this.mongoDB.findOne(this.collection, bookId);
    return book;
  }

  async create() {
    await this.mongoDB.create(this.collection, {
      name: 'Rimas',
      desc: 'Poesía',
      price: 10.23,
      author: 'Gustavo Adolfo Becquer',
    });
  }
}

module.exports = BookService;
