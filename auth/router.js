const { Router } = require('express')
const { toJWT } = require('./jwt')
const bcrypt = require('bcrypt')
const User = require('../User/model')
const auth = require('./middleware')

const router = new Router()

//login router: user enters email and password, find user with matching email in database, compares password with encrypted one, 
router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  }else {
    User
      .findOne({
        where: { email: email }
      })
      .then(user => {
        if (!user) {
          res.status(400).send({ message: 'Name or password was incorrect' })
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
          



          const generateToken = toJWT({ userId: user.id })
          res.cookie('jwt',generateToken, { httpOnly: true, maxAge: 3600000 })
          res.send({ jwt: generateToken })
        }else {
          res.status(400).send({ message: 'Name or password was incorrect' })
        }
      })
      .catch(err => next(err))
  }
})
 


//test
router.get('/secret-endpoint', auth, (req, res) => {
  console.log('REQ HEADER',req.cookies)
  res.send({
    message: `You are visiting the secret endpoint ${req.user.name}.`,
  })
})


module.exports = router


//re authenticate

router.get('/token', (req, res) => {
  // const token = req.body.token || req.query.token || req.header.token
  
  res.send({
    message: `You are visiting the token endpoint ${req.headers.authorization}.`,
  })
})