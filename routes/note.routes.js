const express = require("express");
const { NoteModel } = require("../model/note.model");
const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  try {
    let notes = await NoteModel.find();
    res.status(400).send(notes);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

noteRouter.post("/add", async (req, res) => {
  try {
    let note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "A new note has been added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

noteRouter.patch("/update/:noteID",async(req, res) => {
  const payload=req.body;
  const noteID=req.params.noteID;
  try{
    await NoteModel.findByIdAndUpdate({_id:noteID},payload)
     res.status(200).send({"msg":"Note has been updated"})
  }catch(err){
    res.status(400).send({"msg":err.message})
  }
});

noteRouter.delete("/delete/:noteID", async(req, res) => {
let noteID=req.params.noteID;
try{
  await NoteModel.findByIdAndDelete({_id:noteID});
  res.status(200).send({"msg":"Note has been deleted"})
  }catch(err){
    res.status(400).send({"msg":err.message})
  }
});

module.exports = {
  noteRouter,
};
