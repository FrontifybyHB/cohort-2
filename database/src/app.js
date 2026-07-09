const express = require("express");
const dotenv = require("dotenv");
const notesSchema = require("./module/notes.module")

const app = express();

app.use(express.json());


// POST /notes

app.post("/notes", async (req, res) => {

    const { name, discription } = req.body;

    const data = await notesSchema.create({
        name,
        discription
    })

    res.status(201).json({
        message: "Note created succesfully",
        data: data
    })
})

//GET / notes
app.get("/notes", async (req, res) => {

    const data = await notesSchema.find();

    res.status(200)
        .json({
            message: "Your data",
            notes: data
        })
})

//DELETE /notes/:index

app.delete("/notes/:id", (req, res) => {
    delete notes[req.params.id]

    res.status(204)
        .json({
            message: "note deleted succesfully"
        })
})

// PATCH /notes:index

app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].decrs = req.body.dec

    res.status(200).json({
        message: "change the dec"
    })
})


module.exports = app