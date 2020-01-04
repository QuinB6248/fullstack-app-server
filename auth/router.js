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
      .findOne({ where: { email: email }})
      .then(user => {
        if (!user) {
          res.status(400).send({ message: 'Name or password was incorrect' })
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const generateToken = toJWT({ userId: user.id })
          res
            // .header("Access-Control-Allow-Credentials", true)
            .cookie('name', user.name , { maxAge: 7200000, sameSite: 'None', secure: true})
            .cookie('jwt', generateToken , { maxAge: 7200000, httpOnly: true, sameSite: 'None', secure: true })
            .send({ jwt: generateToken})
  }else {
          res.status(400).send({ message: 'Name or password was incorrect' })
        }
      })
      .catch(err => next(err))
  }
})
 

///////test token and cookies
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

router.get('/clearcookie', function(req,res){
  res
  .clearCookie('jwt', {path:'/'})
  .clearCookie('name', {path:'/'})
  .clearCookie('hi', {path:'/'})
  .send(false);
})

router.get('/', function(req, res) {
  console.log("Cookies :  ", req.cookies);
  res.send({
   Cookies: req.cookies,
  })
})


module.exports = router