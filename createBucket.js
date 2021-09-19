const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const uuid = require("uuid");
const db = require("./db/db.js");

// create bucket
router.post("/", (req, res) => {
  let bucketID = "";
  do {
    let uniqueID = uuid.v4();
    const hash = crypto.createHash("sha256").update(uniqueID).digest("HEX");
    bucketID = hash.slice(0, 8);
  } while (db.exists(bucketID));

  db.add(bucketID);
  res.json({ bucketId: bucketID });
});

module.exports = router;
