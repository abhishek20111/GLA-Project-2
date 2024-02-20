import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo/No_Bg_logo.png'
import Verified from '../../assets/logo/verified.jpg'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VerifyEmail() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const token = params.get('token');
  const notify1 = (msg) => toast.success(msg);
  const notify2 = (msg) => toast.error(msg);


  const VerifyEmail = async()=>{
    try{
      const res = await axios.get(`http://localhost:8080/verifyEmail/${token}`)
      const data = res.data
      console.log(data);
      notify1(data.message)
  }catch(err){
    console.log(err.response.data.error);
    notify2(err.response.data.error)
  }

  }

  useEffect(()=>{
    VerifyEmail();
  },[])
  return (
    <div className="h-[100dvh] w-[100dvw] flex">
    <div className="max-w-sm flex flex-col rounded overflow-hidden m-auto shadow-lg ">
      <img
        className="w-full"
        src={logo}
        alt="Verified User"
      />
      <div className="px-6 py-4">
        <div className=" flex gap-x-4 items-center">
        <img src={Verified} className="h-10 w-10" alt="Verified User" />
        <div className="font-bold text-xl mb-2">Thanks For Verification </div>
        </div>
        <p className="text-gray-700 text-base">
          Now you can login and enjoy the courses,
          Now you can login and enjoy the courses  
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #cource
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #speel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #Black Magic
        </span>
      </div>

      <div className="w-full flex justify-center">
        <Link to="/signin" className="flex  justify-center w-[12rem] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Login</Link>
      </div>
    </div>
    </div>
  );
}

export default VerifyEmail;
