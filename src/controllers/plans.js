const db = require('../db');

exports.getPlansForUser = async (req,res) => {
  try {
    let queryString = `SELECT * FROM plans WHERE plans.user_id = $1;`;
    let queryParams = [req.params.userId];
    const { rows } = await db.query(queryString, queryParams)
    return res.status(200).json({
      success: true,
      data: rows,
      queryParams: queryParams,
    })    
  } catch (error) {
    console.log(error.message);
  }
}



// Create a New Plan
// const addNewPlan = (userId, planName) => {
//   let queryString = `INSERT INTO plans (user_id, name, ordering) VALUES ($1, $2, 1);`;
//   let queryParams = [userId, planName];

//   return pool
//     .query(queryString, queryParams)
//     .then((res) => {
//       return res.rows;
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };
