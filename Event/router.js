const { Router } = require('express')
const Event = require('./model')

const router = new Router()

router.get('/events', (req, res, next) => {
  Event.findAll()
   .then(events => res.send(events))
   .catch(error => next(error))
})

router.post('/events', (req, res, next) => {
  console.log('req.body test:', req.body)
  Event.create(req.body)
   .then(events => {
     console.log('team test:', events)
     return res.send(events)
   })
   .catch(err => next(err))
})




module.exports = router