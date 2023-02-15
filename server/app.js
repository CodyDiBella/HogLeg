const express = require('express')
const path = require('path')
const cors = require('cors')
const volleyball = require('volleyball')
const { Campus, Student } = require('./db/models')
const app = express()

app.use(express.static(path.join(__dirname, '..','public')))

app.use(cors())
app.use(volleyball)

app.get('/api/campuses', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    res.json(campuses);
  } catch (err) {
    next(err);
  }
});

app.get('/api/students', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    next(err);
  }
});

app.get('/api/campuses/:id', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id, {
      include: {
        model: Student,
        attributes: ['id', 'firstName', 'lastName']
      }
    });
    res.json(campus);
  } catch (err) {
    next(err);
  }
});



app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
