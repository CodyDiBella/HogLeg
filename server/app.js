const express = require('express')
const path = require('path')
const cors = require('cors')
const volleyball = require('volleyball')
const { Campus } = require('./db/models')
const app = express()

// static middleware
app.use(express.static(path.join(__dirname, '..','public')))

app.use(cors())
app.use(volleyball)

// Route for serving up all campuses
app.get('/api/campuses', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    res.json(campuses);
  } catch (err) {
    next(err);
  }
});

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
