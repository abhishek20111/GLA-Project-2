const express = require('express')
const router = express.Router()

const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const User = require('../model/User');
const Conversation = require('../model/Conversation');
const Message = require('../model/Message');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let conversationLock = false;

router.post('/conversation/add', async (req, res) => {
    // Check if the lock is active
    if (conversationLock) {
        return res.status(409).json({ message: 'Another conversation creation is in progress' });
    }

    // Activate the lock
    conversationLock = true;

    let { senderId, receiverId } = req.body;
    console.log("conversation/add " + senderId + " " + receiverId);

    try {
        const myData = await User.findOne({ email: senderId });
        const teacherData = await User.findOne({ email: receiverId });

        if (!myData || !teacherData) {
            // Release the lock
            conversationLock = false;
            return res.status(404).json({ message: 'User not found' });
        }

        const exist = await Conversation.findOne({ members: { $all: [receiverId, senderId] } });
        if (exist) {
            // Release the lock
            conversationLock = false;
            return res.status(200).json({ message: 'Conversation already exists', user: exist });
        }

        // Check if the conversation exists with the sender as the receiver and vice versa
        const existReverse = await Conversation.findOne({ members: { $all: [senderId, receiverId] } });
        if (existReverse) {
            // Release the lock
            conversationLock = false;
            return res.status(200).json({ message: 'Conversation already exists', user: existReverse });
        }

        const newConversation = new Conversation({
            members: [senderId, receiverId]
        });

        const savedConversation = await newConversation.save();
        console.log(myData, teacherData);
        console.log(savedConversation);

        myData.conversationId.push(savedConversation._id);
        teacherData.conversationId.push(savedConversation._id);

        await myData.save();
        await teacherData.save();

        // Release the lock
        conversationLock = false;
        
        res.status(200).json({ user: savedConversation });
    } catch (error) {
        console.error(error);
        // Release the lock in case of an error
        conversationLock = false;
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/conversation/:id', async (req, res)=>{
    console.log("/conversation");
    try{
        let {id} = req.params;
        const myData = await User.findById(id).populate('conversationId','members');
        if(!myData){
            return res.status(404).json({message: 'User not found'});
        }
        // console.log(myData.conversationId);
        res.status(200).json(myData.conversationId);
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})
   
router.post('/message/add', async (request, response) => {
    console.log("/message/add/ ");
    const newMessage = new Message(request.body);
    try {
        await newMessage.save();
        // console.log(newMessage);
        response.status(200).json(newMessage);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.get('/message/get/:id',async (request, response) => {
    console.log("/message/get/ "+request.params.id);
    try {
        const messages = await Message.find({ conversationId: request.params.id });
        console.log(messages.length);
        response.status(200).json(messages);
    } catch (error) {
        response.status(500).json(error);
    }
}) 



module.exports = router; 