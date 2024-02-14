const { Sequelize } = require('sequelize');
require('dotenv').config();

// For postgress
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_Name,
  process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
  logging: false,
});

// // For postgress
// const sequelize = new Sequelize('mydb', 'postgres', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging: false,
// });

// for MySQL
// const sequelize = new Sequelize('mydb', 'root', 'password', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
// });

const db ={}
db.sequelize=sequelize
db.Sequelize=Sequelize;

//Models for the user Table
db.Users= require('../models/userModels')(sequelize,Sequelize);

module.exports = db;
