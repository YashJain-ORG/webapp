const { Sequelize } = require('sequelize');
require('dotenv').config();

//for MySQL
const sequelize = new Sequelize(
  process.env.DATABASE, //'mydb',
  process.env.HOSTNAME, //'root',
  process.env.PASSWORD,{ //'password', 
  host: process.env.HOST,
  dialect: 'mysql',
  logging: false,
});

const db ={}
db.sequelize=sequelize
db.Sequelize=Sequelize;

//Models for the user Table
db.Users= require('../models/userModels')(sequelize,Sequelize);

module.exports = db;
