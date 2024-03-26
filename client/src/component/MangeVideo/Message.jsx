import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Message({
  courceDetails,
  converstationId,
  setMessages,
  messages,
  getOldMessage,
}) {
  const [newMessage, setNewMessage] = useState("");
  const userId = useSelector((state) => state.userData._id);

  console.log(courceDetails, converstationId, messages, getOldMessage);

  const Chatting = ({ msg, own }) => {
    return (
      <div className={`w-full flex flex-wrap`}>
        <div
          className={`${
            own ? "bg-gray-300" : "ml-auto bg-blue-200"
          } max-w-[60%] rounded-xl p-2`}
        >
          {msg.text}
        </div>
      </div>
    );
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    let MessageData = {
      senderId: userId,
      conversationId: converstationId,
      text: newMessage,
    };

    console.log(MessageData);
    try {
      const backData = await axios.post(
        `http://localhost:8080/chat/message/add`,
        MessageData
      );
      console.log(backData.data);
      setMessages([...messages, backData.data]);
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
  return (
    <div className="w-full my-5">
      <h1 className="underline  flex justify-center text-xl font-semibold">
        You can chat
      </h1>
      <div className="w-[100vw] flex ">
        <div className="w-[30%] p-3  my-10 mx-auto justify-center rounded-xl bottom-2 ring-2">
          <div className="overflow-y-auto  gap-y-4  h-[50dvh] flex flex-col">
            {messages?.length > 0 ? (
              messages.map((mes) => (
                <>
                  {console.log(mes)}
                  <Chatting
                    key={mes._id}
                    msg={mes}
                    own={mes.senderId === userId}
                  />
                </>
              ))
            ) : (
              <h1 className="text-xl font-semibold my-auto">No messages yet</h1>
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
        </div>
      </div>
    </div>
  );
}

export default Message;
