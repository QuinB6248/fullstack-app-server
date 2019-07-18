const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()

//Sign-up router: user signs up with name email and password, password gets encrypted, user-row is created in database 
router.post('/signup', (req, res, next) => {
  const { name, email, password} = req.body
  if(!name || !email || !password) {
    return res.status(400).send({ message: 'Please fill in a name, password and email' })
  }else {
    const user = { name, email, password: bcrypt.hashSync(password, 10) }
    User
      .create(user)
      .then(user => {
        if (!user) {
          res.status(400).send({ message: 'Name or password was incorrect' })
        }
        res.send(user)
      })
      .catch(err => next(err))
    }
})



module.exports = router