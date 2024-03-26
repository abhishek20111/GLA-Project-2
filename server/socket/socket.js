const { Server } = require("socket.io");

let io;
const users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    console.log(users);
    console.log(socketId);
    const index = users.findIndex((user) => user.socketId === socketId);

    if (index !== -1) {
        users.splice(index, 1);
    } 
};

const getUser = (userId) => {
    const matchingUsers = users.filter(user => user.userId === userId);
    return matchingUsers.length > 0 ? matchingUsers[0].socketId : null;
};

const sendMessageToUser = async ({ senderId, receiverId, text }) => {
    const SocketIdUser = getUser(receiverId);
    console.log("User - " + SocketIdUser);
    if (SocketIdUser) {
        console.log("data ",text, senderId, receiverId, SocketIdUser);
        io.to(SocketIdUser).emit("getMessage", {
            senderId: [senderId],
            text,
        });
    } else { 
        console.log("User not found for receiverId: " + receiverId);
    }
};

function setupSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        // when connect
        console.log("a user connected.");

        // take userId and socketId from user
        socket.on("addUser", (userId) => {
            console.log("userId-- " + userId, socket.id);
            addUser(userId, socket.id);
            console.log(users);
            io.emit("getUsers", users);
        }); 
 
        // send and get message
        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
            sendMessageToUser({ senderId, receiverId, text });
        }); 

        // when disconnect
        socket.on("disconnect", () => {
            console.log("a user disconnected!");
            removeUser(socket.id);
            console.log(users);
            io.emit("getUsers", users);
        });
    });
}

module.exports = setupSocket;
