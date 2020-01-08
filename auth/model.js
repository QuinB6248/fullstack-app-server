const Sequelize = require('sequelize')
const sequelize = require('../db')


const Token = sequelize.define('token', {
  name: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  tableName: 'token'
})



module.exports = Token