const express = require("express");
const dotenv = require("dotenv");
const notesSchema = require("./module/notes.module");
const cors = require("cors");
const morgan = require('morgan');
const path = require("path")

const app = express();
app.use(morgan('tiny'))
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(express.static("public"));


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

    console.log(res)

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

    await notesSchema.findByIdAndDelete(id)

    res.status(204)
        .json({
            message: "note deleted successfully"
        })
})

// PATCH /notes:index

app.patch("/notes/:id", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    const data = await notesSchema.findByIdAndUpdate(
        id,
        { description },
        {
            returnDocument: "after",
            runValidators: true,
        }
    );

    res.status(200).json({
        message: "Updated successfully",
        data,
    });
});


app.use("*name", (req, res) => {
    res.sendFile(path(__dirname + ".." + "/pubilc/index.html"))
})


module.exports = app