const { DataTypes } = require('sequelize');
const db = require('./db');

const Campus = db.define('campus', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://www.placecage.com/200/300',
  },
});

const Student = db.define('student', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations between tables
Campus.hasMany(Student);
Student.belongsTo(Campus);

module.exports = { Campus, Student };
