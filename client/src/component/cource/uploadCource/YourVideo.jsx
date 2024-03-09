import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoManage from "../../MangeVideo/VideoManage";
import { Zoom } from "react-awesome-reveal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const YourVideo = () => {
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [sure, setSure] = useState(false);
  const notify1 = (info) => toast.success(info);
  const notify2 = () => toast.info("Under Maintainace....");
  const notify4 = (msg) => toast.error(msg);

  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/getCourses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.courses);
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const handleDeleteCourse = async () => {
    try {
      const id = deleteIndex;
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/deleteCourse",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      notify1(response.data.message);
      fetchData();
    } catch (error) {
      console.error("Error fetching courses:", error);
      notify4("Something went wrong...");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-5 bg-gradient-to-r from-blue-100 to-blue-100 via-blue-200">
      <h1 className="text-2xl font-bold mb-4 mx-4">Your Courses</h1>
      {courses.map((course, idx) => (
        <Zoom>
          <div
            key={course._id}
            className="outline-double md:m-5 flex flex-wrap md:flex-nowrap p-2 bg-gradient-to-r from-blue-100 to-blue-500"
          >
            <div className="w-full h-full my-1">
              <div className="mb-10 px-4  border-black rounded-md w-[95%] text-3xl md:text-4xl font-semibold">
                <h2 className=" w-fit py-2 rounded-md  text-sky-700">
                  {course.title}
                </h2>
              </div>
              <div className=" my-10 flex-col flex justify-center px-4  text-2xl md:w-[75%] md:text-4xl font-semibold">
                <p className="font-thin md:text-3xl">Course Description:</p>
                <p className="md:text-xl px-5 md:py-2 py-1 font-normal outline-dashed outline-1 rounded-xl mt-3 max-h-[300px] overflow-auto">
                  {course.description}
                </p>
              </div>
              <div className="my-10 flex-col flex justify-center px-4 text-2xl md:w-[75%] md:text-4xl font-semibold">
                <p className="italic md:text-3xl font-thin">Extra Info:</p>
                <p className="italic text-xl rounded-xl outline-dashed outline-1 p-3 font-thin max-h-[100px] overflow-auto">
                  {course.extraDescription}
                </p>
              </div>
              
            </div>
            <div className="w-full my-1 bg-white md:rounded-xl rounded-md">
              <div className="flex md:justify-end justify-start p-1">
                <button
                  onClick={() => {
                    setSure(true);
                    setDeleteIndex(course._id);
                    console.log(deleteIndex);
                  }}
                  className="bottom-1 py-2 px-5 bg-red-600 rounded-lg left-1 md:text-xl text-white"
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
              <VideoManage
                className="flex flex-col"
                selectedSyllabus={course.syllabus}
                selectedVideoUrl={course.courseUrl}
              />
            </div>
          </div>
        </Zoom>
      ))}
      {sure === true && (
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
                    Are you sure?
                  </h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                    Selecting delete will permanently delete this course. It
                    will not be recoverable. Are you sure?
                  </p>
                  <div className="items-center gap-2 mt-3 sm:flex">
                    <button
                      className="w-full mt-2 p-2.5 flex-1 md:text-xl text-white hover:bg-red-800 bg-red-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                      onClick={() => {
                        setSure(false);
                        handleDeleteCourse();
                      }}
                    >
                      Delete
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
      )}
    </div>
  );
};

export default YourVideo;
