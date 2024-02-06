const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleWare/errorMiddleWare')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/goals', require('./routes/goalRoutes'));

// Overrides default express erro;r handler
app.use(errorHandler);

app.listen(port, () => console.log('Server started: ' + port));
