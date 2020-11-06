const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const runningTime = new Date();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.get("/status", (req, res) => {
  res.send("Server is Running since:" + runningTime);
});

app.get("/signup", (req, res) => {
  const { query } = req;
  console.log("params", query);
});

app.listen(8000, () => {
  console.log("Server running");
});
