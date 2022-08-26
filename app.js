//mongodb+srv://mongodb:<password>@cluster0.w1et3.mongodb.net/?retryWrites=true&w=majority

//Mongo DB
const mongoose = require("mongoose")
mongoose
  .connect(
    "mongodb+srv://mongodb:VhntXV5ap0IXacmx@cluster0.w1et3.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected successfully to mongo db")
  })
  .catch((error) => {
    console.log("Can't connect to mongo dg")
    console.error(error)
  })

const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const app = express()
const stuffRoutes = require("./routes/stuffRoutes")
const userRoutes = require("./routes/userRoutes")
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  )

  next()
})
app.use(bodyParser.json())
app.use(
  "/images",
  express.static(path.join(__dirname, "images"))
)

app.use("/api/stuff", stuffRoutes)
app.use("/api/auth", userRoutes)

module.exports = app
