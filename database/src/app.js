const express = require("express");
const dotenv = require("dotenv");
const notesSchema = require("./module/notes.module")

const app = express();

app.use(express.json());


// POST /notes

app.post("/notes", async (req, res) => {

    const { name, description } = req.body;

    const data = await notesSchema.create({
        name,
        description
    })

    res.status(201).json({
        message: "Note created successfully",
        data: data
    })
})

//GET / notes
app.get("/notes", async (req, res) => {

    const data = await notesSchema.find();

    res.status(200)
        .json({
            message: "Get Your data successfully",
            notes: data
        })
})

//DELETE /notes/:index

app.delete("/notes/:id", async (req, res) => {

    const id = req.params.id

    await notesSchema.findOneAndDelete(id)

    res.status(204)
        .json({
            message: "note deleted successfully"
        })
})

// PATCH /notes:index

app.patch("/notes/:index", async (req, res) => {

    const id = req.params.id
    const { description } = req.body

    await notesSchema.findOneAndUpdate(id, {description})

    res.status(200).json({
        message: "Updated successfully"
    })
})


module.exports = app