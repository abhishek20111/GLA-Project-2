import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Review from "./Review";
import { useSelector } from "react-redux";
import Message from "./Message";
import axios from "axios";

const VideoPlayer = ({ videoUrl, isPlaying }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="p-5">
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <video
          ref={videoRef}
          src={videoUrl}
          style={{
            border: "none",
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
          }}
          controls
        ></video>
      </div>
    </div>
  );
};

const Accordion = ({ syllabus, videoUrl, onAccordionClick }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleAccordionClick = () => {
    setExpanded(!isExpanded);
    onAccordionClick(videoUrl);
  };
  
  return (
    <div className="border rounded-lg border-gray-600">
      <button
        className={`flex items-center justify-between w-full py-4 px-6 bg-white hover:bg-gray-100 focus:outline-none transition-all duration-300 ease-in-out ${
          isExpanded ? "rounded-t-lg" : "rounded-lg"
        }`}
        onClick={handleAccordionClick}
      >
        <h2 className="text-lg font-medium text-gray-800">{syllabus}</h2>
      </button>
    </div>
  );
};

const VideoWindow = ({ selectedSyllabus, selectedVideoUrl, courceData }) => {
  const location = useLocation();
  const userId = useSelector((state) => state.userData._id);
  const userEmail = useSelector((state) => state.userData.email);

  const [selectIndex, setSelectIndex] = useState(-1);
  const syllabus = selectedSyllabus || location.state && location.state.selectedSyllabus;
  const videoUrl = selectedVideoUrl || location.state && location.state.selectedVideoUrl;
  const courceDetails = courceData || location.state && location.state.courceData;

  const [selectedVideo, setSelectedVideo] = useState("");
  const [isVideoPlaying, setVideoPlaying] = useState(false);
  const [converstation, setConverstation] = useState("");
  const [messages, setMessages] = useState([]);
  
  const getConverstation = async (courceDetails) => {
    const data = {
      senderId: userEmail,
      receiverId: courceDetails.createBy,
    };
    try {
      let response = await axios.post("http://localhost:8080/chat/conversation/add", data);
      console.log(response.data.user._id);
      setConverstation(response.data.user._id);
    } catch (error) {
      console.log("Error while calling getConversation API ", error);
    }
  };

  const getOldMessage = async (id) => {
    try {
      const backData = await axios.get(`http://localhost:8080/chat/message/get/${id}`);
      console.log(backData.data);
      if(backData.data.length > 0)
      setMessages(backData.data);
    } catch (error) { 
      console.log('Error while calling newConversations API ', error);
    }
  };
  
  const handleAccordionClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setVideoPlaying(true);
  };
  useEffect(() => {
    if (courceDetails) getConverstation(courceDetails);
    if (courceDetails && converstation) {
      getOldMessage(converstation);
    }
  }, [courceDetails, converstation]);
  
  return (
    <div className="flex flex-col">

    <div className="flex flex-col outline-double -outline-offset-8 rounded-2xl md:rounded-3xl md:flex-row bg-gray-100 bg-gradient-to-r from-white via-blue-200 to-white">
      <div className="md:w-1/2 w-full">
        <VideoPlayer videoUrl={selectedVideo} isPlaying={isVideoPlaying} />
        <div className="flex justify-center">
          {/* <h1 className="md:text-3xl text-xl font-semibold md:mb-5 ">
            {selectIndex}
          </h1> */}
        </div>
        {/* {console.log(selectIndex, " ")} */}
        {/* <h1 className="sm:text-5xl text-3xl font-semibold ml-4">{syllabus}</h1> */}
      </div>
      <div className="md:w-1/2">
        <div className="p-6 md:my-10 max-h-[300px] overflow-auto">
          {videoUrl.map((videoUrl, index) => 
          (<div key={index} onClick={()=>setSelectIndex(syllabus[index])}>
            <Accordion
              syllabus={syllabus[index]}
              videoUrl={videoUrl}
              onAccordionClick={handleAccordionClick}
              />
              </div>
          ))}
        </div>
      </div>
    </div>

          <div className="">
            <Message 
            courceDetails={courceDetails} 
            converstationId={converstation}
            setMessages={setMessages}
            messages={messages}
            getOldMessage={getOldMessage}
            />
          </div>

      <div>
        {userId && courceDetails && <Review userId={userId} courseDetails={courceDetails}/>}
      </div>
    </div>
  );
};

export default VideoWindow;
