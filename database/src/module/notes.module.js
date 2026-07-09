const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    name: String,
    discription: String
})

const schema =  mongoose.model("notes", NotesSchema)
module.exports = schema