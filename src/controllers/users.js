const db = require('../db');

// Get all users
exports.getUsers = async (req,res) => {
  try {
    const { rows } = await db.query('select * from users');
    return res.status(200).json({ rows })
  } catch (error) {
    console.log(error.message);
  }

};

// Get user information
exports.getUserInfo = async (req,res) => {
  try {
    let queryString = `SELECT * FROM users WHERE users.id = $1;`;
    let queryParams = [req.params.userId];
    const { rows } = await db.query(queryString, queryParams)
    return res.status(200).json({ rows })
  } catch (error) {
    console.log(error.message);
  }
}
