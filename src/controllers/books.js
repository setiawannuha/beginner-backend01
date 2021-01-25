const { 
  modelAllBooks, 
  modelDetailBooks, 
  modelInsertBooks, 
  modelUpdateBooks,
  modelUpdateBooksPatch,
  modelDeleteBooks,
  modelTotalBooks,
  modelAllBooksForRedis
} = require('../models/books')

const { success, failed } = require('../helpers/response')

const redisClient = require('../config/redis')
const response = require('../helpers/response')

module.exports = {
  setDataRedis: () => {
    modelAllBooksForRedis().then((response) => {
      const data = JSON.stringify(response)
      redisClient.set('dataBooks', data)
    }).catch((err) => {
      console.log(err)
    })
  },
  getAllBooks: async(req, res) => {
    try {
      const name = req.query.name ? req.query.name:'';
      const limit = req.query.limit ? req.query.limit:3
      const page = req.query.page ? req.query.page:1
      const offset = page===1 ? 0 : (page-1)*limit
      // const query = name?`WHERE name='${name}'`:``
      const responseTotal = await modelTotalBooks()
      modelAllBooks(name, offset, limit)
      .then((response) => {
        if(response.length <= 0){
          // panggil response not found
        }else{
          const arr = []
          response.forEach(element => {
            arr.push({
              id: element.id,
              name: element.name,
              price: element.price,
              img: element.description
            })
          });
  
          const pagination = {
            page: page,
            limit: limit,
            total: responseTotal[0].total,
            totalPage: Math.ceil(responseTotal[0].total/limit)
          }
          module.exports.setDataRedis()
          success(res, arr, pagination, 'Get all books from database success')
        }
      }).catch((err) => {
        failed(res, 'Internal server error', err)
      })
    } catch (error) {
      failed(res, 'Internal server error', [])
    }
  },

  getDetailBooks: (req, res) => {
    const id = req.params.id

    modelDetailBooks(id)
    .then((response) => {
      const result = {
        name: response[0].name,
        price: response[0].price+1000
      }
      success(res, result, {}, 'Get detail book success')
    }).catch((err) => {
      console.log(err)
    })
  },

  insertBooks: (req, res) => {
    const rawData = req.body

    if(rawData.name === '' || rawData.harga === ''){
      failed(res, 'All textfield is required!', [])
    }else{
      const data = {
        name: rawData.nama,
        price: rawData.harga-2000,
        description: rawData.deskripsi
      }
  
      modelInsertBooks(data)
      .then((response) => {
        success(res, response, {}, 'insert book success')
      }).catch((err) => {
        console.log(err)
      })
    }
  },

  insertMultipleBooks: (req, res) => {
    const rawData = req.body
    let checkData = true

    for (let index = 0; index < rawData.length; index++) {
      if(
        rawData[index].name === '' || 
        rawData[index].price === '' || 
        !rawData[index].name || 
        !rawData[index].price ||
        !rawData[index].description
      ){
        checkData = false
        break
      }else{
        checkData = true
      }
    }

    if(checkData === true){

      // Cara pertama
      // rawData.forEach(async(element) => {
      //   await modelInsertBooks(element)
      // })
      // success(res, {}, {}, 'insert book success')

      // Cara kedua
      let error = ''
      for (let index = 0; index < rawData.length; index++) {
        modelInsertBooks(rawData[index])
          .then((response) => {
            error = ''
          }).catch((err) => {
            error = err
          })
      }
      if(error){
        failed(res, error, [])
      }else{
        success(res, {}, {}, 'insert book success')
      }
      
    }else{
      failed(res, 'All textfield is required!', [])
    }
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
      success(res, response, {}, 'update book success')
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