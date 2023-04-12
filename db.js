const Sequelize = require('sequelize')
const databaseUrl = process.env.DATABASE_URL || 'postgres://nvmpvlig:J_RJ43B-podqX4b64mtMCUG1LBH-NWR2@dumbo.db.elephantsql.com/nvmpvlig'
//Sequelizeconstructor takes the connectionstring as argument
const sequelize = new Sequelize(databaseUrl)


sequelize
  .sync()
  .then(() => console.log('Database schema has been updated'))
  .catch(console.error)

module.exports = sequelize