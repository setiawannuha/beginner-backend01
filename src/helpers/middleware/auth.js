const jwt = require('jsonwebtoken')
module.exports = {
  authentication: (req, res, next) => {
    const headers = req.headers
    if(!headers.token){
      res.json({
        msg: 'token required'
      })
    }else{
      jwt.verify(headers.token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
          res.json({
            msg: 'token not valid'
          })
        }else{
          res.userAccess = decoded.access
          next()
        }
      })
    }
  },
  authorizationAdmin: (req, res, next) => {
    const access = res.userAccess
    if(access === 0){
      next()
    }else{
      res.json({
        msg: 'cannot access this endpoint, error authorization'
      })
    }
  },
  authorizationCashier: (req, res, next) => {
    const access = res.userAccess
    if(access === 1){
      next()
    }else{
      res.json({
        msg: 'cannot access this endpoint, error authorization'
      })
    }
  },
}