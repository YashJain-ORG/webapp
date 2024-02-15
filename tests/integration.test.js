const request = require('supertest');
const {app} = require('../index.js');

beforeAll(async()=>{

})
let Ranemail='aytezzz@hotmail.com';
let Ranpassword='Test@123'
describe("TEST 1: Integration testing for createUser API",()=>{
    test("create an account and validate the get request", async()=>{
        const reqBody=
            {
                "firstName": "Test",
                "lastName": "Test",
                "password": "Test@123",
                "email": "aytezzz@hotmail.com"
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
        const email=Ranemail;
        const password =Ranpassword;

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
    });
});

afterAll(() => {
  console.log("Test Completed");
});