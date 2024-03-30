const express = require('express');
const { sequelize,Sequelize } = require ("./src/configs/config.js")
const app = express();
const bodyParser = require('body-parser');
const PORT= 3000;
const db = require('./src/configs/config.js');
const User =db.Users;
const controller= require('./src/controllers/userController.js')
const saltRounds = 10;

const helthMiddle = require('./src/middlewares/healthzMiddleware.js')
const authMiddle = require('./src/middlewares/authMiddleware.js')
app.use(bodyParser.json());

const logger = require('./logger.js');


var passHash;
const bcrypt = require('bcryptjs');
// const { default: logger } = require('./logger.js');
// const winston = require('winston');
//Create Table if Not Exist.. 
//asdf
db.sequelize.sync();

//For Logging the information by winston start

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     new winston.transports.File({ filename: './myapp.log'}),
//     // new winston.transports.File({ filename: '/Users/yashsmac/Desktop/CLOUD/Assignmnet-04/webapp-fork/myapp.log'}),
//   ],
// });

// logger.log({
//   level: 'INFO',
//   severity: 'INFO',
//   message: 'starting the server..',
//   timestamp: new Date().toISOString(),
//   host: process.env.DB_HOST,
//   port: "3000",
//   node_version: process.version,
//   process_id: process.pid,
// });

//For Logging the information by winston end

//************************ Healthz ******************************* */

app.get('/healthz',helthMiddle.checkRequestBody,helthMiddle.checkUrlz,helthMiddle.chcekHttmMethod, async(req,resp)=>{
  try {
    await sequelize.authenticate();
    // console.log('Connection has been established successfully.');
    logger.debug('Connection has been established successfully.');
    logger.info('Helthz connected successfully.');

    resp.status(200).send();
  } catch (error) {
    // console.error(error.message);
    logger.error('Helthz  not connected successfully.');
    resp.status(503).send();
  }
});

//************************ Healthz END ******************************* */

//*********************** Search User ******************************
app.get('/v1/user/self',authMiddle.checkUrlz,authMiddle.authenticationMiddleware,async(req,resp)=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await controller.searchUser(req, resp);
  } catch (error) {
    console.error(error.message);
    resp.status(503).send();
  }
});

//*********************** Search User End ******************************

//*************************** Update User ********************************

app.put('/v1/user/self',authMiddle.authenticationMiddleware,async(req,resp)=>{
  try {
    console.log("update User");
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await controller.updateUser(req, resp);
  } catch (error) {
    console.log(error.message);
    resp.status(503).send();
  }
})

//For chceking and handling the http method
app.all('/v1/user/self', async(req,resp)=>{
  return resp.status(405).send();
})

//*************************** Update User END ********************************

//****************Create new User ************************

app.post('/v1/user',authMiddle.checkUrl, async (req, resp) => {
  try {
    console.log("post here");
    await sequelize.authenticate();
    console.log("here")
    await controller.createUser(req, resp);
  } catch (error) {
    console.log(error.message);
    resp.status(503).send();
  }
});
//For chceking and handling the http method
app.all('/v1/user', async(req,resp)=>{
  return resp.status(405).send();
})
//******************** END Create user **********************************  */

//*********************** Verify User ******************************
app.get('/verify/:id',async(req,resp)=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await controller.verifyUser(req, resp);
  } catch (error) {
    console.error(error.message);
    resp.status(503).send();
  }
});

//*********************** Verify User End ******************************




app.listen(PORT,(req,resp)=>{
  console.log(`port is running.. at ${PORT}`);
})

module.exports={app};