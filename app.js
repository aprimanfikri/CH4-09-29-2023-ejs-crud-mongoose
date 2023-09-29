// CORE PACKAGE/MODULE

// THIRD PARTY PACKAGE/MODULE
const express = require("express")
const morgan = require("morgan")

// OUR OWN PACKAGE/MODULE
const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")
const adminRouter = require("./routes/adminRoutes")

const app = express()

// middleware dari express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
// biar bisa baca static file
app.use(express.static(`${__dirname}/public`))

// setting view engine
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)
app.use("/dashboard", adminRouter)

module.exports = app
