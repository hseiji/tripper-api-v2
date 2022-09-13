const db = require('../db');

exports.getEvents = async (req,res) => {
  try {
    const client = await db.connect();
    const { rows } = await db.query('select * from events');
    return res.status(200).json({
      success: true,
      users: rows,
    })
    client.release();
  } catch (error) {
    console.log(error.message);
  }

};