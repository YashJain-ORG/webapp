const express = require('express');
const db = require('../configs/config');
const User =db.Users;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const app = express();
const logger = require('../../logger.js');
const {PubSub} = require('@google-cloud/pubsub');

const projectId = 'assignment-04-414723';
const pubSubClient = new PubSub({ projectId });
const topicNameOrId = 'verify_email';


//create User
function createUser(req, resp) {
  //console.log('inside create User');
  //console.log(req);
  const allowedParams = ['email', 'password', 'lastName', 'firstName'];

  // Checking if the request body contains only allowed parametersasd
  const additionalParams = Object.keys(req.body).filter(key => !allowedParams.includes(key));
  //console.log(additionalParams);
  if (additionalParams.length > 0) {
    //console.log("Error part - Invalid parameters:", additionalParams);
    return resp.status(400).send({
      Message: "Invalid parameters in the request body"
    });
  }

  // Checking if all required fields are provided and not empty
  if (!req.body.firstName || !req.body.lastName || !req.body.password || !req.body.email) {
    //console.log("Error part - Missing required data");
    return resp.status(400).send({
      Message: "Please provide all required data!"
    });
  }

  // Validating email format using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    //console.log("email")
    logger.warn("Invalid email format");
    return resp.status(400).send({
      Message: "Invalid email format"
    });
  }

  // Validating password format (at least 8 characters long and containing at least one uppercase letter, one lowercase letter, one digit, and one special character)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(req.body.password)) {
    //console.log("pass")
    logger.warn("Invalid Password format");
    return resp.status(400).send({
      Message: "Invalid password format"
    });
  }

  // Checking if the user with the email already exists in the DB
  User.findOne({ where: { email: req.body.email } })
    .then(existingUser => {
      if (existingUser) {
        logger.error("Invalid email already exists");
        return resp.status(400).json({ error: 'User with this email already exists' });
      }

      // Hash the password before storing it
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          return resp.status(500).send('Internal Server Error');
        }
        // Creating the user object with hashed password
        const userObject = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash
        };
        var userPayload;
        // Creating the user in the databases
        User.create(userObject)
          .then(data => {
            resp.status(201).json({
              id: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              username: data.email,
              account_created: data.account_created,
              account_updated: data.account_updated
            });
            //console.log(data);
            console.log("Success part");
            userPayload = {
              username: data.email,
              id: data.id
            };
            console.log("userPayload:", userPayload); // Add this line for logging
            pubSubClient
              .topic(topicNameOrId)
              .publishJSON(userPayload)
              .then(function(messageId) {
                console.log('Message ' + messageId + ' published.');
                logger.info("User created successfully.");
              })
              .catch(function(error) {
                console.error('Error publishing message:', error);
              });
            
            
          })
          .catch(error => {
            resp.status(500).send(error);
            console.log(error);
          });
      });
    })
    .catch(error => {
      resp.status(500).send(error);
      //console.log(error);
    });
}


//Search User by Email and By Password
const searchUser = (req, resp) => {
  try {
    const credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':');
    const username = credentials[0];
    const password = credentials[1];
    // console.log(username);
    // console.log(password);
    // Validate username and password
    if (!username || !password || username.trim() === '' || password.trim() === '') {
      //console.log('validate');
      return resp.status(400).send({ message: 'Username or password missing or empty' });
    }

    User.findByPk(username, {

      attributes: ['id', 'firstName', 'lastName', 'email', 'account_created','account_updated','isVerified'],

    }).then(data => {
      console.log(data);
      if (!data) {
       // console.log("chceking data");
        logger.error("User not found..");
        return resp.status(404).send({ message: 'User not found' });
      }

      if(data.isVerified==true){
      logger.info("User found..");
      resp.status(200).send(data);
      }else{
        logger.warn("User not verified..");
        resp.status(403).send({ message: 'User not verified' });
      }
    }).catch(error => {
      console.error(error);
      resp.status(500).send({ message: 'Internal server error' });
    });

  } catch (error) {
    console.error(error);
    logger.error("Bad request..");
    resp.status(400).send({ message: 'Bad request' });
  }
};

//Update user
const updateUser=(req,resp)=>{
  var credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':');
  var username = credentials[0];
  var password = credentials[1];

  if (!password || password.trim() === '') {
    return resp.status(400).send({ message: 'Password is missing or empty' });
  }
  if (!req.body.firstName || req.body.firstName.trim() === '') {
    return resp.status(400).send({ message: 'First name is missing or empty' });
  }

  if (!req.body.lastName || req.body.lastName.trim() === '') {
    return resp.status(400).send({ message: 'Last name is missing or empty' });
  }

  if (!req.body.password || req.body.password.trim() === '') {
    return resp.status(400).send({ message: 'Password is missing or empty' });
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        return resp.status(500).send('Internal Server Error');
      }
      //console.log("testing")
      const currentDate = new Date();
      const updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash,
        account_updated:currentDate
      };

      console.log(User);
      User.findOne({
        where: {
          isVerified: true // Use the attribute you want to search by
        }
      }).then(data => {
        console.log(data);
        if (!data) {
          logger.error("User not found..");
          return resp.status(404).send({ message: 'User not found' });
        }
  
        // if (!data.email_sent_time) {
        //   logger.warn('Verification process not initiated for this user.');
        //   return resp.status(400).send('Verification process not initiated for this user.');
        // }
        console.log("testing user update is verifyed")
        console.log(data.isVerified);
        if(data.isVerified==true){
          User.update(updateData,
            {where:{email:username}}).then(()=>{
              logger.info("User Updated successfully..");
              resp.status(204).json({
                Message: `User Updated successfully!!  ${username}`
              });
            }).catch(error=>{
              resp.status(500).send(error);
            })  
        }else{
          logger.warn("User not verified..");
          resp.status(403).send({ message: 'User not verified' });
        }
        
      }).catch(error => {
        console.error(error);
        resp.status(500).send({ message: 'Internal server error' });
      });
      // console.log("testing user update")
      // console.log(User.isVerified);
      // if(User.isVerified==true)
      // User.update(updateData,
      //   {where:{email:username}}).then(()=>{
      //     logger.info("User Updated successfully..");
      //     resp.status(204).json({
      //       Message: `User Updated successfully!!  ${username}`
      //     });
      //   }).catch(error=>{
      //     resp.status(500).send(error);
      //   })   

  });
}

const verifyUser = (req, resp) => {
  try {

    var id = req.params.id;
    console.log(id);
    if (!id) {
      logger.error('UUID missing');
      console.log("UUID missing");
      return resp.status(400).json({ message: "Username or UUID missing" });
    }

    User.findOne({
      where: {
        id: id // Use the attribute you want to search by
      }
    }).then(data => {
      //console.log(data);
      if (!data) {
        logger.error("User not found..");
        return resp.status(404).send({ message: 'User not found' });
      }

      if (!data.email_sent_time) {
        logger.warn('Verification process not initiated for this user.');
        return resp.status(400).send('Verification process not initiated for this user.');
      }
  
      const currentTime = new Date();
      const timeElapsed = currentTime - new Date(data.email_sent_time);
  
      if (timeElapsed <= 2 * 60 * 1000) {
        // Update user's verification status and verification time
        data.isVerified = true;
        data.link_verified_time = currentTime;
        data.save();
  
        logger.info('User email verified successfully.');
        return resp.send('Your email has been successfully verified.');
      } else {
        logger.warn('Verification link has expired.');
        return resp.status(400).send('Verification link has expired.');
      }
    }).catch(error => {
      console.error(error);
      resp.status(500).send({ message: 'Internal server error' });
    });

  } catch (error) {
    console.error(error);
    logger.error("Bad request..");
    resp.status(400).send({ message: 'Bad request' });
  }
};

module.exports = {createUser, searchUser,updateUser,verifyUser}

