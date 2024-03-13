const express = require("express");
require("dotenv").config();
const Razorpay = require("razorpay");
const middleware = require("../middleware/middleware.js");
const router = express.Router();
const bodyParser = require("body-parser");
const crypto = require("crypto");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const mongoose = require('mongoose')
const User = mongoose.model('USER')
const Transactions = mongoose.model('Transactions')
const Course = mongoose.model('Course')
router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    let price = req.body.price;
    const options = {
      amount: price*100,
      currency: "INR",
      receipt: crypto.randomBytes(8).toString("hex"),
    };
    
    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");
    console.log("transaction complete");
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/success", async (req, res) => {
    console.log("backend verification");
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      courseId,
      email
    } = req.body.data;
    // console.log(req.body);
    // console.log("orderCreationId: ",orderCreationId);
    // console.log("razorpayOrderId: ",razorpayOrderId);
    // console.log("razorpayPaymentId: ",razorpayPaymentId);
    // console.log("razorpaySignature: ",razorpaySignature);
    // console.log("courseId: ",courseId);
    // console.log("email: ",email);
    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", "1Yk2D3AgiuIpRSkAnx0Q0wC4");
    // console.log("shsasum: ",shasum);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
    console.log("transaction legit");
    const transaction = new Transactions({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      email: email,
      course: courseId,
    });
    // console.log(transaction)
    await transaction.save();
    // console.log("txn saved");
    const user = await User.findOne({email});
    // console.log(user.transactions);
    user.transactions.push(transaction._id);
    user.save();
    // console.log(user.transactions);
    // console.log("data saved");
    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      courseId: courseId
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
