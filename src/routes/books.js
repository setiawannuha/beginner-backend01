const express = require('express')
const route = express.Router()
const { 
  getAllBooks, 
  getDetailBooks, 
  insertBooks, 
  updateBooks,
  updateBooksPatch, 
  deleteBooks 
} = require('../controllers/books')

const { authUser } = require('../middleware/auth')

route
  .get('/books', getAllBooks)
  .get('/book/:id', authUser, getDetailBooks)
  .post('/books', insertBooks)
  .put('/books/:id', updateBooks)
  .patch('/books/:id', updateBooksPatch)
  .delete('/books/:id', deleteBooks)

module.exports = route