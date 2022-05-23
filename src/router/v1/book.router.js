const express = require('express');
const BookService = require('../../services/book.service');

const router = express.Router();
const bookService = new BookService();

router.get('/', async (req, res) => {
  const result = await bookService.getAll();
  res.status(200).json(result);
});

router.post('/', async (req, res) => {
  const result = await bookService.create();
  res.status(201).json(result);
});

module.exports = router;
