const express = require("express");
const router = express.Router();
const dbQuery = require("./db/sqldb");

router.use(express.json());

// sign in
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await dbQuery(
      "SELECT password FROM users WHERE username = ($1)",
      username
    );
    console.log(`we are in the post route`);
    // check the hash of the input password if it is matching the save hashed password
  } catch (err) {
    console.error(err.message);
  }
});
