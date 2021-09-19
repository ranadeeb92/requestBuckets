const express = require("express");
const PORT = 3000;
const app = express();
const createBucket = require("./createBucket");
const bucket = require("./bucket");

app.use("/b", bucket);
app.use("/", createBucket);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
