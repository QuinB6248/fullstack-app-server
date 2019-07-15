const { Router } = require('express')
const Event = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/events', (req, res, next) => {
  Event
    .findAll()
    .then(events => {
      if (!events) {
        res.status(400).send({ message: 'No events found' })
      }
      res.send(events)
    })
    .catch(err => next(err))
})

router.post('/events', (req, res, next) => {
  Event
    .create(req.body)
    .then(events => {
      if (!events) {
        res.status(400).send({ message: 'No events found' })
      }
      res.send(events)
    })
    .catch(err => next(err))
})

router.get('/events/:id', (req, res, next) => {
  const id = req.params.id
  Event
    .findByPk(id)
    .then(event => {
      if (!event) {
        res.status(400).send({ message: 'No event found' })
      }
      res.send(event)
    })
    .catch(err => next(err))
})

router.put('/events/:id', (req, res, next) => {
  const id = req.params.id
  Event
    .findByPk(id)
    .then(event => {
      if(!event){
        res.status(400).send({ message: 'No event found' })
      }else {
        event.update(req.body)
          .then(event => res.send(event))
          .catch(err => next(err))
      }
    })
    .catch(err => next(err))
})


router.delete('/events/:id', auth, (req, res, next) => {
  const id = req.params.id
  Event
    .findByPk(id)
    .then(event => {
      if (event && event.userId === req.user.id) {
        event
          .destroy()
          .then(() => res.send({message: 'Event is deleted!'}))
      }else {
        res.status(404).json({message: `event does not exist, or does not belong to authenticated user`})
      }
    })
    .catch(error => next(error))
})

module.exports = router