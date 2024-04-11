const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('./model/User.js')
require('./model/Course.js')
require('./model/Transactions.js');
require('./model/Conversation.js');
const CourceRoute = require('./router/CourceRoutes.js');
const UserRoute = require('./router/UserRoutes.js');
const payment = require('./router/payment.js');
const Conversation = require('./router/Conversation.js');
const dotenv = require('dotenv');
const path = require('path')
const bodyParser = require("body-parser");
const setupSocket = require('./socket/socket.js');

 
dotenv.config()
 
const app = express();//to create an instance of the Express application object.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

const port = process.env.PORT || 8080; 
 
app.use(cors({ credentials: true }));

  
// mongoose.connect(`mongodb://localhost:27017/miniProject2`) 
mongoose.connect(`mongodb+srv://miniproject:${process.env.DB_PASSWORD}@cluster0.azdxdnh.mongodb.net/?retryWrites=true&w=majority`, { 
   dbName:"miniProject2"
})
    .then(() => {
        console.log("Successfully connect to MongoDB");
    })
    .catch(err => {
        console.error("Connection error", err.message);
    }); 

app.use('/', UserRoute);
app.use('/cource', CourceRoute);
app.use("/payment", payment);
app.use('/chat', Conversation);
// // Serving the frontent
app.use(express.static(path.join(__dirname, 'dist')))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))

}) 

const server = app.listen(port, () => {
    console.log(`Server is running on port - ${port}`);
})   
setupSocket(server); 