const express = require('express')
const app = express()
// const { PORT } = require('./src/constants')
const dotenv = require('dotenv')
const cors = require('cors')
const { json, urlencoded } = require('body-parser')

//initialize middlewares
dotenv.config()
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

//import routes
const eventRoutes = require('./src/routes/events')
const userRoutes = require('./src/routes/users')
const planRoutes = require('./src/routes/plans')

//initialize routes
app.use('/api', eventRoutes)
app.use('/api', userRoutes)
app.use('/api', planRoutes)
app.get('/', (req, res) => {
  res.send('Hello there!')
})

//app start
const appStart = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server is ready at http://localhost:${process.env.PORT}`)
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

appStart()
