const express = require('express');
const { sequelize,Sequelize } = require("./src/configs/config.js")
const app = express();
const bodyParser = require('body-parser');
const PORT= 7003;
const db = require('./src/configs/config.js');
const User =db.Users;
const controller= require('./src/controllers/userController.js')
const saltRounds = 10;
app.use(bodyParser.json());

var passHash;
const bcrypt = require('bcrypt');
//Create Table if Not Exist..
db.sequelize.sync();

//************************ Healthz ******************************* */
// Custom middleware to check the methord request body for healthz
const chcekHttmMethod=(req,resp,next)=>{
  if (req.method === 'GET') {
    resp.setHeader('Cache-Control', 'no-cache');
    resp.header('Cache-Control', 'no-cache');
        next();
      }
      else{
        resp.setHeader('Cache-Control', 'no-cache')
        resp.header('Cache-Control', 'no-cache');
        return resp.status(405).send();
      }
  }

// Custom middleware to check the URL request body for healthz
const checkUrlz = (req, resp, next) => {
  if (req.url === '/healthz') {
    console.log("checkUrl correct");
    next();
  } else {
    console.log("checkUrl Not correct");
    resp.status(400).send();
  }
};

//Middleware to check for request body for healthz
const checkRequestBody = (req, resp, next) => {
  if (req.headers['content-length'] && parseInt(req.headers['content-length']) > 0) {
    return resp.status(400).send();
  }
    console.log("req.body");
    next();
};

app.get('/healthz',checkRequestBody,checkUrlz,chcekHttmMethod, async(req,resp)=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    resp.status(200).send();
  } catch (error) {
    console.error(error.message);
    resp.status(503).send();
  }
});
//************************ End Healthz ******************************* */


//**************** Middleware Start ********************* */
// Basic HTTP authentication middleware
const authenticationMiddleware = async (req, res, next) => {
  console.log("authenticationMiddleware");

  // If 'Authorization' header not present
  if (!req.get('Authorization')) {
    const err = new Error('Not Authenticated!');
    // Set status code to '401 Unauthorized' and 'WWW-Authenticate' header to 'Basic'
    res.status(401).set('WWW-Authenticate', 'Basic').json({ error: err.message });
    return next(err);
  }

  // If 'Authorization' header present
  var credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':');
  var username = credentials[0];
  var password = credentials[1];
  try {
    // Simulate an asynchronous operation, such as checking credentials in a database
    const isValidCredentials = await validateCredentials(username, password);
    console.log(`isValidCredentials -------->  ${isValidCredentials}`)
    if (!isValidCredentials) {
      const err = new Error('Not Authenticated!');
      // Set status code to '401 Unauthorized' and 'WWW-Authenticate' header to 'Basic'
      res.status(401).set('WWW-Authenticate', 'Basic').json({ error: err.message });
      return next(err);
    }

    // Continue the execution
    //res.status(200);
    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Assuming this function simulates an asynchronous operation, such as checking credentials in a database
const validateCredentials = async (username, password) => {
  // Perform your authentication logic here, e.g., check credentials in a database
  try {
      let existingUser= await User.findOne({ where: { email: username} })
      if (!existingUser) {
        throw new Error('unable to Login');
      }
      else{
        const chcekPass= await bcrypt.compareSync(  password,existingUser.password);
        if(chcekPass){
          console.log('User Exist')
          return true;
        }
        else
        console.log("unable to login");
        return false;
      }
    }
   catch (error) {
      console.log(error);
      return false;
  }
  
};

const checkUrl = (req, resp, next) => {
  if (req.url === '/v1/user') {
    console.log("checkUrl correct");
    next();
  } else {
    console.log("checkUrl Not correct");
    return resp.status(404).send();
  }
};
//*************** Middleware End ********************** */

//SearchUser
app.get('/v1/user/self',authenticationMiddleware,async(req,resp)=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await controller.searchUser(req, resp);
  } catch (error) {
    console.error(error.message);
    resp.status(503).send();
  }
});


//Update User

app.put('/v1/user/self',authenticationMiddleware,async(req,resp)=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await controller.updateUser(req, resp);
  } catch (error) {
    console.error(error.message);
    resp.status(503).send();
  }
})

//For chceking and handling the http method
app.all('/v1/user/self', async(req,resp)=>{
  return resp.status(405).send();
})

//****************Create new User ************************
app.use(checkUrl); 
app.post('/v1/user',checkUrl, async (req, resp) => {
  try {
    await sequelize.authenticate();
    await controller.createUser(req, resp);
  } catch (error) {
    console.error(error.message);
    resp.status(503).send();
  }
});
//For chceking and handling the http method
app.all('/v1/user', async(req,resp)=>{
  return resp.status(405).send();
})
//******************** END Create user ********************************** */



app.listen(PORT,(req,resp)=>{
  console.log(`port is running.. at ${PORT}`);
})