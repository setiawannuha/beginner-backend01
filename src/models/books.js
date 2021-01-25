const connection = require('../config/db')

module.exports = {
  modelAllBooksForRedis: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM books`, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  modelAllBooks: (name, offset, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM books 
        WHERE name LIKE '%${name}%' 
        LIMIT ${offset}, ${limit}
      `, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  modelTotalBooks: (name, offset, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT COUNT(*) as total FROM books`, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  modelDetailBooks: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM books WHERE id='${id}'`, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  modelInsertBooks: (data) => {
    return new Promise((resolve, reject) => {
      connection
      .query(`INSERT INTO books (name, price, description) 
      VALUES ('${data.name}', '${data.price}', '${data.description}')`
      , (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  modelUpdateBooks: (data, id) => {
    return new Promise((resolve, reject) => {
      connection
      .query(`UPDATE books 
        SET name='${data.name}', price='${data.price}', description='${data.description}'
        WHERE id='${id}'
      `
      , (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  modelUpdateBooksPatch: (data, id) => {
    return new Promise((resolve, reject) => {
      connection
      .query(`UPDATE books SET ? WHERE id = ?`, [data, id]
      , (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  modelDeleteBooks: (id) => {
    return new Promise((resolve, reject) => {
      connection
      .query(`DELETE FROM books WHERE id='${id}'`
      , (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  }
}