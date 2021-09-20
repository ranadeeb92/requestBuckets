const express = require("express");
const PORT = 5000;
const app = express();
const cors = require("cors");
const createBucket = require("./createBucket");
const bucket = require("./bucket");

app.use(cors());
app.use("/b", bucket);
app.use("/", createBucket);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
