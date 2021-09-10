const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const authRouter = require('./auth/router')
const userRouter = require('./User/router')
const eventRouter = require('./Event/router')
const ticketRouter = require('./Ticket/router')
const commentRouter = require('./Comment/router')



const app = express() 
//const jsonParser = bodyParser.json()


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: "https://zen-mclean-ac17d9.netlify.app",
  //origin: "http://localhost:3000" ,
  credentials: true,
}))
//app.use(jsonParser)
app.use(cookieParser())
app.use(authRouter)
app.use(userRouter)
app.use(eventRouter)
app.use(ticketRouter)
app.use(commentRouter)


const port = process.env.PORT || 4000

app.listen(port, function () {
  console.log(`Web server listening on port ${port}`)
})



