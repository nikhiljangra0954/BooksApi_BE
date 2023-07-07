import { Request, Response } from "express";

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const { connection } = require("./Config/db")
const { userRouter } = require('./Routes/user.Routes.ts')
const { authentication } = require("./authmiddleware/auth.middleware.ts");
const {rolebasedauth} = require("./authmiddleware/Role.middleware.ts")

const { UserModel } = require('./model/user.Model.ts')
const {bookRouter} = require("./Routes/books.Routes.ts")
require("dotenv").config()
const app = express();
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.get("/", (req: any, res: any) => {
    res.send("This is the typeScript Server")
})

app.use("/", userRouter)
app.use(authentication)
app.use(rolebasedauth)
app.use("/",bookRouter)
app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected with the mongodb" + " " + `with port ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})