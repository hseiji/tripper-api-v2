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
exports.getEventsForPlan = async (req, res) => {
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
    console.log(error.message);
  }
}

// Get specific event by its id
exports.getEventById = async (req, res) => {
  try {
    let queryString = `SELECT * FROM events WHERE id = $1;`;
    let queryParams = [req.params.eventId];
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

// Add Event to Plan
exports.addEventToPlan = async (req, res) => {
  try {
    let queryString = `INSERT INTO events (id, plan_id, name, description, image, lat, lng, date_time, street_address, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), $8, $9);`;
    let queryParams = [
      req.body.event.id,
      req.params.planId,
      req.body.event.name,
      req.body.event.alias,
      req.body.event.url,
      req.body.event.lat,
      req.body.event.lng,
      req.body.event.address,
      req.body.event.image_url,
    ];
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

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    let queryString = `DELETE FROM events WHERE id = $1;`;
    let queryParams = [req.params.eventId];
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