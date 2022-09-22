const db = require('../db');

exports.getPlans = async (req,res) => {
  try {
    let queryString = `SELECT * FROM plans;`;
    const { rows } = await db.query(queryString)
    return res.status(200).json({ rows })    ;
  } catch (error) {
    console.log(error.message);
  }
}

exports.getPlansForUser = async (req,res) => {
  try {
    let queryString = `SELECT * FROM plans WHERE plans.user_id = $1;`;
    let queryParams = [req.params.userId];
    const { rows } = await db.query(queryString, queryParams)
    return res.status(200).json({ rows });
    // return res.status(200).json({
    //   success: true,
    //   data: rows,
    //   queryParams: queryParams,
    // })    
  } catch (error) {
    console.log(error.message);
  }
}

exports.addNewPlan = async (req, res) => {
  try {
    let queryString = `INSERT INTO plans (user_id, name, ordering) VALUES ($1, $2, 1);`;
    let queryParams = [req.body.info.userId, req.body.info.planName];
    const { rows } = await db.query(queryString, queryParams)
    return res.status(200).json({ rows })    
  } catch (error) {
    console.log(error.message);
  }  
}


exports.deletePlan = async (req, res) => {
  try {
    let queryString = `DELETE FROM plans WHERE id = $1;`;
    let queryParams = [req.params.planId];
    const { rows } = await db.query(queryString, queryParams)
    return res.status(200).json({ rows })       
  } catch (error) {
    console.log(error);
  }
}