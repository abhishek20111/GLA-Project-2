const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const transactions = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true
  },
    course: {
      type: ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transactions", transactions);
