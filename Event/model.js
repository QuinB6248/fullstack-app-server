const Sequelize = require('sequelize')
const sequelize = require('../db')

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
    type: Sequelize.DATEONLY
  },
  end: {
    type: Sequelize.DATEONLY
  },
  avg_price: {
    type: Sequelize.DECIMAL
  }
}, {
  timestamps: false,
  tableName: 'events'
})

module.exports = Event