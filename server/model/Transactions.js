const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const transactions = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    isCrypto: {
      type: Boolean,
      required: true,
    },
    hash: {
      type: String,
      default: "",
    },
    paymentId: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true
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
