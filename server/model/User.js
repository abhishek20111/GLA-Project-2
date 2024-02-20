const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types


const sample = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    profileImage:String,
    role:{type: String, default:"USER"},
    courceId:[String],
    verified:{
        type: Boolean,
        default: false
    },
    
    
},{timestamps: true});
module.exports = mongoose.model("USER", sample);

