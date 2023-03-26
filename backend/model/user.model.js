const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: String,
    pass: String,
    location: String,
    age: Number,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("student", userSchema);

module.exports = {
  UserModel,
};
