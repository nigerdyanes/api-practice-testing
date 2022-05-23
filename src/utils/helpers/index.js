const { faker } = require('@faker-js/faker');

const generateFakeBook = () => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
});

const generateFakeBooks = (size) => {
  const books = [];
  for (let i = 0; i < size; i += 1) {
    const book = generateFakeBook();
    books.push(book);
  }
  return [...books];
};

module.exports = {
  generateFakeBooks,
  generateFakeBook,
};
