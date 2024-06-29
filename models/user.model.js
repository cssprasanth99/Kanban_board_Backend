const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
