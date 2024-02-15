const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../configs/config.js');
const User =db.Users;
app.use(bodyParser.json());

var passHash;
const bcrypt = require('bcrypt');

//**************** Middleware Start ********************* *s/
const authenticationMiddleware = async (req, res, next) => {
  console.log("authenticationMiddleware");

  // If 'Authorization' header not present
    //console.log(req);
  if (!req.get('Authorization')) {
    console.log("not Authorization");
    const err = new Error('Not Authenticated!');
    // Set status code to '401 Unauthorized' and 'WWW-Authenticate' header to 'Basic'as
    res.status(401).set('WWW-Authenticate', 'Basic').json({ error: err.message });
    return next(err);
  }

  // If 'Authorization' header present
  var credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':');
  var username = credentials[0];
  var password = credentials[1];
  console.log(username);
  try {
    // Simulate an asynchronous operation, such as checking credentials in a database as
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
    console.log('Error during authentication:', error);
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

const checkUrlz = (req, resp, next) => {
  if (req.url === '/v1/user/self') {
    console.log("checkUrl correct");
    next();
  } else {
    console.log("checkUrl Not correct");
    return resp.status(404).send();
  }
};
//*************** Middleware End ********************** */

module.exports = {authenticationMiddleware, checkUrl,checkUrlz}