const { Router } = require('express')
const Event = require('./model')
const auth = require('../auth/middleware')
const Sequelize = require('sequelize')

const router = new Router()


router.get('/events', (req, res, next) => {
  const limit = req.query.limit || 15
  const offset = req.query.offset || 0
  const curDate = new Date().toISOString().split('T')[0]
  const Op = Sequelize.Op

  Promise.all([
    Event.count(),
    Event.findAll({ limit, offset, where: {end: {[Op.gte]: curDate}} }) // sequelize operator gte = greater or equel then current date
  ])
    .then(([total, events]) => {
      if (!events) {
        res.status(400).send({ message: 'No events found' })
      }
      const numOfPages = Math.ceil(total / limit)
      res.send({events, total, numOfPages})
    })
    .catch(err => next(err))
})


router.post('/events', auth, (req, res, next) => {
  const authUserId = req.user.id
  Event
    .create({...req.body, userId: authUserId})
    .then(events => {
      if (!events) {
        res.status(400).send({ message: 'No events found' })
      }
      res.send(events)
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