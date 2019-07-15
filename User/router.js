const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()


router.post('/signup', (req, res, next) => {
  console.log('USER', req.body.password)
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  }
  
  if(!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Please fill in a name, password and email' })
  }else {
    User
      .create(user)
      .then(user => res.send(user))
      .catch(err => next(err))
    
}
})



module.exports = router