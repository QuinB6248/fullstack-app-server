const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../User/model')
const Event = require('../Event/model')

const Ticket = sequelize.define('ticket', {
 
  image: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  risk: {
    type: Sequelize.INTEGER
  },

}, {
  timestamps: false,
  
})

Ticket.belongsTo(User)
Ticket.belongsTo(Event)

module.exports = Ticket