import { Fade } from "react-awesome-reveal";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Signin from "../auth/Signin";
import CourseDesc from "./CouseDesc";
import { redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import bg from "../../assets/bg3.svg";

export default function Cource() {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.userData.isLogin);
  const [filteredCourse, setFilteredCourse] = useState([]);
  useEffect(() => {
    fetchData();
    // console.log(courses);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/cource/getAllCourses"
      );
      // console.log(response.data.courses);
      setCourses(response.data.courses);
      setFilteredCourse(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSelectCourse = (course) => {
    if (isLogin) {
      navigate("/course_description", { state: { course: course } });
    } else navigate("/signin");
  };
  const searchCourses = (keyword) => {
    if (keyword.length == 0) {
      setFilteredCourse(courses);
      return;
    }
    const filtered = [];
    keyword = keyword.trim().toLowerCase();
    courses.map((course) => {
      if (course.title.toLowerCase().includes(keyword)) {
        filtered.push(course);
      }
    });
    setFilteredCourse(filtered);
  };

  return (
    <div
      className="mx-auto pb-16 h-full w-full min-h-screen"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Helmet>
        <title>LearnUp | Courses Page</title>
        <meta name="description" content="LearnUp Courses Page" />
        <meta
          name="keywords"
          content="LearnUp, intership, LearnUp, Home, Study, Contest, Education, Learning platform, course, buy courses, courses"
        />
      </Helmet>
      <div className=" text-white text-center flex justify-center">
        <div>
          <div className="py-2 flex">
            <div className="w-full mx-auto">
              <div className="relative px-1">
                <svg
                  className="absolute z-20 cursor-pointer top-[18px] left-4"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2716 13.1684L11.3313 10.2281C12.0391 9.28574 12.4213 8.13865 12.42 6.96C12.42 3.94938 9.97063 1.5 6.96 1.5C3.94938 1.5 1.5 3.94938 1.5 6.96C1.5 9.97063 3.94938 12.42 6.96 12.42C8.13865 12.4213 9.28574 12.0391 10.2281 11.3313L13.1684 14.2716C13.3173 14.4046 13.5114 14.4756 13.711 14.47C13.9105 14.4645 14.1004 14.3827 14.2415 14.2415C14.3827 14.1004 14.4645 13.9105 14.47 13.711C14.4756 13.5114 14.4046 13.3173 14.2716 13.1684ZM3.06 6.96C3.06 6.18865 3.28873 5.43463 3.71727 4.79328C4.14581 4.15192 4.7549 3.65205 5.46754 3.35687C6.18017 3.06169 6.96433 2.98446 7.72085 3.13494C8.47738 3.28542 9.17229 3.65686 9.71772 4.20228C10.2631 4.74771 10.6346 5.44262 10.7851 6.19915C10.9355 6.95567 10.8583 7.73983 10.5631 8.45247C10.268 9.1651 9.76808 9.77419 9.12673 10.2027C8.48537 10.6313 7.73135 10.86 6.96 10.86C5.92604 10.8588 4.93478 10.4475 4.20365 9.71635C3.47253 8.98522 3.06124 7.99396 3.06 6.96Z"
                    fill="#4B5563"
                  />
                </svg>
                <input
                  className="relative text-sm leading-none text-gray-600 bg-white rounded w-full px-10 py-4 outline-none"
                  type="text"
                  name="searchKeyword"
                  id="searchKeyword"
                  placeholder="Search"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      searchCourses(event.target.value);
                    }
                  }}
                />
              </div>
            </div>
            <div className="mr-1">
              <button
                className="bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white"
                onClick={() => {
                  searchCourses(document.getElementById("searchKeyword").value);
                }}
              >
                Search
              </button>
            </div>
          </div>

          <style>
            {`
     body{
       background:rgb(243 244 246);
     }
     `}
          </style>
        </div>
      </div>
      {/* <div className="bg-gray-200 md:w-3/4 rounded-md flex flex-wrap justify-center bg-gradient-to-tr from-indigo-300  to-indigo-700 min-h-screen"> */}
      <div className="md:w-[95%] md:mx-auto rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 ">
        <Fade cascade damping={0.5} triggerOnce={true}>
          {filteredCourse.map((course, indx) => (
            <div className="m-2 group" key={indx}>
              <div className="w-sm group-hover:translate-y-0.5 group-hover:rounded-lg transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-t-lg relative group-hover:shadow-md group-hover:shadow-green-200">
                <a href="#">
                  <img
                    className="rounded-xl group-hover:rounded-t-xl w-full"
                    src="https://placehold.co/100x60"
                    alt=""
                  />
                </a>
                <div className="py-2 px-2">
                  <a href="#">
                    <h1 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white ">
                      {course.title}
                    </h1>
                  </a>
                  <div className="absolute overflow-auto top-0 left-0 w-full h-full bg-white bg-opacity-90 p-5 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:rounded-xl outline -outline-offset-4 outline-1">
                    <div className="flex flex-col h-full justify-between text-gray-800 dark:text-gray-300 duration-700 transition transform ease-in-out group-hover:-translate-y-0 translate-y-4">
                      <div>
                        <h1 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white ">
                          {course.title}
                        </h1>
                        <p className=" text-black">
                          {course.description.substring(0, 100) + "..."}
                        </p>
                      </div>
                      <div className="flex justify-end duration-700 transition transform ease-in-out">
                        <button
                          onClick={() => handleSelectCourse(course)}
                          className="border-2 border-blue-500 text-sm font-medium text-center text-gray-500 rounded-lg hover:bg-blue-400 hover:text-white p-2 focus:ring-1  focus:ring-blue-300"
                        >
                          More Details
                        </button>
                      </div>
                      {/* A bunch of things about the course Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo, assumenda ipsum natus eaque atque unde! Necessitatibus molestias qui nobis est. Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
                    </div>
                    {/* <div>Important: {course.extraDescription}</div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Fade>
      </div>
    </div>
  );
}
