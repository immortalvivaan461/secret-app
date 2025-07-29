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
    },
    secrets: [{
  _id: false,
  sid: { type: mongoose.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  content: String
}]

})



const USER = mongoose.model("USER", userSchema);
module.exports = USER;
