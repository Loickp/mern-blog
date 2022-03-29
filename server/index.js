require("dotenv").config({ path: "./config.env" });
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser');
const auth_routes = require('./routes/auth');
const posts_routes = require('./routes/posts');
const errorHandler = require('./middleware/error')

app.use(express.json())
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));
app.use(cookieParser());

mongoose.connect('mongodburl', {
  useNewUrlParser: true
})

// routes
app.use('/api/auth', auth_routes);
app.use('/api/posts', posts_routes);

app.use(errorHandler)

app.listen(3001, () => {
  console.log('Server running')
})