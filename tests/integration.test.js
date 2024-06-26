const request = require('supertest');
const {app} = require('../index.js');

const { sequelize,Sequelize } = require ("../src/configs/config.js")

require('dotenv').config();

beforeAll(async()=>{
    try {
        await sequelize.sync({});
        console.log('Database synced successfully');
      } catch (error) {
        console.log('Error syncing database:', error);
      }
})
function generateRandomEmail() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let email = '';
    for (let i = 0; i < 10; i++) {
      email += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    email += '@example.com'; 
    return email;
  }
  
  console.log(generateRandomEmail());
let Ranemail=generateRandomEmail();
let Ranpassword='Test@123'
describe("TEST 1: Integration testing for createUser API",()=>{
    test("create an account and validate the get request", async()=>{
        const reqBody=
            {
                "firstName": "Test",
                "lastName": "Test",
                "password": "Test@123",
                "email": Ranemail
            };
        const postUserResp = await request(app).post("/v1/user").send(reqBody);
        console.log(postUserResp.body);
        await expect(postUserResp.statusCode).toBe(201);
        expect(postUserResp.body.id).toBeTruthy();

        const base64Token = Buffer.from(`${reqBody.email}:${reqBody.password}`).toString('base64');
        console.log(base64Token);
        const getUserResp = await request(app).get("/v1/user/self").set("Authorization", `Basic ${base64Token}`);
        console.log(getUserResp.body.id);
        console.log(postUserResp.body.id);
        expect (getUserResp.statusCode).toBe(200);
        expect (getUserResp.body.id).toBe(postUserResp.body.id);
        return;
    });
});

describe("TEST 2: Integration testing for UpdateUser API",()=>{
    test("Update an account and validate the get request", async()=>{
        const reqsBody1=
            {
                "firstName": "ASD",
                "lastName": "ZXC",
                "password": "ABCDas@123"
            };
        const email= Ranemail;
        const password ="Test@123";

        const base64Token = Buffer.from(`${email}:${password}`).toString('base64');
        const putUserResp = await request(app).put("/v1/user/self").set("Authorization", `Basic ${base64Token}`).send(reqsBody1);
        //console.log(putUserResp.body);
        await expect(putUserResp.statusCode).toBe(204);

        const base64Token1 = Buffer.from(`${email}:${reqsBody1.password}`).toString('base64');
        console.log(base64Token);
        const getUserResp = await request(app).get("/v1/user/self").set("Authorization", `Basic ${base64Token1}`);
        //console.log(getUserResp.body.id);
        //console.log(postUserResp.body.id);
        expect (getUserResp.statusCode).toBe(200);
        // expect (getUserResp.body.id).toBe(postUserResp.body.id);
        return;
    });
});

afterAll(async() => {
  // Run sequelize.close() after finishing the tests

  try {
    await sequelize.close();
    console.log('Database connection closed successfully');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
});