// Now here will create all the Routes for the User
import { timeStamp } from "console";
import { Request, Response } from "express";
const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
const { logger } = require("../Logger/apiLogger.ts");
const userRouter = express.Router();
userRouter.use(bodyParser.json());
const { UserModel } = require("../model/user.Model.ts");

// now here we will create a Rigester Route for the User It will be post route

userRouter.post("/register", async (req: Request, res: Response) => {
  // first we will get all the details from the User
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
      res.status(206).send("Please fill all the details");
  } else {
    try {
      // find the user by email in batabase
      const user = await UserModel.findOne({ email });
      if (user) {
          res.send("User already registered Please login");
        logger.warn(
            `Method : ${req.method} { "MSG": "User already exist" } ${req.url}`
          );
      } else {
        // get the details and save to database
        bcrypt.hash(
          password,
          3,
          async function (err: Error, hash_pass: string) {
            // Store hash in your password DB.
            if (err) {
                logger.error(
                    `Method : ${req.method} - ${err.message} { "MSG": "Error while checking password" }`
                  );
              res.send({ msg: err.message });
            } else {
              const new_user = new UserModel({
                name,
                email,
                password: hash_pass,
                role,
              });
              await new_user.save();
              logger.info(
                `Method : ${req.method} StatusCode : 200 { "MSG": "User saved successfully" }`
              );
              res.status(200).send({ msg: "User saved successfully" });
            }
          }
        );
      }
    } catch (error) {
        logger.error(
            `Method : ${req.method} - ${error.message} `
          );
      res.send({ msg: error.message });
    }
  }
});

// This will be the Login ROute for the Users
userRouter.post("/login", async function (req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send("Please enter your email and password");
    logger.warn(
        `Method : ${req.method} - StatusCode: 401 - Route: ${req.route}`
      );
  } else {
    try {
      // find the user with the email
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        res.send("This user does not exist Please register");
        logger.warn(
            `Method : ${req.method} - StatusCode: 204 - Route: ${req.route}`
          );
      } else {
        let hashpassword = user.password;
        // comapre the password and generate the token
        bcrypt.compare(
          password,
          hashpassword,
          async function (err: Error, result: string) {
            // result == true
            if (result) {
              const token = jwt.sign(
                { userID: user._id, role: user.role },
                "nikhil"
              );
              res.status(200).send({ msg: "login success", token: token });
              logger.warn(
                `Method : ${req.method} - StatusCode: 200 - Route: ${req.route}`
              );
            } else {
              res.status(401).send({ msg: "login failed" });
              logger.warn(
                `Method : ${req.method} - StatusCode: 401 - Route: ${req.route}`
              );
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
      logger.error(
        `Method : ${req.method} - StatusCode: 500 - Route: ${req.route}`
      );
      res.send(error.message);
    }
  }
});
module.exports = {
  userRouter,
};
