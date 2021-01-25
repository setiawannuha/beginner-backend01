const mysql = require('mysql2')
const { DB_PASSWORD, DB_USERNAME } = require('../helpers/env')

const connection = mysql.createConnection({
  host: 'localhost',
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: 'db_pos'
})

module.exports = connection