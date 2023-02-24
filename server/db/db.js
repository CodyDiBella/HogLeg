const { Sequelize } = require('sequelize');

const db = new Sequelize('deploy_test_lgkn', 'deploy_test_lgkn_user', 'DEsY8e9vVPtF1lxqgow4IHM0OhCLMbOQ', {
  host: 'dpg-cfseaemn6mplpp8pl3b0-a.ohio-postgres.render.com',
  dialect: 'postgres'
});

module.exports = db;
