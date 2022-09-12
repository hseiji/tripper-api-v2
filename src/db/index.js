const { Pool } = require('pg')
const pool = new Pool({
  host: 'localhost',
  user: 'vagrant',
  password: 'vagrant',
  database: 'finaltripper',
  port: 5432,
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}