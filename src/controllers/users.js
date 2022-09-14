const db = require('../db');

exports.getUsers = async (req,res) => {
  try {
    const { rows } = await db.query('select * from users');
    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message);
  }

};

exports.getUserInfo = async (req,res) => {
  try {
    let queryString = `SELECT * FROM users WHERE users.id = $1;`;
    let queryParams = [req.userId];
    const { rows } = await db.query(queryString, queryParams)
    return res.status(200).json({
      success: true,
      info: rows,
    })
  } catch (err) {
    console.log(error.message);
  }
}

// const getUserInfo = (userId) => {
//   let queryString = `SELECT * FROM users
//   WHERE users.id = $1;`;
//   let queryParams = [userId];

//   return pool
//     .query(queryString, queryParams)
//     .then((res) => {
//       return res.rows;
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };
// exports.getUserInfo = getUserInfo;