const { Sequelize } = require('sequelize');

const db = new Sequelize('acme_schools_db', 'codydibella', null, {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db;
