import { NextFunction } from "express";

// here we will create the authentication middleware for protected Routes
import { Request, Response } from 'express';
var jwt = require('jsonwebtoken');
const authentication = async function (req: Request, res: Response, next: NextFunction) {
    // now we will check the token in the headers

    let token = req.headers.authorization
    // getting the token
    if (token) {
        // if presend compare it get the id from it
        const decoded = jwt.verify(token, 'nikhil');
        // in deconde we will get the userId that we passed whie login
        console.log(decoded)
        if (decoded) {
            const userID = decoded.userID
            // now send this userID to the body
            req.body.userID = userID
            next()
        } else {
            res.json("Decoding of token failed")
        }
        // next()
    } else {
        res.send("Token not found in the headers")
    }
}


module.exports = {
    authentication
}