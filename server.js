const express = require('express')
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const AuthRoute = require('./src/Back/routes/auth')



mongoose.connect(process.env.MongoDB_URI || 'mongodb://localhost:27017/testdb', { useNewUrlParser: true , useUnifiedTopology: true });
mongoose.set('useFindAndModify', true);
mongoose.set('useCreateIndex', true);


// mongoose
// .connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true , useUnifiedTopology: true })
// .then(() => console.log('MongoDB Connected'))
// //.catch((err) => console.log(err));


const db = mongoose.connection



db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Connected to database')
})
 
const app = express()

app.use(cors());

app.use(function (req, res, next) {
 res.header("Access-Control-Allow-Origin", "*" );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api', AuthRoute)

