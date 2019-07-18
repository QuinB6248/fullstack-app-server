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
      Ticket
        .findAll({where: {userId: ticket.userId}})
        .then(tickets => {
          const userCount = tickets.map(ticket => ticket.userId)
          const userNumberOfTickets = userCount.length
          Comment
          .findAll({where: {ticketId: ticketId}, include: [User]})
          .then(comments => {
            res.send({
                event:ticket.event, 
                ticket:{
                id: ticket.id,
                description: ticket.description,
                image: ticket.image,
                price: ticket.price,
                eventId: ticket.eventId,
                userId: ticket.userId
                }, 
                comments,
                userNumberOfTickets
            })
        })
    })

     
  })
  .catch(err => next(err))
})

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
      res.send(comment)
    })
    .catch(err => next(err))
})

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



// const userComment = 
//             comments
//               .map(comment => comment.userId)
//           const countCommentsUser = 
//             userComment
//               .reduce(function (allUsersComments, userId) { 
//                 if (userId in allUsersComments) {
//                   allUsersComments[userId]++;
//                 }else {
//                   allUsersComments[userId] = 1;
//                 }
//                 return allUsersComments;
//               }, {}); 