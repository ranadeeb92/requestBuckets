const express = require("express");
const PORT = 5000;

const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: "/",
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const cors = require("cors");
const createBucket = require("./createBucket");
const bucket = require("./bucket");

app.use(cors());
app.use("/b", bucket);
app.use("/", createBucket);

io.on("connection", (socket) => {
  console.log("Made socket connection");
  socket.on("chat", (x) => {
    console.log(x);
    io.emit("chat", x);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
