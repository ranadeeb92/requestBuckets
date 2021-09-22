const express = require("express");
const router = express.Router();
const dbQuery = require("./db/sqldb");

router.use(express.json());

// sign up
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await dbQuery(
      "SELECT * users WHERE username = ($1)",
      username
    );

    // if the user is already exists(the username is already taken)
    // send message to the user to try again with different username
    // else
    // hash the user password and add the user to the database
    const user = await dbQuery(
      "INSERT INTO users (username, password) VALUES($1,$2)",
      username,
      hashedPassword
    );
    console.log(`user is added`);
    // redirect the usr to the home page
  } catch (err) {
    console.error(err.message);
  }
});
