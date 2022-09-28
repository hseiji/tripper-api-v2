const db = require('../db');
const bcrypt = require('bcrypt')

// Get all users
exports.getUsers = async (req,res) => {
  try {
    const { rows } = await db.query('select * from users');
    return res.status(200).json({ rows })
  } catch (error) {
    console.log(error.message);
  }

};

// Get user information
exports.getUserInfo = async (req,res) => {
  try {
    let queryString = `SELECT * FROM users WHERE users.id = $1;`;
    let queryParams = [req.params.userId];
    const { rows } = await db.query(queryString, queryParams)
    return res.status(200).json({ rows })
  } catch (error) {
    console.log(error.message);
  }
}

// Add new user
exports.addNewUser = async (req, res) => {
  try {
    let queryString = `INSERT INTO users (name, email, password, lat, lng) VALUES ($1, $2, $3, $4, $5);`;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    let queryParams = [req.body.name, req.body.email, hashedPassword, "43.6532976025993", "-79.38359538925825"];
    const { rows } = await db.query(queryString, queryParams);
    return res.status(200).json({ rows });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
}

// Authenticate user
exports.authUser = async (req, res) => {
  try {
    let queryString = `SELECT * FROM users WHERE users.email = $1`;
    let queryParams = [req.body.email];
    const { user } = await db.query(queryString, queryParams);
    
    console.log("user:", user);

    //First check the username
    if (user === null) {
      res.status(400).json("Wrong credentials.");
    } else {
      //Now it checks the password
      if (await bcrypt.compare(req.body.password, user.password)) {
        res.status(200).json("Login successful");
      } else {
        res.send("Not allowed")
      }
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}