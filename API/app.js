const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const errorMiddleware = require('./middlewares/error.middleware');

app.use(cors());
app.use(express.json()); 
app.use(morgan('dev'));

app.use(errorMiddleware);

module.exports = app;