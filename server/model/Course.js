const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types


const sample = new mongoose.Schema({
  title: String,
  createBy: String,
  price: Number, 
  courseUrl: [String],
  description: String,
  syllabus: [String],
  extraDescription: String,
  enrollID: [String],
  review: [{
    createBy:{
      type: ObjectId,
      ref: "USER"
    },
    star:Number,
    comment: String
  }]
}, { timestamps: true });
module.exports = mongoose.model("Course", sample); 