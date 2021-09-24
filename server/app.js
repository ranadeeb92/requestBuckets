const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  path: "/inspect",
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.set("socketio", io);

const createBucket = require("./createBucket");
const bucket = require("./bucket");
const PORT = 5000;

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
