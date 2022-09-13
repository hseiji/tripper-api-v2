const db = require('../db');

exports.getEvents = async (req,res) => {
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