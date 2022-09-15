const { Pool } = require('pg');
const db = require('../db');

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const { rows } = await db.query('select * from events');
    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message);
  }

};

// Get events for a specific plan id
exports.getEventsForPlan = (req, res) => {
  try {
    let queryString = `SELECT * FROM events WHERE events.plan_id = $1 ORDER BY date_time`;
    let queryParams = [req.params.planId];
    const { rows } = await db.query(queryString, queryParams)
    return res.status(200).json({
      success: true,
      data: rows,
      queryParams: queryParams,
    })
  } catch (error) {
    
  }
}
