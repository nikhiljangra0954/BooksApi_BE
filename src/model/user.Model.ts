// Here we will create the User Schema and User Model
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        default: "VIEWER",
        enum: ["VIEWER", "CREATOR", "VIEW_ALL"]
    }
},{
    versionKey : false
})


const UserModel = mongoose.model("user", UserSchema)

module.exports = {
    UserModel
}