const env = require('dotenv');
const express = require('express');
const cors = require('cors');
const {router} = require('./routes/router')

env.config();

const app = express();
// parse json request body
app.use(express.json());
// enabling cors
app.use(cors());
// configuring router
app.use(router);

module.exports = app;