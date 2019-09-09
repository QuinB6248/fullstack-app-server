const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db')

const authRouter = require('./auth/router')
const userRouter = require('./User/router')
const eventRouter = require('./Event/router')
const ticketRouter = require('./Ticket/router')
const commentRouter = require('./Comment/router')



const app = express() 
const jsonParser = bodyParser.json()



app.use(cors())
app.use(jsonParser)
app.use(authRouter)
app.use(userRouter)
app.use(eventRouter)
app.use(ticketRouter)
app.use(commentRouter)



const port = process.env.PORT || 4000

app.listen(port, function () {
  console.log(`Web server listening on port ${port}`)
})