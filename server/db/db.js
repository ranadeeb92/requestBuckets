const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let db;
const connect = () => {
  if (db) return db;
  MongoClient.connect(process.env.DB_URI, { useUnifiedTopology: true })
    .then((client) => {
      db = client.db("BucketsDB");
    })
    .catch((error) => console.error(error));
};

const exists = async (bucketId) => {
  let buckets = await db.collection("Buckets");
  let res = await buckets.findOne({ bucketId: bucketId });
  if (res) {
    return true;
  }
  return false;
};

const add = async (bucketObj) => {
  let buckets = await db.collection("Buckets");
  await buckets.insertOne(bucketObj);
};

const addRequest = async (bucketId, req) => {
  let buckets = await db.collection("Buckets");
  let res = await buckets.findOne({ bucketId: bucketId });
  res.requests.push(req);
  await buckets.updateOne({ bucketId }, { $set: { ...res } }, { upsert: true });
};

const getRequests = async (bucketId) => {
  let buckets = await db.collection("Buckets");
  let res = await buckets.findOne({ bucketId: bucketId });
  return res.requests;
};
module.exports = { connect, exists, add, addRequest, getRequests };

// const buckets = require("./db.json");
// const fs = require("fs");

// function exists(bucket) {
//   // check if a bucket is already in the data
//   if (buckets[bucket]) {
//     return true;
//   }
//   return false;
// }

// function add(bucket) {
//   buckets[bucket] = [];
//   save();
// }

// function addRequest(bucketId, req) {
//   buckets[bucketId].push(req);
//   save();
// }

// function getRequests(bucketId) {
//   return buckets[bucketId];
// }

// function save() {
//   fs.writeFile("./db/db.json", JSON.stringify(buckets), "utf-8", (err) => {
//     console.log(err);
//   });
// }

//module.exports = { exists, add, addRequest, getRequests };
