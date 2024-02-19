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


var passHash;
const bcrypt = require('bcrypt');
//Create Table if Not Exist.. 
//asdf
db.sequelize.sync();

//************************ Healthz ******************************* */

app.get('/healthz',helthMiddle.checkRequestBody,helthMiddle.checkUrlz,helthMiddle.chcekHttmMethod, async(req,resp)=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    resp.status(200).send();
  } catch (error) {
    console.error(error.message);
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



app.listen(PORT,(req,resp)=>{
  console.log(`port is running.. at ${PORT}`);
})

//Testing 123
module.exports={app};