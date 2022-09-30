const db = require('../db');
const bcrypt = require('bcrypt')
require('dotenv').config();
const jwt = require('jsonwebtoken');

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
    const { rows } = await db.query(queryString, queryParams);

    //First check the username
    if (rows.length === 0) {
      return  res.status(400).json("No user");
    } else {

      //Now it checks the password - Authenticate user
      if (await bcrypt.compare(req.body.password, rows[0].password)) {       

        //Creates JWT
        const accessTkn = jwt.sign(rows[0], process.env.ACCESS_TOKEN_SECRET);
        
        console.log("token: ", accessTkn);        
        console.log("user: ", rows[0].email);
        console.log("Login successful");
        res.status(200).json({ 
          accessToken: accessTkn,
          user_id: rows[0].id,
          user_name: rows[0].name,
          user_email: rows[0].email,
          lat: "43.6532976025993",
          lng: "-79.38359538925825"
         });

      } else {
        res.send("Wrong credentials")
        return
      }
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
    return
  }
}

exports.authToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}
