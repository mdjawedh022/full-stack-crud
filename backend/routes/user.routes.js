const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//registration
userRouter.post("/register", async (req, res) => {
  const { email, pass, location, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      // Store hash in your password DB.
      const userdata = new UserModel({ email, pass: hash, location, age });
      await userdata.save();
      res.status(200).send({ msg: "registration has been successfull!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "registration failed" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const userdata = await UserModel.findOne({ email });
    console.log(userdata);
    if (userdata) {
      bcrypt.compare(pass, userdata.pass, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "login successfull!",
            token: jwt.sign({"userID":userdata._id }, "masai"),
          });
        } else {
          res.status(400).send({ msg: "wrong crentials" });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "login failed" });
  }
});

module.exports = { userRouter };

// userRouter.get("/details", (req, res) => {
//   const  token  = req.headers.authorization;
//   jwt.verify(token, "bruce", (err, decoded) => {
//     decoded
//       ? res.status(200).send("user Details")
//       : res
//           .status(400)
//           .send({"msg":err.message});
//   });
// });
// userRouter.get("/moviedata", (req, res) => {
//   const  token  = req.headers.authorization;
//   jwt.verify(token, "bruce", (err, decoded) => {
//     decoded
//       ? res.status(200).send("movie")
//       : res
//           .status(400)
//           .send({ "msg": err.message });
//   });
// });
