const { Router } = require('express')
const Event = require('./model')
const Ticket = require('../Ticket/model')
const Comment = require('../Comment/model')
const auth = require('../auth/middleware')
const Sequelize = require('sequelize')

const router = new Router()


router.get('/events', (req, res, next) => {
  const limit = req.query.limit || 5
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
  if(!req.body.name || !req.body.end || !req.body.start || !req.body.avg_price){
    res.send({message: "please supply the right input"})
  }
  Event
    .create({...req.body, userId: authUserId})
    .then(events => {
      if (!events) {res.status(400).send({ message: 'No events found' })}
      res.send(events)
    })
    .catch(err => next(err))
})


router.patch('/events/:id', auth, (req, res, next) => {
  const id = parseInt(req.params.id)
  const authUserId = req.user.id
  Event
    .findByPk(id)
    .then(event => {
      if (event.userId !== authUserId) res.status(401).send({ message: 'You are not authorized' })
      
      event
        .update(req.body)
        .then(event => res.send(event))
    })
    .catch(err => next(err))
})


router.delete('/events/:id', auth, (req, res, next) => {
  const id = req.params.id
  Event
    .destroy({where: {id: id, userId: req.user.id}})
    .then(() => Ticket.destroy({where: {eventId: id}}))
    .then(() => Comment.destroy({where: {ticketId: null}}))
    .then(() => res.send({message: 'Event is deleted!'}))
    .catch(error => next(error))
  })

module.exports = router