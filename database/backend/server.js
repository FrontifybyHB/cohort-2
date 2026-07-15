const app = require("./src/app")
const dotenv = require("dotenv");
const ConnnectDB  = require("./src/config/db");

dotenv.config();

ConnnectDB()

app.listen(4000, () => {
    console.log("server is runing on 4000")
})