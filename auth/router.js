const { Router } = require('express')
const { toJWT } = require('./jwt')
const bcrypt = require('bcrypt')
const User = require('../User/model')
const auth = require('./middleware')

const router = new Router()

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
          res.send({ jwt: toJWT({ userId: user.id }) })
        }else {
          res.status(400).send({ message: 'Name or password was incorrect' })
        }
      })
      .catch(err => next(err))
  }
})
 


//test
router.get('/secret-endpoint', auth, (req, res) => {
  res.send({
    message: `You are visiting the secret endpoint ${req.user.name}.`,
  })
})


module.exports = router