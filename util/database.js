const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-shop', 'root', 'T0mmyShelby', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
