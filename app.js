const express = require('express')
const bodyParser = require('body-parser')
// const mysql = require('mysql2')
const bookRoute = require('./src/routes/books')
const userRoute = require('./src/routes/users')

const app = express()
const cors = require('cors')

const { PORT } = require('./src/helpers/env')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(bookRoute)
app.use(userRoute)

// app.get('/', (req, res) => {
//   const json = [
//     {
//       id: 1,
//       name: 'setiawan'
//     },
//     {
//       id: 2,
//       name: 'udin'
//     }
//   ]
//   res.json(json)
// })
// app.get('/test/:id', (req, res) => {
//   const param = req.params.id
//   res.send(param)
// })
// app.get('/query/', (req, res) => {
//   const search = req.query.search
//   const id = req.query.id
//   res.send({
//     id,
//     search
//   })
// })

// app.post('/register', (req, res) => {
//   const body = req.body
//   res.json(body.email)
// })
// app.patch('/registerPatch', (req, res) => {
//   const body = req.body
//   res.json(body.email)
// })
// app.patch('/registerPut', (req, res) => {
//   const body = req.body
//   res.json(body.email)
// })
// app.delete('/deleteData', (req, res) => {
//   const id = req.query.id
//   res.send({
//     id
//   })
// })

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'db_pos'
// })

// app.get('/books', (req, res) => {
//   const name = req.query.name
//   connection.query(`SELECT name, price FROM books WHERE name='${name}'`, (err, results) => {
//     if(err){
//       res.send(err)
//     }else{
//       res.json(results)
//     }
//   })
// })
// app.get('/book/:id', (req, res) => {
//   const id = req.params.id
//   connection.query(`SELECT name, price FROM books WHERE id='${id}'`, (err, results) => {
//     if(err){
//       res.send(err)
//     }else{
//       res.json(results)
//     }
//   })
// })

app.listen(PORT || 3000, () => {
  console.log(`Service running on PORT ${PORT || 3000}`)
})