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
import bg from "../../assets/bg4.svg";
function CourseDesc() {
  const [content, setContent] = useState(false);
  const notify1 = (info) => toast.success(info);
  const notify2 = (info) => toast.info(info);
  const notify4 = (msg) => toast.error(msg);
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state && location.state.course;
  const userInfo = useSelector((state) => state.userData);
  const token = localStorage.getItem("token");
  if (!course) {
    // Redirect to '/signin' if course data is not available
    return navigate("/signin");
  }
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(courseId, courseTitle, price) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const result = await axios.post(
      "http://localhost:8080/payment/orders",
      { price },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, currency, id: order_id } = result.data;

    const options = {
      key: "rzp_test_hCTnA3u7pb9fAs",
      amount: amount.toString(),
      checkout: {
        method: {
          netbanking: 1,
          card: 1,
          upi: 1,
          wallet: 1,
        },
      },
      currency: currency,
      name: "LearnUp Edutech",
      description: courseTitle,
      image: {},
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          courseId: courseId,
          email: userInfo.email,
        };
        console.log(data);
        const result = await axios.post(
          "http://localhost:8080/payment/success",
          { data },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (result.data.msg === "success") {
          console.log("payment Successful");
          handleAddCourse(courseId);
        }
      },
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: "9999999999",
      },
      notes: {
        courseId: courseId,
        courseName: course.title,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const handleAddCourse = async (id) => {
    console.log("adding course");
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

  return (
    <div className="" style={{ backgroundImage: `url(${bg})` }}>
      <Helmet>
        <title>LearnUp</title>
        <meta name="description" content="LearnUp Courses Page" />
        <meta
          name="keywords"
          content="LearnUp, intership, LearnUp, Home, Study, Contest, Education, Learning platform, course, buy courses, courses"
        />
      </Helmet>
      <div className="">
        <div className=" mx-auto gap-2 md:flex align-top bg-amber-950">
          <div className="flex-1 mx-auto md:p-2 w-full justify-center">
            <div className="flex flex-wrap gap-4 sm:flex-nowrap w-full">
              <div className="flex-1 min-w-[280px] p-1 max-w-[500px] justify-center">
                <img
                  className="rounded-md w-full md:m-2"
                  src="https://placehold.co/100x60"
                  alt=""
                />
              </div>
              <div className="max-w-[900px] ">
                <div className=" items-center justify-between mx-1 md:mx-6">
                  <h1 className="md:text-4xl text-3xl text-white font-semibold py-1">
                    {course.title}
                  </h1>
                  <h2 className="text-slate-400">by {" " + course.createBy}</h2>
                </div>
                <div className=" text-white bg-opacity-85 text-xl font-light mb-5 md:mb-10 rounded-sm md:rounded-md my-3 p-4">
                  {course.description}
                </div>
                <div className="flex justify-end md:mx-6">
                  {course.enrollID &&
                  course.enrollID.includes(userInfo.email) ? (
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
                    <button
                      href="#_"
                      class="inline-flex overflow-hidden text-white bg-gray-900 rounded group"
                      onClick={(e) => {
                        displayRazorpay(course._id, course.title, course.price);
                      }}
                    >
                      <span class="px-3.5 py-2 text-white bg-cyan-500 group-hover:bg-yellow-300 group-hover:text-amber-950 flex items-center justify-center">
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          ></path>
                        </svg>
                      </span>
                      <span class="pl-7 pr-9 py-2.5">₹{course.price}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex md:flex-nowrap">
        <div className="rounded-md border-2 w-full  ">
        <VideoWindow
        selectedSyllabus={course.syllabus}
        selectedVideoUrl={course.courseUrl}
        />
        </div>
      </div> */}
      </div>
      <div className="flex justify-start flex-wrap pace-y-5 mx-auto">
        <div className=" flex flex-wrap md:flex-nowrap w-full bg-gray-300 bg-opacity-80">
          <div className="w-full md:mx-2 my-1 md:p-5 p-3 bg-white">
            <h1 className="font-semibold md:text-2xl text-xl ml-2">
              Insights:
            </h1>
            <p className="p-2 text-black text-lg mb-5 md:mb-10">
              {course.extraDescription}
            </p>
          </div>
          <div>
            <div className=" w-full md:mx-2 border-2 md:p-5 p-3 bg-white my-1">
              <h1 className="font-thin md:text-2xl text-xl ml-5">
                Course Content:
              </h1>

              <ol className="md:mx-5 marker:text-black marker:font-thin font-thin list-decimal max-h-full overflow-auto ">
                {course.syllabus &&
                  course.syllabus.map((data, ind) => (
                    <li
                      className="bg-gray-100 rounded-md mx-5 my-1 text-lg font-medium pl-5 border-b"
                      key={ind}
                    >
                      {data}
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDesc;
