const express = require("express");
const multipart = require("connect-multiparty");
const router = express.Router();
const db = require("./db/db.js");

let multipartMiddleware = multipart();
router.use(express.json());
router.use(express.text());
router.use(express.urlencoded({ extended: true }));

router.get("/:bucketId", async (req, res) => {
  let io = req.app.get("socketio");
  const bucketId = req.params.bucketId;
  if (!(await db.exists(bucketId))) {
    res.status(404).send();
  }
  let r = { Header: req.headers, Body: null, RequestType: "GET" };
  await db.addRequest(bucketId, r);
  res.status(200).end();
  io.sockets.sockets.forEach((c) => {
    if (c.data.bucketID === bucketId) {
      io.emit("chat", [r]);
    }
  });
});

router.post("/:bucketId", multipartMiddleware, async (req, res) => {
  let io = req.app.get("socketio");
  const bucketId = req.params.bucketId;
  if (!(await db.exists(bucketId))) {
    res.status(404).send();
  }

  let r = {
    Header: req.headers,
    Body: Object.keys(req.body).length === 0 ? null : req.body,
    RequestType: "POST",
  };
  await db.addRequest(bucketId, r);
  res.status(200).end();
  io.sockets.sockets.forEach((c) => {
    if (c.data.bucketID === bucketId) {
      io.emit("chat", [r]);
    }
  });
});

//router.get("/:bucketId/inspect", (req, res) => {
// const bucketId = req.params.bucketId;
// if (!db.exists(bucketId)) {
//   res.status(404).send();
// }
// let bucketRequests = db.getRequests(bucketId);
// res.json(bucketRequests);
//});

//router.get("/:bucketId", (req, res) => {
// const bucketId = req.params.bucketId;
// if (!db.exists(bucketId)) {
//   res.status(404).send();
// }
// db.addRequest(bucketId, {
//   Header: req.headers,
//   Body: null,
//   RequestType: "GET",
// });
// res.status(200).send();
//});

//router.post("/:bucketId", multipartMiddleware, (req, res) => {
// const bucketId = req.params.bucketId;
// if (!db.exists(bucketId)) {
//   res.status(404).send();
// }
// console.log(req.body);
// db.addRequest(bucketId, {
//   Header: req.headers,
//   Body: req.body,
//   RequestType: "POST",
// });
// res.status(200).send();
//});

module.exports = router;
