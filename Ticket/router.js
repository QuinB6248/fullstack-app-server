const { Router } = require('express')
const Ticket = require('./model')
const Event = require('../Event/model')
const auth = require('../auth/middleware')
const Comment = require('../Comment/model')


const router = new Router()


router.get('/events/:id/tickets', (req, res, next) => {
  const id = parseInt(req.params.id)
  Event
    .findByPk(id)
    .then(event => {
      if(!event) {
        return res.status(400).send({ message: 'No event found' })
      }
      Ticket
        .findAll({where: {eventId: event.id}, include: [Event]})
        .then(tickets => {
          if(!tickets || tickets.length === 0) {
            return res.status(400).send({ message: 'No tickets found' })
          }
          //const name = event.name
          res.send(tickets)
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.post('/events/:id/tickets', auth, (req, res, next) => {
  const id = parseInt(req.params.id)
  const authUserId = req.user.id
  
  Event
    .findByPk(id)
    .then(event => {
      if(!event) {
        return res.status(400).send({ message: 'No event found' })
      }
      Ticket
        .create({...req.body, eventId: event.id, userId: authUserId})
        .then(ticket => {
          if(!ticket) {
            return res.status(400).send({ message: 'No ticket found' })
          }
          res.send(ticket)
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.get('/events/:id/tickets/:ticketId', (req, res, next) => {
  const id = parseInt(req.params.id) 
  const ticketId = parseInt(req.params.ticketId)
  
  Event
    .findByPk(id)
    .then(event => {
      if(!event) {
        return res.status(400).send({ message: 'No event found' })
      }
      console.log('EVENT', typeof id)
      Ticket
        .findByPk(ticketId, {where: {eventId: id}})
        .then(ticket => {
          if(!ticket || ticket.eventId !== id) {
            return res.status(400).send({ message: 'No ticket found' })
          }
          console.log('TICKET', ticket.eventId)
          res.send(ticket)
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

module.exports = router