const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db/db.js");
const createBucket = require("./createBucket");
const bucket = require("./bucket");

const PORT = 5000;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// connect to db
db.connect();

app.set("socketio", io);

io.on("connect", async (socket) => {
  console.log(socket.handshake.query);
  socket.data.bucketID = socket.handshake.query.bucketID;

  if (!(await db.exists(socket.data.bucketID))) {
    return;
  }

  let bucketRequests = await db.getRequests(socket.data.bucketID);
  socket.emit("chat", bucketRequests);
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(cors());
app.use("/b", bucket);
app.use("/", createBucket);

// io.on("connect", (socket) => {
//   console.log("Made socket connection");
//   socket.emit("chat", { key: "hey" });
// });
