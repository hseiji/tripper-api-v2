const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require('./constants');
const cors = require("cors");
const { json, urlencoded } = require("body-parser");

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


//initialize middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

//import routes
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');

//initialize routes
app.use('/api', eventRoutes);
app.use('/api', userRoutes);
app.get('/', (req, res) => {
  res.send("Hello there1")
  console.log("Hello there2");
})
app.get('/test', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const results = { 'results': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
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