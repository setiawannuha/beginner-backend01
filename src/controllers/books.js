const { 
  modelAllBooks, 
  modelDetailBooks, 
  modelInsertBooks, 
  modelUpdateBooks,
  modelUpdateBooksPatch,
  modelDeleteBooks 
} = require('../models/books')

module.exports = {
  getAllBooks: (req, res) => {
    const name = req.query.name;
    const limit = req.query.limit
    const page = req.query.page
    const offset = page===1 ? 0 : (page-1)*limit
    // const query = name?`WHERE name='${name}'`:``
    modelAllBooks(name, offset, limit)
    .then((response) => {
      res.json(response)
    }).catch((err) => {
      console.log(err)
    })
  },

  getDetailBooks: (req, res) => {
    const id = req.params.id

    modelDetailBooks(id)
    .then((response) => {
      res.json(response)
    }).catch((err) => {
      console.log(err)
    })
  },

  insertBooks: (req, res) => {
    const rawData = req.body

    const data = {
      name: rawData.nama,
      price: rawData.harga-2000,
      description: rawData.deskripsi
    }

    modelInsertBooks(data)
    .then((response) => {
      res.json({
        status: 'OK'
      })
    }).catch((err) => {
      console.log(err)
    })
  },

  updateBooks: (req, res) => {
    const id = req.params.id
    const rawData = req.body

    const data = {
      name: rawData.nama,
      price: rawData.harga,
      description: rawData.deskripsi
    }

    modelUpdateBooks(data, id)
    .then((response) => {
      res.json({
        status: 'Data updated'
      })
    }).catch((err) => {
      console.log(err)
    })
  },

  updateBooksPatch: (req, res) => {
    const id = req.params.id
    const rawData = req.body

    modelUpdateBooksPatch(rawData, id)
    .then((response) => {
      res.json({
        status: 'Patch Data updated'
      })
    }).catch((err) => {
      console.log(err)
    })
  },

  deleteBooks: (req, res) => {
    const id = req.params.id

    modelDeleteBooks(id)
    .then((response) => {
      res.json(response)
    }).catch((err) => {
      console.log(err)
    })
  }
}