const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Campus = db.define('campus', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://via.placeholder.com/300',
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
});

const Student = db.define('student', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://via.placeholder.com/150',
  },
  housePoints: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 10
    },
    defaultValue: () => Math.floor(Math.random() * 10) + 1
  }
});

Campus.hasMany(Student);
Student.belongsTo(Campus);

module.exports = { Campus, Student };
