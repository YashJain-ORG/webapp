const { Sequelize } = require('sequelize');
require('dotenv').config();

//for MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME, // Use the DB_NAME from .env
  process.env.DB_USER, // Use the DB_USER from .env
  process.env.DB_PASSWORD, { // Use the DB_PASSWORD from .env
    host: process.env.DB_HOST, // Use the DB_HOST from .env
    dialect: process.env.DB_DIALECT, // Use the DB_DIALECT from .env
    logging: false,
  }
);

const db ={}
db.sequelize=sequelize
db.Sequelize=Sequelize;

//Models for the user Table
db.Users= require('../models/userModels')(sequelize,Sequelize);

module.exports = db;
