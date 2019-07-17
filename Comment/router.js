const { Router } = require('express')
const Comment = require('./model')
const Ticket = require('../Ticket/model')
const auth = require('../auth/middleware')
const Sequelize = require('sequelize')
const User = require('../User/model')
const Event = require('../Event/model')


const router = new Router()

router.get('/events/:id/tickets/:ticketId/comments', (req, res, next) => {
  const id = parseInt(req.params.id) 
  const ticketId = parseInt(req.params.ticketId)

  
  
  Ticket
    .findByPk(ticketId, {where: {eventId: id}, include: [Event]})
    .then(ticket => {
      if(!ticket || ticket.eventId !== id) {
        return res.status(400).send({ message: 'No ticket found' })
      }
     
      Comment
      .findAll({where: {ticketId: ticketId}, include: [User]})
      .then(comments => {
      res.send({ticket, comments})

      })
      
    })
    .catch(err => next(err))
})

module.exports = router



