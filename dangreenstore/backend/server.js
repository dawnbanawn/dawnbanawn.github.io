const path = require("path")
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
var cors = require('cors')

const PORT = process.env.PORT || 5000

// connect o database
connectDB()

const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))



// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// serve frontend
if(process.env.node_env == "production") {
    //set build folder as static
    app.use(express.static(path.join(__dirname, "../frontend/build")))
    app.get("*", (req, res) => res.sendFile(__dirname, "../", "frontend", "build", "index.html"))
} else {
    app.get('/', (req, res) => {
        res.status(200).send({message: "Welcome"})
    })
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log("server started")
})