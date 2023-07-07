# A book library system
 RESTFUL API for upload books data and retrive books data

## Tech Stack

**Server:** Node, Express, Mongodb Atlas, typescript

## NPM packages used

**Package**
```
 {
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.1",
    "mongoose": "^7.3.2",
    "winston": "^3.9.0"
  }
```

**TypeScript Pakages**
 ```
  {
    "@types/bcrypt": "^5.0.0",
    "@types/body-parser": "^1.19.2",
    "@types/compression": "^1.7.2",
    "@types/cookie-parser": "^1.4.3",
    "@types/cors": "^2.8.13",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.17",
    "@types/jsonwebtoken": "^9.0.2",
    "@types/lodash": "^4.14.191",
    "@types/mongoose": "^5.11.97",
    "@types/node": "^18.13.0",
    "@types/winston": "^2.4.4",
    "nodemon": "^2.0.22",
    "ts-node": "^10.9.1",
    "typescript": "^5.1.6"
  }
```

## Features 
-  register/login
-  Role-Based Authorization and Access 
-  User can search for old and new books according to time
-  Book creation, This is only for the user that has the role of creator who has multiple roles [viwer , creator]
-  log file created to get the log detail of all routes like timestamp , statuscode , and Route use while calling api 

  #### Run Locally
```javascript
  step 1- clone the Repo  https://github.com/nikhiljangra0954/BooksApi_BE 
  step 2- Install all dependencies npm install
  step 3- npm start
```

### Runs the project in the development mode

[http://localhost:8088](http://localhost:8088)

## API Endpoints

  #### User Registration
```javascript
POST http://localhost:8088/register
```
  #### User Login
```javascript
POST  http://localhost:8088/login
```
  #### TO Crate a book . A book creation is done by only the user that has a role of CREATOR roles
   ```
  role: {
        type: [String],
        required: true,
        default: "VIEWER",
        enum: ["VIEWER", "CREATOR", "VIEW_ALL"]
    }
```
```javascript
POST http://localhost:8088/books
```
  #### To get All books
```javascript
GET http://localhost:8088/books
```
  #### To get All  the books that were create before 10  minutes
```javascript
GET  http://localhost:8088/books?old=1
```
  #### To get All  the books that were create within 10  minutes
```javascript
GET  http://localhost:8088/books?new=1
```
