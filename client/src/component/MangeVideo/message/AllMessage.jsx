import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

function AllMessage() {
  const userId = useSelector((state) => state.userData._id);
  const myEmail = useSelector((state) => state.userData.email);
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentconversation, setCurrentConversation] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [currentRecieverEmail, setCurrentRecieverEmail] = useState("");
  const [singleSocketMessage, setSocketMessage] = useState("");
  const scroller = useRef();
  const socket = useRef();

  const fetchData = async (userId) => {
    try {
      const getAllUser = await axios.get(
        `http://localhost:8080/chat/conversation/${userId}`
      );
      const allUserData = getAllUser.data;

      // Extract email from members array and filter based on search input
      const filteredUserData = allUserData
        .map((data) => {
          if (data.members[0] === myEmail) {
            return data.members[1];
          } else {
            return data.members[0];
          }
        })
        .filter((email) =>
          email.toLowerCase().includes(searchInput.toLowerCase())
        );

      setUserData(filteredUserData);
    } catch (error) {
      console.log("Error while calling getUsers API ", error);
    }
  };

  const getMessage = async (e, id) => {
    e.preventDefault();
    
    const data = {
      senderId: myEmail,
      receiverId: id,
    };
    setCurrentRecieverEmail(id);
    try {
      const conversationResponse = await axios.post(
        "http://localhost:8080/chat/conversation/add",
        data
      );
      const conversationId = conversationResponse.data.user._id;
      //   console.log(conversationId);
      setCurrentConversation(conversationId);

      const messagesResponse = await axios.get(
        `http://localhost:8080/chat/message/get/${conversationId}`
      );
      const messages = messagesResponse.data;
      //   console.log(messages);
      setMessage(messages);
    } catch (error) {
      console.error("Error while fetching messages:", error);
    }
  };

  const Chatting = ({ msg, own }) => {
    return (
      <div ref={scroller} className={`w-full flex flex-wrap`}>
        <div
          className={`${
            !own ? "bg-gray-300" : "ml-auto bg-blue-200"
          } max-w-[60%] rounded-xl p-2`}
        >
          {msg.text}
        </div>
      </div>
    );
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    socket.current.emit("sendMessage", {
        senderId: myEmail,
        receiverId: currentRecieverEmail,
        text: newMessage,
      });
    let MessageData = {
      senderId: userId,
      conversationId: currentconversation,
      text: newMessage,
    };

    console.log(MessageData);
    try {
      const backData = await axios.post(
        `http://localhost:8080/chat/message/add`,
        MessageData
      );
      //   console.log(backData.data);
      setMessage([...message, backData.data]);
      setNewMessage("");
    } catch (error) {
      console.log("Error while calling newConversations API ", error);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      onHandleSubmit(event);
    }
  };
  useEffect(() => {
    socket.current = io("ws://localhost:8080");
    socket.current.on("getMessage", (data) => {
      try {
        console.log("data", data, data.senderId[0]);
        setSocketMessage({
          ...data,
          createdAt: Date.now(),
        });
      } catch (error) {
        console.error("Error handling getMessage:", error);
      }
    });
  }, []);

  useEffect(() => {
    myEmail && socket.current.emit("addUser", myEmail);
  }, [myEmail]);

  useEffect(() => {
    console.log(singleSocketMessage, currentRecieverEmail, currentRecieverEmail===singleSocketMessage.senderId);
    singleSocketMessage && (currentRecieverEmail===singleSocketMessage.senderId[0]) &&
      setMessage((prev) => [...prev, singleSocketMessage]);
  }, [singleSocketMessage, currentRecieverEmail]);

  useEffect(() => {
    console.log(message);
    scroller.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    fetchData(userId);
  }, [userId, myEmail, searchInput]);

  return (
    <div className="bg-blue-200 w-[100vw] h-[100vh] flex">
      <div className="bg-white sm:w-[79%] mx-auto my-8 flex gap-4 rounded-2xl p-3 ">
        <div className="w-[30%] ">
          <div className="border-gray-600 h-[98%] rounded-md hover:overflow-auto overflow-hidden flex flex-col border-2 p-3">
            <div className="flex  pb-1 border-b-2  border-b-gray-300">
              <span className="material-symbols-outlined mt-1">search</span>
              <input
                type="text"
                className="w-full p-1"
                placeholder="Search.."
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            {userData &&
              userData.length > 0 &&
              userData.map((data, idx) => (
                <div key={idx} className="flex gap-4 pt-3  divide-y-2">
                  <p
                    onClick={(e) => getMessage(e, data)}
                    className=" my-auto w-[100%] cursor-pointer"
                  >
                    {data}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className="w-[67%]">
          <div className="w-full h-full">
            {message?.length > 0 && (
              <>
                <div  className="ml-5 gap-y-3 h-[73dvh] overflow-auto flex flex-col ">
                  {message?.length > 0 ? (
                    message.map((mes, idx) => (
                      <Chatting
                        key={idx}
                        msg={mes}
                        own={mes.senderId[0] === userId}
                      />
                    ))
                  ) : (
                    <h1 className="text-xl font-semibold m-auto">
                      No messages yet
                    </h1>
                  )}
                </div>
                <textarea
                  rows={3}
                  cols={10}
                  className="resize-none w-full rounded-lg"
                  placeholder="Type here.."
                  name="newMessage"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllMessage;
