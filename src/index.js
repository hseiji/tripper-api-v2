const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require('./constants');
const cors = require("cors");
const { json, urlencoded } = require("body-parser");

//initialize middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

//import routes
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');
const planRoutes = require('./routes/plans');

//initialize routes
app.use('/api', eventRoutes);
app.use('/api', userRoutes);
app.use('/api', planRoutes);
app.get('/', (req, res) => {
  res.send("Hello there1")
  
})

//app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is ready at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

appStart();