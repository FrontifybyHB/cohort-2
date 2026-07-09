const express = require("express");

const app = express();

app.use(express.json())


// POST /notes

app.post("/notes", (req, res) => {
    data = notes.push(req.body)
    res.status(201).json({
        message: "Note created succesfully",
        data: data
    })
})

//GET / notes
app.get("/notes", (req, res) => {
    res.status(200)
        .json({
            notes: notes
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

app.patch("/notes/:index", (req, res)=>{
    notes[req.params.index].decrs = req.body.dec

    res.status(200).json({
        message: "change the dec"
    })
})


module.exports = app