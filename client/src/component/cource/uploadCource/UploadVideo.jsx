import { useEffect, useState } from "react";
import axios from "axios";
import { uploadToCloudinary } from "../../helper/upload.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import GIF from "../../../assets/loading.gif";
import "../../../App.css";
const UploadVideo = () => {
  const email = useSelector((state) => state.userData.email);
  const notify1 = (info) => toast.success(info);
  const notify2 = (info) => toast.info(info);
  const notify4 = (msg) => toast.error(msg);
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();
  const initialState = {
    title: "",
    price: "",
    createBy: email,
    courseUrl: [],
    description: "",
    syllabus: [],
    extraDescription: "",
  };
  const [userData, setUserData] = useState(initialState);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [sure, setSure] = useState(false);

  // useEffect(() => {
  // console.log(JSON.stringify(userData));
  // }, [userData]);

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    if (name === "syllabusZero") {
      setUserData((prevState) => ({
        ...prevState,
        syllabus: [value, ...prevState.syllabus.slice(1)],
      }));
    } else {
      setUserData((prevState) => {
        const updatedSyllabus = [...prevState.syllabus];
        updatedSyllabus[index] = value;
        return {
          ...prevState,
          syllabus: updatedSyllabus,
        };
      });
    }
  };

  const handleAddMore = () => {
    setUserData((prevState) => ({
      ...prevState,
      syllabus: [...prevState.syllabus, ""],
    }));
  };

  const handleRemove = (index) => {
    setUserData((prevState) => {
      const updatedSyllabus = [...prevState.syllabus];
      updatedSyllabus.splice(index, 1);
      return {
        ...prevState,
        syllabus: updatedSyllabus,
      };
    });
  };

  const handleVideoSelect = (event) => {
    const files = event.target.files;
    setSelectedVideos([...selectedVideos, ...files]);
  };

  const handleUpload = async () => {
    // setUploaded(true);
    notify2("Uploading...");
    try {
      setIsUploading(true);
      for (const video of selectedVideos) {
        const { url } = await uploadToCloudinary(video);
        setUserData((prevState) => ({
          ...prevState,
          courseUrl: [...prevState.courseUrl, url],
        }));
      }
      // Reset selected videos and upload progress
      setSelectedVideos([]);
      setUploadProgress(0);

      // Perform further actions or update state
      notify1("Videos uploaded successfully!");
      setIsUploading(false);
      setUploaded(true);
      console.log("Video URLs:", userData.courseUrl);
    } catch (error) {
      setIsUploading(false);
      notify4(error);
      console.error("Video upload failed:", error);
    }
  };
  const [isSubmit, setIsSubmit] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmit(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/cource/uploadVideo",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data sent successfully:", response.data);
      setIsSubmit(false);
      setUploaded(false);
      notify1(response.data.message);
      navigate("/yourVideo");
    } catch (error) {
      setIsSubmit(false);
      console.error("Failed to send data:", error);
      notify4(error);
    }
  };

  const isSubmitDisabled = selectedVideos.length > 0 && uploadProgress === 100;

  const handleRemoveVideo = (index) => {
    setSelectedVideos((prevSelectedVideos) => {
      const updatedSelectedVideos = [...prevSelectedVideos];
      updatedSelectedVideos.splice(index, 1);
      return updatedSelectedVideos;
    });
  };

  return (
    <>
      <div className="flex sm:px-24  flex-wrap min-h-screen ">
        <div className="my-5 mx-2 border-2 bg-white border-gray-300 w-full rounded-md">
          <div className="flex flex-wrap md:flex-nowrap">
            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={userData.title}
              onChange={handleInputChange2}
              className="custom-scrollbar m-2 my-2  py-4 placeholder:font-thin  rounded-md w-[95%] text-2xl md:w-[75%] h-[40px] md:text-xl font-semibold"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={userData.price}
              onChange={handleInputChange2}
              className="custom-scrollbar m-2 my-2  py-4 placeholder:font-thin  rounded-md max-w-[25%] text-2xl h-[40px] md:text-xl font-semibold"
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={userData.description}
            onChange={handleInputChange2}
            className="custom-scrollbar mx-2 font-thin my-1 py-2 border w-[97%] placeholder:font-thin rounded-md"
          ></textarea>
          <textarea
            name="extraDescription"
            placeholder="Additional Information"
            value={userData.extraDescription}
            onChange={handleInputChange2}
            className="custom-scrollbar mx-2 my-1 py-2 placeholder:font-thin placeholder:italic w-[97%] border-gray-700 rounded-md font-thin"
          ></textarea>

          <div>
            <span className="m-3 text-xl md:text-3xl">Video titles here:</span>
            <div className="flex">
              <input
                name="syllabusZero"
                placeholder="Video 1 Title"
                value={userData.syllabus[0] || ""}
                onChange={(event) => handleInputChange(event, 0)}
                className="m-2 p-2 w-full md:w-[75%] border border-gray-300 rounded-md"
              />

              <button
                onClick={handleAddMore}
                className="m-2 bg-blue-500 hover:bg-blue-800 text-white py-1 px-2 rounded-md"
              >
                Add More
              </button>
            </div>
            <div className="max-h-[200px] overflow-auto">
              {userData.syllabus.slice(1).map((content, index) => (
                <div key={index} className="flex items-center">
                  <input
                    name="syllabus"
                    placeholder={`Video ${index + 2} title`}
                    value={content}
                    onChange={(event) => handleInputChange(event, index + 1)}
                    className="m-2 w-full md:w-[75%] p-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={() => handleRemove(index)}
                    className="m-2 bg-red-500 text-2xl hover:bg-red-800 text-white py-1 px-4 rounded-md"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-2 border-2 bg-white border-gray-300 w-full flex flex-wrap rounded-r-3xl justify-center">
          <div className="mx-5 w-full">
            {/* <input
              type="file"
              accept="video/*"
              multiple
              className="outline-double outline-offset-8"
              onChange={handleVideoSelect}
            /> */}
            <div className="w-full flex">
              {selectedVideos.length == 0 && (
                <div className=" p-4 bg-white m-auto rounded-lg w-full">
                  <div className=" border-gray-300 rounded-lg w-full">
                    <svg
                      className="text-indigo-500 w-24 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="input_field flex flex-col w-max mx-auto text-center">
                      <label>
                        <input
                          className="text-sm cursor-pointer w-36 hidden"
                          type="file"
                          accept="video/*"
                          multiple
                          onChange={handleVideoSelect}
                        />
                        <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                          Select
                        </div>
                      </label>

                      <div className="title text-indigo-500 uppercase">
                        or drop files here
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:mx-5">
            {selectedVideos.length > 0 ? (
              <div>
                <p className="w-full  text-lg font-semibold">
                  Videos Selected:
                </p>
                <div className="flex flex-wrap justify-center overflow-auto">
                  {selectedVideos.map((video, index) => (
                    <div className=" rounded-md m-2 px-1 py-2" key={index}>
                      <div className="flex flex-col items-center">
                        <video
                          className="rounded-lg border-2 border-gray-300"
                          src={URL.createObjectURL(video)}
                          width="200"
                          controls
                        ></video>
                        <div className="py-1 px-1 flex mb-1 rounded-t-lg justify-between">
                          <p className=" text-blue-600">{video.name}</p>
                          <button
                            onClick={() => {
                              handleRemoveVideo(index);
                              console.log(selectedVideos);
                            }}
                            className="ml-2 bg-red-500 hover:bg-red-600 text-white  py-1 px-3 rounded-sm"
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-wrap justify-center">
                <p className="border-2 p-5 text-xl font-thin rounded-md border-red-500">
                  Please select a video before uploading.
                </p>
              </div>
            )}
          </div>
          <div className="m-5 w-full flex flex-col items-center">
            {!uploaded && !isUploading && (
              <button
                onClick={() => handleUpload()}
                disabled={isSubmitDisabled}
                className={`py-2 px-4 w-[150px] rounded-md mb-2 h-[50px] ${
                  isSubmitDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-800 text-white"
                }`}
              >
                Upload Videos
              </button>
            )}

            {uploadProgress > 0 && (
              <p className="mb-4 md:text-2xl text-lg animate-pulse">
                Upload Progress: {uploadProgress}%
              </p>
            )}
            {isUploading && (
              <div className="flex flex-col items-center my-1">
                <p className="animate-pulse md:text-2xl">
                  Uploading... Slow network connection!!!
                </p>
                <img src={GIF} className="h-28" />
              </div>
            )}

            {isSubmit && (
              <div className="animate:pulse">
                <p className="md:text-2xl">Just a moment...</p>
              </div>
            )}
            {uploaded && (
              <button
                onClick={() => setSure(true)}
                className="text-white w-[150px] h-[50px] bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  focus:ring-4 hover:outline hover:outline-offset-2 hover:outline-white transition-all duration-500 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2 text-center mb-2"
              >
                Upload Course
              </button>
            )}
          </div>
        </div>
        {sure === true && (
          <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setSure(false)}
              ></div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                  <div className="py-3 sm:flex">
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <h4 className="text-lg font-medium text-gray-800">
                        Are you sure to upload this course?
                      </h4>
                      <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                        You may want to review all the changes as this is the
                        final edit for this course.
                      </p>
                      <div className="items-center gap-2 mt-3 sm:flex">
                        <button
                          className="w-full mt-2 p-2.5 flex-1 md:text-xl hover:bg-green-700 text-white bg-green-500 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                          onClick={(e) => {
                            setSure(false);
                            handleSubmit(e);
                          }}
                        >
                          Upload
                        </button>
                        <button
                          className="w-full mt-2 p-2.5 flex-1 md:text-indigo-600 text-xl rounded-md outline-none border-2  border-indigo-600 focus:ring-2"
                          onClick={() => setSure(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UploadVideo;
