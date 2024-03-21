require('dotenv').config();
const { Sequelize } = require('sequelize');



//for MySQL Git 
// const sequelize = new Sequelize(
//   'mydb',
//   'root',
//   '',{ 
//   host: '127.0.0.1',
//   dialect: 'mysql',
//   logging: false,
// });


const sequelize = new Sequelize(

  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, { 
    host: process.env.DB_HOST, 
    dialect: process.env.DB_DIALECT, 
    logging: false,
  }
);

const db ={}
db.sequelize=sequelize
db.Sequelize=Sequelize;

//Models for the user Table
db.Users= require('../models/userModels')(sequelize,Sequelize);

module.exports = db;
