import { Request, Response } from "express";

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const { connection } = require("./Config/db")
const { userRouter } = require('./Routes/user.Routes.ts')
const { authentication } = require("./authmiddleware/auth.middleware.ts")
const { UserModel } = require('./model/user.Model.ts')
require("dotenv").config()
const app = express();
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.get("/", (req: any, res: any) => {
    res.send("This is the typeScript Server")
})

app.use("/", userRouter)
// app.use(authentication)
app.get("/checkauth", authentication, async (req: Request, res: Response) => {
    const {userID} =  req.body
    try {
        if (!userID) {
            res.send("Please enter valid user ID")
        } else {
            const user = await UserModel.find({ _id: userID })
            res.send(user)
        }
    } catch (error) {
        res.json(error.message)
    }

})

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected with the mongodb" + " " + `with port ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})