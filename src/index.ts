const express = require('express');
const cors = require('cors')
const { connection } = require("./Config/db")
require("dotenv").config()
const app = express();
app.use(cors())
app.use(express.json())

app.get("/", (req: any, res: any) => {
    res.send("This is the typeScript Server")
})



app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected with the mongodb" + " " + `with port ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})