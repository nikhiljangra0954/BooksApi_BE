// Here we will create the User Schema and User Model
const mongoose = require('mongoose');

const Bookschema = new mongoose.Schema({
    title : {
        type : String,
        required: true,
    },
    author:{
        type : String,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
      }    

},  { timestamps: true })


const booksModel = mongoose.model("book", Bookschema)

module.exports = {
    booksModel
}