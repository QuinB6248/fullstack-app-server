const Sequelize = require('sequelize')
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'
//Sequelizeconstructor takes the connectionstring as argument
const sequelize = new Sequelize(databaseUrl)


sequelize
  .sync()
  .then(() => console.log('Database schema has been updated'))
  .catch(console.error)

module.exports = sequelize