const db = require('../db');

exports.getUsers = async (req,res) => {
  try {
    const response = await db.query('select * from users');
  } catch (error) {
    console.log(error.message);
  }

};