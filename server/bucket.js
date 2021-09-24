const express = require("express");
const multipart = require("connect-multiparty");
const router = express.Router();
const db = require("./db/db.js");

db.connect();

let multipartMiddleware = multipart();
router.use(express.json());
router.use(express.text());
router.use(express.urlencoded({ extended: true }));

router.get("/:bucketId/inspect", async (req, res) => {
  const bucketId = req.params.bucketId;

  if (!(await db.exists(bucketId))) {
    res.status(404).send();
  }
  let bucketRequests = await db.getRequests(bucketId);
  res.json(bucketRequests);
});

router.get("/:bucketId", async (req, res) => {
  let io = req.app.get("socketio");
  const bucketId = req.params.bucketId;
  if (!(await db.exists(bucketId))) {
    res.status(404).send();
  }
  await db.addRequest(bucketId, {
    Header: req.headers,
    Body: null,
    RequestType: "GET",
  });
  io.emit("chat", { bucketId });
  res.status(200).end();
});

router.post("/:bucketId", multipartMiddleware, async (req, res) => {
  let io = req.app.get("socketio");
  const bucketId = req.params.bucketId;
  if (!(await db.exists(bucketId))) {
    res.status(404).send();
  }
  if (Object.keys(req.body).length === 0) {
    req.body = "{}";
  }
  await db.addRequest(bucketId, {
    Header: req.headers,
    Body: req.body,
    RequestType: "POST",
  });
  io.emit("chat", { bucketId });
  res.status(200).end();
});

//const sockets = {};
// await io.on("connect", (socket) => {
//   console.log("Made socket connection");
//   if (sockets[bucketId]) {
//     sockets[bucketId].push(socket);
//   } else {
//     sockets[bucketId] = [socket];
//   }

// socket.on("disconnect", () => {
//   sockets[bucketId] = sockets[bucketId].filter((s) => s.id !== socket.id);
// });

//socket.emit("chat", { key: "hey" });
//});

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
