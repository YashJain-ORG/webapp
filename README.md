# WebApp - Student Management API

## Overview
This application provides REST APIs for managing students, allowing student creation at app load, and includes CRUD operations for assignments. It uses Basic Auth for authentication across all endpoints. The backend is built with Node.js, using Express.js for routing and Sequelize as the ORM.

## Features
- **Student Management:** REST APIs for creating and managing students.
- **Authentication:** Basic Auth on all endpoints.
- **CRUD Operations:** Manage assignments through APIs.
- **Database Connection:** Connected to PostgreSQL with passwords hashed using Bcrypt.
- **API Testing:** Tested using Postman and documented with Docee Swagger.

## Technologies
- **Backend:** Node.js
- **Routing:** Express.js
- **ORM:** Sequelize
- **Logging:** Logger, statsd for metrics
- **Configuration:** dotenv
- **Testing:** Mocha, supertest
- **Version Control:** GitHub, with forked repositories in an organization account. Branch protection implemented for testing.
- **CI/CD:** GitHub Actions for integration and unit testing.

## System Environment
- **OS:** CentOS 
- **Virtualization and System Management:** SystemD for autorun and restart on failure. Cloudinit configurations are used for initializing cloud instances.
- **Infrastructure as Code:** Packer used for building private AMIs, enabling GCP through infrastructure.
- **Provisioning:** SSH access setup, instance type configurations, and source AMI filtering in Packer build.

## Prerequisites Softwares and Libraries
- NodeJS (Version 16.17)
- PostgreSQL
- Sequelize
- bcryptjs
- express
- mocha
- mysql
- sequelize
- supertest

## Local Deployment Steps
1. **Clone the Repository:**
   ```bash
   git clone git@github.com:YashJain-ORG/webapp.git
2. **Install Dependencies:**
   - **npm install**
3. **Environment Configuration:** Create a .env file and set the database and application configurations:
    - DB_HOSTNAME=localhost
    - DB_PASSWORD=1234
    - DB_USER=mysql
    - DB_NAME=mydb
    - DB_DIALECT=mysql
    - DB_PORT=5432
    - APP_PORT=3000
4. **Running the Application:**
   - **Using Nodemon:** npx nodemon
   - **Using npm:** npm start
   
## Application Testing
  **Run Integration Tests:**
   npm test
   This executes tests defined in integration-test.js
This README.md provides a comprehensive guide to setting up and running the web application locally, including details on the system environment, technology stack, and testing procedures.

