const express = require("express")
const app = express();

app.use(express.json());

const notes = [];

app.get("/notes", (req, res) => {
    return res.send(notes);
})

app.post("/notes", (req, res) => {
    const data = req.body;
    notes.push(data);
    return res.send("created")
})

app.listen(8081, () => {
    console.log("server is running")
})