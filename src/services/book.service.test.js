const BookService = require('./book.service');
const { generateFakeBooks, generateFakeBook } = require('../utils/helpers');

const mockFindAll = jest.fn();
const mockFindOne = jest.fn().mockImplementation((fakeBook) => fakeBook);

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  findAll: mockFindAll,
  findOne: mockFindOne,
})));

describe('book service', () => {
  let bookService;
  beforeEach(() => {
    bookService = new BookService();
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    test('should return a list of books', async () => {
      // Arrange
      const fakeBooks = generateFakeBooks(10);
      mockFindAll.mockResolvedValue(fakeBooks);
      // Act
      const result = await bookService.getAll();
      // Assert
      expect(result.length).toEqual(fakeBooks.length);
    });

    test('should use query when filter', async () => {
      // Arrange
      mockFindAll.mockResolvedValue({});
      // Act
      await bookService.getAll({});
      // Asset
      expect(mockFindAll).toHaveBeenCalledWith('books', {});
    });

    test('should call one time', async () => {
      // Arrange
      mockFindAll.mockResolvedValue();
      // Act
      await bookService.getAll();
      // Assert
      expect(mockFindAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOne', () => {
    test('should return a book', async () => {
      // Arrange
      const fakeBook = generateFakeBook();
      mockFindOne.mockResolvedValue(fakeBook);
      // Act
      const result = await bookService.getOne(fakeBook.id);
      console.log(result);
      // Assert
      // expect(mockFindOne).toHaveBeenCalledTimes(1);
      // expect(mockFindOne).toHaveBeenCalledWith('books', expect.any(String));
      expect(result.length).toEqual(1);
    });

    test('should return null when not pass id', async () => {
      // Arrange
      // Act
      const result = await bookService.getOne();
      // Assert
      expect(mockFindOne).toHaveBeenCalledTimes(0);
      expect(result).toBe(false);
    });
  });
});
