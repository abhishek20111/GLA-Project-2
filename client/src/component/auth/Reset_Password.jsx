import React, { useEffect, useState } from "react";
import Security from "../../assets/logo/security.gif";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Reset_Password() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const token = params.get("token");
  const notify1 = (msg) => toast.success(msg);
  const notify2 = (msg) => toast.error(msg);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return notify2("Password and Confirm Password not matched");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:8080/reset-password",
          { password: password, token: token }
        );
        console.log(res.data);
        notify1("Password reset successfully!");
        navigate('/signin')
      } catch (err) {
        console.log(err.response.data.message);
        notify2(err.response.data.message);
      }
    }
  };

  return (
    <div className="h-[100dvh] w-[100dvw] flex">
      <div className="max-w-sm flex flex-col rounded overflow-hidden m-auto shadow-lg ">
        <img className="w-full" src={Security} alt="Verified User" />
        <div>
          <div className="px-6 py-4">
            <div className=" flex gap-x-4 items-center">
              <div className="font-bold text-xl mb-2">Forgot Your Password</div>
            </div>
            <p className="text-gray-700 text-base">
              Enter Your New Password
              <input
                type="text"
                name="password"
                className=" my-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                name="confirmPassword"
                className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Confirm Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </p>
          </div>

          <div className="w-full flex mb-4 justify-center">
            <button
              onClick={(e) => handleReset(e)}
              className="flex  justify-center w-[12rem] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset_Password;
