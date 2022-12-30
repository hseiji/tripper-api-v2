const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
})

// const pool = new Pool({
//   host: 'localhost',
//   user: 'vagrant',
//   password: 'vagrant',
//   database: 'finaltripper',
//   port: 5432,
// })

// change host from heroku to render

pool
  .connect()
  .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`))

module.exports = pool
