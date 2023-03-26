const express = require("express");
const { connection } = require("./db");
const { auth } = require("./middleware/auth.middleware");
const { noteRouter } = require("./routes/note.routes");
const { userRouter } = require("./routes/user.routes");
require("dotenv").config();
// const cors=require('cors')
const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use(auth);
app.use("/note", noteRouter);
// app.use(cors())

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connect with db");
  } catch (err) {
    console.log("something wrong!");
    console.log(err);
  }
  console.log(`server running on the ${process.env.port}`);
});
