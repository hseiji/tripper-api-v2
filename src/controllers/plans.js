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