const { Sequelize } = require('sequelize');
require('dotenv').config();

//for MySQL
const sequelize = new Sequelize(
  'mydb',
  'root',
  '',{ 
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
});

const db ={}
db.sequelize=sequelize
db.Sequelize=Sequelize;

//Models for the user Table
db.Users= require('../models/userModels')(sequelize,Sequelize);

module.exports = db;
