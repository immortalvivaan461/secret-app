const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Fname:{
        type: String,
        required: true
    },
    Lname:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})



const USER = mongoose.model("USER", userSchema);
module.exports = USER;