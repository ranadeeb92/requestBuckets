const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const uuid = require("uuid");
const db = require("./db/db.js");

db.connect();

// create bucket
router.post("/", async (req, res) => {
  let bucketId = "";
  do {
    let uniqueId = uuid.v4();
    const hash = crypto.createHash("sha256").update(uniqueId).digest("HEX");
    bucketId = hash.slice(0, 8);
  } while (await db.exists(bucketId));

  await db.add({ bucketId: bucketId, requests: [] });
  res.json({ bucketId: bucketId });
});

//router.post("/", (req, res) => {
// let bucketID = "";
// do {
//   let uniqueID = uuid.v4();
//   const hash = crypto.createHash("sha256").update(uniqueID).digest("HEX");
//   bucketID = hash.slice(0, 8);
// } while (db.exists(bucketID));
// db.add(bucketID);
// res.json({ bucketId: bucketID });
//});

module.exports = router;
