// Role based excess

import { NextFunction, Request, Response } from "express";


const rolebasedauth = async (req: Request, res: Response, next: NextFunction) => {
        const roles = req.body.roles;
        console.log(roles);
    try {
        if(req.method === "POST" && roles.includes("CREATOR") && req.originalUrl === "/books"){
            next()
        }else if(req.method === "GET" && roles.includes("VIEWER"||"VIEWER_ALL")){
            next()
        }
        else{
            res.send("Sorry you are not authorized to do this")
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({error : error.message});
    }
}


module.exports ={
    rolebasedauth
}