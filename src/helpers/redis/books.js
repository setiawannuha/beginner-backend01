const client = require('../../config/redis')
const _ = require('lodash')
const { success } = require('../response')

module.exports = {
  getAllBooks: (req, res, next) => {
    client.get('dataBooks', (err, result) => {
      if(err){
        console.log(err)
      }else{
        if(result){
          const response = JSON.parse(result)
          const name = req.query.name ? req.query.name:'';
          const limit = req.query.limit ? req.query.limit:3
          const page = req.query.page ? req.query.page:1
          const offset = page === 1 ? 0 : (page-1)*limit
          
          const filterData = _.filter(response, (item) => {
            return item.name.includes(name)
          })
          const paginationData = _.slice(filterData, offset, offset+limit)

          const pagination = {
            page: page,
            limit: limit,
            total: response.length,
            totalPage: Math.ceil(response.length/limit)
          }
          success(res, paginationData, pagination, 'Get all books from redis success')
        }else{
          next()
        }
      }
    })
  }
}