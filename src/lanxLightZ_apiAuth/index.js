const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = express();

// import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post')

dotenv.config();

// connect to Db
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true },
  () => console.log('connected to BD')
);

//middleware
app.use(express.json());

// Route middle wares
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);


app.listen(3000, () => console.log('sever is running on port 3000'));