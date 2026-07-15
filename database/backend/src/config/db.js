const mongoose = require("mongoose");

const ConnnectDB = () => {
    mongoose.connect(process.env.MONGO_DB)
        .then(() => {
            console.log("Connected to DB")
        })
}

module.exports = ConnnectDB