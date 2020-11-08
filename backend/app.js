const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const UserModel = require("./models/user.model");

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

app.get("/signup", async (req, res) => {
  try {
    const { query } = req;
    console.log("params", query);
    const result = await UserModel.create(query);
    res.status(200).send({ result: result });
  } catch (err) {
    res.status(500).send({ error: { message: err.message, code: err.code } });
  }
});

app.get("/login", async (req, res) => {
  try {
    const { query } = req;
    console.log("params", query);
    const result = await UserModel.find(query);
    if (!result || !result.length) {
      throw new Error("User not found");
    }
    res.status(200).send({ result: result[0] });
  } catch (err) {
    res.status(500).send({ error: { message: err.message, code: err.code } });
  }
});

mongoose
  .connect("mongodb://localhost:27017/fullstack", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(8000, () => {
      console.log("Server running");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
