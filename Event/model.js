const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../User/model')

const Event = sequelize.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
  start: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  end: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  avg_price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'events'
})

Event.belongsTo(User)

module.exports = Event