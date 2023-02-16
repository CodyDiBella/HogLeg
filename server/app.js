const express = require('express');
const path = require('path');
const cors = require('cors');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const { Campus, Student } = require('./db/models');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors());
app.use(volleyball);
app.use(bodyParser.json());

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

app.get('/api/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: {
        model: Campus,
        attributes: ['id', 'name'],
        required: false
      }
    });
    res.json(student);
  } catch (err) {
    next(err);
  }
});

app.post('/api/campuses', async (req, res) => {
  const { name, address, imageUrl, description } = req.body;

  try {
    const newCampus = await Campus.create({
      name,
      address,
      imageUrl,
      description
    });

    res.status(201).json(newCampus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create campus' });
  }
});

app.post('/api/students', async (req, res) => {
  const { firstName, lastName, imageUrl, campusId } = req.body;

  try {
    const newStudent = await Student.create({
      firstName,
      lastName,
      imageUrl,
      campusId
    });

    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create student' });
  }
});

app.put('/api/campuses/:id', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    await campus.update(req.body);
    res.json(campus);
  } catch (err) {
    next(err);
  }
});

app.put('/api/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.update(req.body);
    res.json(student);
  } catch (err) {
    next(err);
  }
});

app.put('/api/students/:id/campus', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.update({ campusId: req.body.campusId });
    res.json(student);
  } catch (err) {
    next(err);
  }
});


app.delete('/api/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});


app.delete('/api/campuses/:id', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    await campus.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});


app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;
