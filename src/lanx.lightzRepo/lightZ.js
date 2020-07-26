const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv/config');

// Middle wares
app.use(cors());
app.use(bodyParser.json());

// import routers
const reportRoute = require('./routes/report')
app.get('/report', reportRoute)

// Routes
app.get('/', (req, res) => {
    res.send(' Here we are')
});

// connect to a DB
mongoose.connect(process.env.DB_CONNECTION,
    {useUnifiedTopology: true}, () => {
        console.log('connected to DB')
    })

// server listening
app.listen(8000);