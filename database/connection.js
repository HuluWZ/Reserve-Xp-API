require("dotenv").config() // load .env variables
const mongoose = require("mongoose") //import fresh mongoose object
const {log} = require("mercedlogger") // import merced logger

//DESTRUCTURE ENV VARIABLES
const {DATABASE_URL} = process.env 

// CONNECT TO MONGO
mongoose.connect(DATABASE_URL)

// CONNECTION EVENTS
mongoose.connection
.on("open", () => log.green("Db State", "DB Connection Open"))
.on("close", () => log.magenta("Db State", "DB Connection Open"))
.on("error", (error) => log.red("Db State", error))

// EXPORT CONNECTION
