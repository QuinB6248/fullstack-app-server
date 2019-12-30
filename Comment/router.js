const { Router } = require('express')
const Comment = require('./model')
const Ticket = require('../Ticket/model')
const auth = require('../auth/middleware')
const Sequelize = require('sequelize')
const User = require('../User/model')
const Event = require('../Event/model')


const router = new Router()

//GET TICKET WITH COMMENTS
router.get('/events/:id/tickets/:ticketId/comments', (req, res, next) => {
  const id = parseInt(req.params.id) 
  const ticketId = parseInt(req.params.ticketId)

  Ticket
    .findByPk(ticketId, {where: {eventId: id}, include: [Event, User]})
    .then(ticket => {
      if(!ticket || ticket.eventId !== id) {
        return res.status(400).send({ message: 'No ticket found' })
      }
      //check the user(Id) of the specific ticket and find all tickets from the same user(Id)
      Ticket
        .findAll({where: {userId: ticket.userId}})
        .then(tickets => {
          
          //first get the riskHour (added when ticket was posted)
          let riskStatus = ticket.riskHour
          //Check how many tickets user has
          const userCount = tickets.map(ticket => ticket.userId)
          const userNumberOfTickets = userCount.length
          //If user has only one ticket, 10% will be added to riskStatus
          userNumberOfTickets > 1? riskStatus  : riskStatus += 10
          //Get percentage of price by dividing it with the average price
          const priceTicket = ticket.price
          const avgPrice = ticket.event.avg_price
          const percentage = Math.round(priceTicket/avgPrice*100);
          //Deduct 100% of percentage to get the amount of percentage higher or lower then average price(100%)
          let priceDif = Math.round(-(percentage - 100))
          //Maximum of 10% deduction
          priceDif < -10 ? priceDif = -10 : priceDif
          //Add (or subtract) amount of risk (riskStatus)
          riskStatus += priceDif
          //Check if riskStatus is not higher then 95% or lower then 5%
          riskStatus > 95? riskStatus=95 : riskStatus < 5? riskStatus=5 : riskStatus
        
          Comment
            .findAll({where: {ticketId: ticketId}, include: [User]})
            .then(comments => {
              //If there are >3 comments on the ticket, add 5% to the risk
              comments.length > 3? riskStatus += 5 : riskStatus
              riskStatus > 95? riskStatus= 95: riskStatus
              ticket.risk = riskStatus
              ticket.save().then(() => {})

              

              res.send({
                userDetails : ticket.user,
                event:ticket.event, 
                ticket:{
                id: ticket.id,
                description: ticket.description,
                image: ticket.image,
                price: ticket.price,
                eventId: ticket.eventId,
                userId: ticket.userId,
                risk: ticket.risk
                }, 
                comments,
                riskStatus,
                userNumberOfTickets
                
              })
        })
    })
  })
  .catch(err => next(err))
})

//CREATE COMMENT
router.post('/events/:id/tickets/:ticketId/comments', auth, (req, res, next) => {
  const id = parseInt(req.params.id) 
  const ticketId = parseInt(req.params.ticketId)
  const authUserId = req.user.id
  
  Comment
    .create({...req.body, ticketId: ticketId, userId: authUserId})
    .then(comment => {
      if(!comment) {
        return res.status(400).send({ message: 'No comment found' })
      }
      User
        .findByPk(comment.userId)
        .then(user => {
          console.log('USERS',comment)
          res.send({
            id: comment.id,
            comment: comment.comment,
            user: user,
            ticketId: comment.ticketId,
            userId: comment.userId

          })
        })
        
    })
    .catch(err => next(err))
})

//UPDATE COMMENT
router.patch('/events/:id/tickets/:ticketId/comments/:commentId', auth, (req, res, next) => {
  const ticketId = parseInt(req.params.ticketId)
  const commentId = parseInt(req.params.commentId)
  const authUserId = req.user.id
  
  Comment
    .findByPk(commentId, {where: {ticketId: ticketId}})
    .then(comment => {
      if(!comment || comment.ticketId !== ticketId) {
        return res.status(400).send({ message: 'No comment found' })
      }else if (comment.userId !== authUserId){
        return res.status(401).send({ message: 'You are not authorized' })
      }else {
        comment
          .update(req.body)
          .then(comment => res.send(comment))
          .catch(err => next(err))
        }
      })
      .catch(err => next(err))
})

//DELETE COMMENT
router.delete('/events/:id/tickets/:ticketId/comments/:commentId', auth, (req, res, next) => {
  const ticketId = parseInt(req.params.ticketId)
  const commentId = parseInt(req.params.commentId)
  const authUserId = req.user.id
  
  Comment
    .findByPk(commentId, {where: {ticketId: ticketId}})
    .then(comment => {
      if(!comment || comment.ticketId !== ticketId) {
        return res.status(400).send({ message: 'No comment found' })
      }else if (comment.userId !== authUserId){
        return res.status(401).send({ message: 'You are not authorized' })
      }else {
        comment
          .destroy()
          .then(() => res.send({message: 'comment is deleted!'}))
          .catch(err => next(err))
      }
    })
    .catch(err => next(err))
})

module.exports = router


