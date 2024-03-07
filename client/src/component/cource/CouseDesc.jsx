import React from "react";
import VideoWindow from "../MangeVideo/VideoWindow";
import { useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Zoom } from "react-awesome-reveal";
import { Helmet } from "react-helmet";

function CourseDesc() {
  const [content, setContent] = useState(false);
  const notify1 = (info) => toast.success(info);
  const notify2 = (info) => toast.info(info);
  const notify4 = (msg) => toast.error(msg);
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state && location.state.course;
  const email = useSelector((state) => state.userData.email);

  if (!course) {
    // Redirect to '/signin' if course data is not available
    return navigate("/signin");
  }

  const handleAddCourse = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8080/cource/addCourse",
        { id }, // Assuming the request body requires an object with 'id' property
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.data.error) {
        notify4(response.data.error);
        notify2(response.data.path);
      } else {
        notify1(response.data.message);
        console.log(response.data);
        navigate("/myCourse");
      }
    } catch (error) {
      console.log("error " + error);
    }
  };

  const handleRemoveCourse = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8080/cource/removeCourse",
        { id }, // Assuming the request body requires an object with 'id' property
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.data.error) {
        notify4(response.data.error);
        notify2(response.data.path);
      } else {
        notify1(response.data.message);
        console.log(response.data);
        navigate("/courses");
      }
    } catch (error) {
      console.log("error " + error);
    }
  };

  {
    console.log(course);
  }
  return (
    <div className="bg-gradient-to-r from-white via-blue-200 to-white">
      <Helmet>
        <title>LearnUp</title>
        <meta name="description" content="LearnUp Courses Page" />
        <meta name="keywords" content="LearnUp, intership, LearnUp, Home, Study, Contest, Education, Learning platform, course, buy courses, courses" />
      </Helmet>
      <div className="flex flex-wrap items-center justify-between pb-2 mx-1 mt-2 md:mt-5 md:mx-5">
        <h1 className="md:text-4xl text-3xl mx-2 font-semibold">
          {course.title}
        </h1>
        <h2 className="text-slate-400">
          by {" "+course.createBy}
        </h2>
      </div>
      <div className="flex flex-wrap">
        <div className="md:mx-5 mx-2 w-full"></div>
        <div className="mx-2 flex flex-wrap md:flex-nowrap w-full">
          <div className="w-full md:mx-2 border-2 md:px-5 p-1  md:rounded-2xl rounded-lg my-1">
            <div className="text-2xl px-1 mb-5 md:mb-10  rounded-sm md:rounded-md my-5">
              {course.description}
            </div>
            <h1 className="italic md:text-2xl text-lg text-gray-600 font-thin">
              Details:
            </h1>
            <p className="italic p-2 text-gray-500 text-lg outline-dashed outline-1 rounded-sm md:rounded-md mb-5 md:mb-10">
              {course.extraDescription}{" "}
            </p>
            <div className="md:flex justify-between">
              {!content ? (
                <div className=" my-2">
                  
                  <button
                    onClick={() => setContent(!content)}
                    className="md:border-2 flex items-center hover:text-white hover:bg-blue-400 transition-all duration-300 rounded-lg md:rounded-xl px-2 md:h-[50px] h-[35px] bg-white border-blue-500 text-blue-500 md:text-lg text-md group"
                  >
                    <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    trokeLinejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 text-blue-500 group-hover:bg-white group-hover:rounded-full mr-2"
                  >
                    <path
                      d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 6.5c-.414 0-.75.336-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5c0-.414-.336-.75-.75-.75zm-.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"
                      fillRule="nonzero"
                    />
                  </svg>
                    <p>

                    View More Contents
                  </p>
                  </button>
                </div>
              ):
                (<div className=" my-2">
                  
                  <button
                    onClick={() => setContent(!content)}
                    className="md:border-2 flex items-center hover:text-white hover:bg-blue-400 transition-all duration-300 rounded-lg md:rounded-xl px-2 md:h-[50px] h-[35px] bg-white border-blue-500 text-blue-500 md:text-lg text-md group"
                  >
                    <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    trokeLinejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 text-blue-500 group-hover:bg-white group-hover:rounded-full mr-2"
                  >
                    <path
                      d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 6.5c-.414 0-.75.336-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5c0-.414-.336-.75-.75-.75zm-.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"
                      fillRule="nonzero"
                    />
                  </svg>
                    <p>

                    View Less Contents
                  </p>
                  </button>
                </div>
              )
              }
              {course.enrollID && course.enrollID.includes(email) ? (
                <div className="flex justify-between outline-1 items-center">
                  <div className="flex">
                    <p className="mr-1">Remove from</p>
                    <p className="text-blue-600"> My Courses:</p>
                  </div>
                  <button
                    onClick={(e) => {
                      handleRemoveCourse(e, course._id);
                    }}
                    className="transition-all duration-300 text-red-500 border-2 hover:text-white border-red-500 hover:bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-white focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg md:text-lg text-md px-5 md:h-[50px] h-[35px] text-center mx-2 "
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex justify-between outline-1 items-center">
                  <div className="flex">
                    <p className="mr-1">Add to</p>
                    <p className="text-blue-600"> My Courses:</p>
                  </div>
                  <button
                    onClick={(e) => {
                      handleAddCourse(e, course._id);
                    }}
                    className="transition-all duration-300 text-green-500 border-2 hover:text-white border-green-500  focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg md:text-lg text-md px-5 md:h-[50px] h-[35px] text-center mx-2  "
                  >
                    Add Course   
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className={`w-full ${
              content === true ? "block" : "hidden"
            } md:mx-2 border-2 md:p-5 p-3 md:rounded-2xl rounded-lg my-1`}
          >
            <Zoom>
              <h1 className="font-thin md:text-2xl text-xl">Course Content:</h1>
              <div className="">
                <ol className="md:mx-5 marker:text-gray-500 marker:font-thin font-thin list-decimal max-h-full overflow-auto">
                  {course.syllabus &&
                    course.syllabus.map((data, ind) => (
                      <li
                        className="m-5 text-lg font-medium pl-5 border-b"
                        key={ind}
                      >
                        {data}
                      </li>
                    ))}
                </ol>
              </div>
            </Zoom>
          </div>
        </div>
      </div>
      <div className="flex md:flex-nowrap">
        <div className="rounded-md border-2 w-full  ">
          <VideoWindow
            selectedSyllabus={course.syllabus}
            selectedVideoUrl={course.courseUrl}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseDesc;
