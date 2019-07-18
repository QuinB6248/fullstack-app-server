const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../User/model')
const Ticket = require('../Ticket/model')

const Comment = sequelize.define('ticket', {
  comment: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  tableName: 'comments'
})

Comment.belongsTo(User)
Comment.belongsTo(Ticket)

module.exports = Comment