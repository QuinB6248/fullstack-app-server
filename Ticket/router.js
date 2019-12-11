const { Router } = require('express')
const Ticket = require('./model')
const Event = require('../Event/model')
const auth = require('../auth/middleware')

const router = new Router()


router.get('/events/:id/tickets', (req, res, next) => {
  const id = parseInt(req.params.id)

  Ticket
    .findAll({where: {eventId: id}, include: [Event]})
    .then(tickets => {
      if(tickets.length === 0 ) {
        return res.status(400).send({ message: 'No tickets found' })
      }
      res.send(tickets)
    })
    .catch(err => next(err))
})


router.post('/events/:id/tickets', auth, (req, res, next) => {
  const id = parseInt(req.params.id)
  const authUserId = req.user.id
  
  Ticket
    .create({...req.body, eventId: id, userId: authUserId})
    .then(ticket => {
      //if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk
      const curTime = new Date().toISOString().split('T')[1]
      const curHour = curTime.split(':')[0]
      let riskHour
      curHour < 9 || curHour > 17 ? riskHour = 10: riskHour = -10
      ticket.riskHour = riskHour
      ticket.save().then(() => {})
      Ticket
        .findAll({where: {eventId: id}, include: [Event]})
        .then(tickets => {
          if(!tickets ) {
          return res.status(400).send({ message: 'No tickets found' })
          }
          res.send(tickets[0])
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})


router.get('/events/:id/tickets/:ticketId', (req, res, next) => {
  const id = parseInt(req.params.id) 
  const ticketId = parseInt(req.params.ticketId)
  
  Ticket
    .findByPk(ticketId, {where: {eventId: id}})
    .then(ticket => {
      if(!ticket || ticket.eventId !== id) {
        return res.status(400).send({ message: 'No ticket found' })
      }
      res.send(ticket)
      
    })
    .catch(err => next(err))
})


router.patch('/events/:id/tickets/:ticketId', auth, (req, res, next) => {
  const id = parseInt(req.params.id) 
  const ticketId = parseInt(req.params.ticketId)
  
  Ticket
    .findByPk(ticketId, {where: {eventId: id}, include: [Event]})
    .then(ticket => {
      if(ticket.eventId !== id) {
        return res.status(400).send({ message: 'No ticket found' })
      }else if (ticket.userId !== req.user.id){
        return res.status(401).send({ message: 'You are not authorized' })
      }else {
        ticket
          .update(req.body)
          .then(ticket => res.send(ticket))
          .catch(err => next(err))
        }
      })
      .catch(err => next(err))
})


router.delete('/events/:id/tickets/:ticketId', auth, (req, res, next) => {
  const id = parseInt(req.params.id) 
  const ticketId = parseInt(req.params.ticketId)
  
  Ticket
    .findByPk(ticketId, {where: {eventId: id}})
    .then(ticket => {
      if(!ticket || ticket.eventId !== id) {
        return res.status(400).send({ message: 'No ticket found' })
      }else if (ticket.userId !== req.user.id){
        return res.status(401).send({ message: 'You are not authorized' })
      }else {
        ticket
          .destroy()
          .then(() => res.send({message: 'Ticket is deleted!'}))
          .catch(err => next(err))
      }
    })
    .catch(err => next(err))
})
 




module.exports = router