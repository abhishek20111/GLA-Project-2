const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('USER')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail  = require('../mailer/mail')
const middleware = require('../middleware/middleware')
const authenticateToken = require('../middleware/middleware')
const Transaction = mongoose.model('Transactions')


router.post("/register", async (req, res) => {
    console.log("register");
    const { name, email, password, CurrentUserType } = req.body;
    if (!name || !email || !password || !CurrentUserType) {
        return res.send({ error: "Fill Complete details" });
    }
    console.log(name + " " + email + " " + password + " " + CurrentUserType);

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.json({ error: "User Exists" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const response = await User.create({
            name,
            email,
            password: encryptedPassword,
            role: CurrentUserType,
        });

        console.log("User created:", response);

        await sendEmail({ email, emailType: "VERIFY", userId: response._id });
        return res.json({ success: "User Registered Successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(400).json({ error: "Error occurred while registering user" });
    }
});



router.post("/loginUser", async (req, res) => {
    console.log("loginUser");
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        // console.log(user);
        const token = jwt.sign({ email: user.email, role: user.role, name: user.name, verified: user.verified, profileImage:user.profileImage, _id:user._id }, process.env.JWT_SECRET);

        if (res.status(201)) {
            return res.json({ message: "Login Successfully", token: token, user: user });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid Authentication" });
});

router.put('/updateProfileImage', middleware, async (req, res) => {
    const userId = req.user._id;
    const { imageUrl } = req.body;
  console.log("updateProfileImage "+imageUrl);
    try {
      // Find the user by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the profile image URL
      user.profileImage = imageUrl;

      // Save the updated user
      await user.save();
  
      return res.status(200).json({ message: 'Profile image updated successfully', user });
    } catch (error) {
      console.error('Error updating profile image:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/verifyEmail/:token', async (req, res) => {
    try {
        const { token } = req.params;

       const decoded = jwt.verify(token, process.env.JWT_SECRET_FOR_RESET);

        const { userId } = decoded;

        const user = await User.findByIdAndUpdate(
            userId,
            { verified: true },
            { new: true } 
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.verified) {
            return res.json({ message: "User is already verified" });
        }

        return res.json({ message: "Email verified successfully" });
    } catch (error) { 
        console.error("Error:", error);
        return res.status(400).json({ error: "Invalid token or internal server error" });
    }
});

router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log("forgot"+email);
        
        
        await sendEmail({ email, emailType: "FORGOT_PASSWORD", userId: user._id });
        return res.json({ message: "Email Sent for Password Reset" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { password, token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_FOR_RESET);
        const userId = decoded.userId;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/getallUser', authenticateToken, async (req, res) => {
    try {
        console.log("getUser data");
        if (req.user.role !== "Super Admin") {
            return res.status(302).json({ message: "Unauthorized Access!" });
        }
        const users = await User.find()
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
});
router.post('/deletUser', authenticateToken, async (req, res) => {
    try {
        console.log("Delete user - "+ req.body.id);
        if (req.user.role !== "Super Admin") {
            return res.status(302).json({ message: "Unauthorized Access!" });
        }
        const users = await User.findByIdAndDelete(req.body.id)
        console.log(users);
        return res.status(200).json({meassage: "User Deleted Succesfuuly"});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
});

router.post("/getTxns", authenticateToken, async (req, res) => {
    try {
        console.log("getTxns");
        const user = req.user.email;
        const transactions = await Transaction.find({ email: user });
        return res.status(200).json(transactions);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
});

module.exports = router; 