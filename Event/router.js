const { Router } = require('express')
const Event = require('./model')
const Ticket = require('../Ticket/model')
const Comment = require('../Comment/model')
const auth = require('../auth/middleware')
const Sequelize = require('sequelize')
const User = require('../User/model')

const router = new Router()

//GET EVENTS
router.get('/events', (req, res, next) => {
  const limit = req.query.limit || 20
  const offset = req.query.offset || 0
  const curDate = new Date().toISOString().split('T')[0]
  const Op = Sequelize.Op
  const queryKeyValue = {}
  const queryUserName = {}
  const keyOfObject = Object.keys(req.query)
  
  keyOfObject.filter(el => {
    if(el === 'limit' || el === 'offset' || req.query[el] === 'false') {
      return
    }
    if(el === 'user' ) {
      return queryUserName['name'] =  { [Op.iLike]:`%${req.query[el]}%`}
    }
    return queryKeyValue[el] = { [Op.iLike]:`%${req.query[el]}%`}
  })
 
  Promise.all([
    Event.count(),
    Event.findAll({ limit, offset, where: {end: {[Op.gte]: curDate}}, where: queryKeyValue, order:[['id', 'DESC']], include: [{ model: User, where:queryUserName}] }),// sequelize operator gte = greater or equel then current date
    
  ])
    .then(([total, events]) => {
      if (!events) {
        res.status(404).send({ message: 'No events found' })
      }
      const numOfPages = Math.ceil(total / limit)
      res.send({events, total, numOfPages})
    })
    .catch(err => next(err))
})




//CREATE EVENT
router.post('/events', auth, (req, res, next) => {
  const authUserId = req.user.id
  const authUser = req.user
  const curDate = new Date().toISOString().split('T')[0]
 
  if(!req.body.name || !req.body.end || !req.body.start || !req.body.avg_price){
    return res.send({message: "please supply the right input"})
  } 
  if(req.body.end <  curDate){
    return res.send({message: "date is already been"})
  }
 
  Event
    .create({...req.body, userId: authUserId})
    .then(events => {
      if (!events) {
        return res.status(400).send({ message: 'No events created' })
      }
      res.send({
        id: events.id,
        name: events.name,
        description: events.description,
        image: events.image,
        avg_price: events.avg_price,
        start: events.start,
        end: events.end,
        user: {
          name: authUser.name
        }}
      )
    })
    .catch(err => next(err))
})

//UPDATE EVENT
router.patch('/events/:id', auth, (req, res, next) => {
  const id = parseInt(req.params.id)
  const authUserId = req.user.id
  const authUser = req.user
  
  Event
    .findByPk(id)
    .then(event => {
      if (event.userId !== authUserId) {
        return res.status(401).send({ message: 'You are not authorized' })
      }
      event
        .update(req.body)
        .then(event => {
          res.send({
            id: event.id,
            name: event.name,
            description: event.description,
            image: event.image,
            avg_price: event.avg_price,
            start: event.start,
            end: event.end,
            user: {
              name: authUser.name
            }
          })
        })
    })
    .catch(err => next(err))
})

//DELETE EVENT
router.delete('/events/:id', auth, (req, res, next) => {
  const id = req.params.id
  const authUserId = req.user.id
console.log('AUTHUSERID',authUserId)
  Event
  .findByPk(id)
  .then(event => {
    if (event.userId !== authUserId) {
      return res.status(401).send({ message: 'You are not authorized' })
    }
    
    event
      .destroy()
      .then(() => Ticket.destroy({where: {eventId: id}}))
      .then(() => Comment.destroy({where: {ticketId: null}}))
      .then(() => res.send({message: 'Event is deleted!'}))
    })
  .catch(error => next(error))
})

module.exports = router