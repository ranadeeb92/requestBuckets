const buckets = require("./db.json");
const fs = require("fs");

function exists(bucket) {
  // check if a bucket is already in the data
  if (buckets[bucket]) {
    return true;
  }
  return false;
}

function add(bucket) {
  buckets[bucket] = [];
  save();
}

function addRequest(bucketId, req) {
  buckets[bucketId].push(req);
  save();
}

function getRequests(bucketId) {
  return buckets[bucketId];
}

function save() {
  fs.writeFile("./db/db.json", JSON.stringify(buckets), "utf-8", (err) => {
    console.log(err);
  });
}

module.exports = { exists, add, addRequest, getRequests };
