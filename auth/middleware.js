const User = require('../User/model')
const { toData } = require('./jwt')


function auth(req, res, next) {
  ////FOR TESTING WITH HTTPIE//////set const data = toData(auth[1])
  // A user is able to authenticate using an `Authorization` header with a `Bearer <JWT>`
  //const auth = req.headers.authorization && req.headers.authorization.split(' ')
  //if (auth && auth[0] === 'Bearer' && auth[1]) {
 
  ///// user is able to authenticate using the JWT token in cookie send by client/browser
  const cookieToken = req.cookies.jwt

  if (cookieToken) {
    try {
      const data = toData(cookieToken)
      User
        .findByPk(data.userId)
        .then(user => {
          if (!user) {
            return next('User does not exist')
          }
          req.user = user 
          next()
        })
        .catch(next)
    }
    catch(error) {
      res.status(400).send({ message: `Error ${error.name}: ${error.message}`, })
    }
  }else {
    res.status(401).send({ message: 'Please supply some valid credentials' })
  }
}

module.exports = auth
