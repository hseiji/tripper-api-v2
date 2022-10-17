const db = require('../db');

exports.getPlans = async (req, res) => {
  try {
    let queryString = `SELECT * FROM plans;`;
    const { rows } = await db.query(queryString)
    return res.status(200).json({ rows })    ;
  } catch (error) {
    return res.status(404).json({
      message: "Error on getPlans: "
    })
  }
}

exports.getPlansForUser = async (req, res) => {
  try {
    console.log("On getPlansForUser...");
    let queryString = `SELECT * FROM plans WHERE plans.user_email = $1;`;
    let queryParams = [req.user.email];
    const { rows } = await db.query(queryString, queryParams)
    return res.status(200).json({ rows });

  } catch (error) {
    console.log("Error on getPlansForUser: ", error.message);
    return res.status(404).json({
      message: "Error on getPlansFor "
    })
  }
}

exports.addNewPlan = async (req, res) => {
  try {
    let queryString = `INSERT INTO plans (user_id, name, ordering, user_email) VALUES ($1, $2, 1, $3);`;
    console.log("on addNewPlan... req.body=", req.body);
    let queryParams = [req.body.info.userId, req.body.info.planName, req.body.info.userEmail];
    const { rows } = await db.query(queryString, queryParams)
    return res.status(200).json({ rows })    
  } catch (error) {
    return res.status(404).json({
      message: "Error on addNewPlan: "
    })
  }
}


exports.deletePlan = async (req, res) => {
  try {
    let queryString = `DELETE FROM plans WHERE id = $1;`;
    let queryParams = [req.params.planId];
    const { rows } = await db.query(queryString, queryParams)
    return res.status(200).json({ rows })       
  } catch (error) {
    return res.status(404).json({
      message: "Error on deletePlan: "
    })
  }
}