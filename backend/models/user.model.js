const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  username: { type: String, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
