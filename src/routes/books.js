const express = require('express')
const router = express.Router()
const { 
  getAllBooks, 
  getDetailBooks, 
  insertBooks, 
  updateBooks,
  updateBooksPatch, 
  deleteBooks,
  insertMultipleBooks
} = require('../controllers/books')

const cors = require('cors')

const { 
  authentication, 
  authorizationAdmin, 
  authorizationCashier 
} = require('../helpers/middleware/auth')
const { getAllBooks: redisBooks } = require('../helpers/redis/books')

router
  .get('/books', authentication, authorizationAdmin, redisBooks, getAllBooks)                 // yang bisa akases hanya admin
  .get('/book/:id', authentication, authorizationCashier, getDetailBooks)           // yang bisa akses hanya kasir
  .post('/books', authentication, insertBooks)                // bisa di akses admin & kasir
  .post('/multiplebooks', authentication, insertMultipleBooks) // bisa di akses admin & kasir
  .put('/books/:id', authentication, updateBooks)              // bisa di akses admin & kasir
  .patch('/books/:id', authentication, updateBooksPatch)       // bisa di akses admin & kasir
  .delete('/books/:id', authentication, deleteBooks)           // bisa di akses admin & kasir

module.exports = router