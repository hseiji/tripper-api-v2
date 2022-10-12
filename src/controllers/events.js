const db = require('../db');
const yelpKey = process.env.YELP_APIKEY;
const yelp = require('yelp-fusion');
const client = yelp.client(yelpKey);


// Get all events
exports.getEvents = async (req, res) => {
  try {
    const { rows } = await db.query('select * from events');
    return res.status(200).json({ rows });
  } catch (error) {
    console.log(error.message);
  }

};

// Get events for a specific plan id
exports.getEventsForPlan = async (req, res) => {
  try {
    console.log("selectedPlan back:", selectedPlan);
    let queryString = `SELECT * FROM events WHERE events.plan_id = $1 ORDER BY date_time`;
    // let queryParams = [req.params.planId];
    let queryParams = [2];
    const { rows } = await db.query(queryString, queryParams)
    return res.status(200).json({ rows })
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
    return res.status(200).json({ rows })
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
    return res.status(200).json({ rows })
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
    return res.status(200).json({ rows })    
  } catch (error) {
    console.log(error.message);
  }
}

// Mark Event as "done"
exports.markEventDone = async (req, res) => {
  try {
    let queryString = `UPDATE events SET done = NOT done WHERE id = $1;`;
    let queryParams = [req.params.eventId];
    const { rows } = await db.query(queryString, queryParams)
    return res.status(200).json({ rows });
  } catch (error) {
    console.log(error.message);
  }  
}

// Search keyword based on location
exports.getSearch = async (req, res) => {
  try {
    const data = await searchYelp(req.params.keyword, req.params.location);
    return res.send(data.businesses);
  } catch (error) {
    console.log(error.message);
  }    
}

// getSearch function - Yelp Search
function searchYelp(keyword, location) {
  return client.search({
    term: keyword,
    location: location,
    limit: 5,
  }).then(res => {
    return res.jsonBody;
  }).catch(e => {
    console.log(e);
  });
}