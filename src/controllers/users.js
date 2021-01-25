const bcrypt = require('bcrypt')
const response = require('../helpers/response')
const { mRegister, mCheckEmail } = require('../models/users')
const jwt = require('jsonwebtoken')

module.exports = {
  login: async(req, res) => {
    const body = req.body
    mCheckEmail(body.email).then(async(response) => {
      if(response.length === 1){
        const checkPassword = await bcrypt.compare(body.password, response[0].password)
        if(checkPassword){
          const dataUser = {
            email: response[0].email,
            id: response[0].id,
            access: response[0].access
          }
          const token = jwt.sign(dataUser, process.env.JWT_SECRET) // proses sign token
          res.json({
            msg: 'login success',
            token
          })
        }else{
          res.json({
            msg: 'login failed, password wrong'
          })
        }
      }else{
        res.json({
          msg: 'Email not found'
        })
      }
    }).catch((err) => {
      res.json(err)
    })
  },
  register: async(req, res) => {
    const body = req.body
    mCheckEmail(body.email).then(async(response) => {
      if(response.length >= 1){
        res.json({
          msg: 'Email registered'
        })
      }else{
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(body.password, salt)
        const user = {
          name: body.name,
          email: body.email,
          access: body.access,
          password
        }
        mRegister(user).then((response) => {
          res.json(response)
        }).catch((err) => {
          res.json(err)
        })
      }
    }).catch((err) => {
      res.json(err)
    })
  }
}
