import { useRef, useState, useEffect } from "react";

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
    <div className="border-b border-gray-200">
      <button
        className={`flex items-center justify-between w-full py-4 px-6 bg-white hover:bg-gray-100 focus:outline-none transition-all duration-300 ease-in-out ${
          isExpanded ? "rounded-t-lg" : "rounded-lg"
        }`}
        onClick={handleAccordionClick}
      >
        <h2 className="text-lg font-medium text-gray-800">{syllabus}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transform ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

const VideoManage = ({ selectedSyllabus, selectedVideoUrl }) => {
  const [selectedVideo, setSelectedVideo] = useState("");
  const [isVideoPlaying, setVideoPlaying] = useState(false);

  const handleAccordionClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setVideoPlaying(true);
  };

  return (
    <div className="flex flex-col bg-gray-100 rounded-md md:rounded-3xl">
      <div className="w-full">
        <VideoPlayer videoUrl={selectedVideo} isPlaying={isVideoPlaying} />
        {/* <h1 className="sm:test-5xl text-3xl font-semibold ml-4">{selectedSyllabus}</h1> */}
      </div>
      <div className="w-full">
        <div className="px-5 md:h-[300px] h-[200px] overflow-auto">
          {selectedVideoUrl.map((videoUrl, index) => (
            <Accordion
              key={index}
              syllabus={selectedSyllabus[index]}
              videoUrl={videoUrl}
              onAccordionClick={handleAccordionClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoManage;
