module.exports = {
  authUser: (req, res, next) => {
    const token = req.headers.token
    if(token === '123'){
      next()
    }else{
      res.json({
        message: 'Akses ditolak'
      })
    }
  }
}