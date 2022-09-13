const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// const pool = new Pool({
//   host: 'localhost',
//   user: 'vagrant',
//   password: 'vagrant',
//   database: 'finaltripper',
//   port: 5432,
// })






module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
}