const { Router } = require('express')
const { toJWT } = require('./jwt')
const bcrypt = require('bcrypt')
const User = require('../User/model')
const auth = require('./middleware')
const Token = require('./model')

const router = new Router()

//login router: user enters email and password, find user with matching email in database, compares password with encrypted one, 
router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  Token.destroy({where: {}})
        
  if (!email || !password) {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  }else {
    
    User
      .findOne({ where: { email: email }})
      .then(user => {
        if (!user) {
          res.status(400).send({ message: 'Name or password was incorrect' })
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const generateToken = toJWT({ userId: user.id })
          
          Token.create({ name: user.name, token: generateToken})
          .then(token =>res.send({id: token.id, token: token.token, name: token.name}))
          .catch(err => next(err))
        }else {
          res.status(400).send({ message: 'Name or password was incorrect' })
        }
      })
      .catch(err => next(err))
  }
})
 
////////////CLEAR AND GET TOKENS/////////////////////
router.delete('/cleartoken/:id', function(req,res){
  const id = parseInt(req.params.id)
  
  Token
    .findByPk(id)
    .then(token => {
      token.destroy()
      res.send(false)
    })
    .catch(err => next(err))
})

router.get('/gettoken/:id', function(req,res){
  const id = parseInt(req.params.id)
  Token.findByPk(id)
  .then(token => {
    res.send({id:token.id, name: token.name, token: token.token})
  })
  .catch(err => next(err))
})

router.get('/authtoken', auth, function(req,res){
 if (!req.user) {
   return res.send(false)
  }else {
    return res.send(true)
  }
})

///////TEST TOKENS/COOKIES////////
router.get('/secret-endpoint', auth, (req, res) => {
  res.send({
    message: `You are visiting the secret endpoint ${req.user.name}.`,
  })
})

router.post('/cookie',function(req, res){
  res
    .cookie('jwt', req.body.cookieToken, { maxAge: 7200000, httpOnly: true})
    .send({ jwt:'token' })
})

router.get('/', function(req, res) {
  console.log("Cookies :  ", req.cookies);
  res.send({
   Cookies: req.cookies,
  })
})
////////////////////////////////

module.exports = router