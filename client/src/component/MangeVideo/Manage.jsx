import React, { useState } from "react";
import UploadVideo from "../cource/uploadCource/UploadVideo";
import YourVideo from "../cource/uploadCource/YourVideo";
import { Fade } from "react-awesome-reveal";
import bg from "../../assets/bg4.svg";
export default function Manage() {
  const stepsItems = ["Upload", "Manage"];
  const [steps, setStep] = useState(0);
  return (
    //   <div>
    //     This is the manage page.

    //     <div className='w-full justify-evenly'>
    //       <button onClick={()=>setOpen(true)} className='text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>Upload Video</button>

    //       <button onClick={()=>setOpen(false)} className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>Manage Video</button>
    //       {
    //         open?
    //         <>
    //         <UploadVideo/>
    //         </>
    //         :
    //         <>
    //         <YourVideo/>
    //         </>
    //       }

    //     </div>
    // </div>
    
    <div className=" pt-1" style={{ backgroundImage: `url(${bg})` }}>
      
      <div className="max-w-3xl my-2 mx-auto px-4 md:px-0">
        <ul
          aria-label="Steps"
          className="items-center text-gray-600 font-medium flex"
        >
          {stepsItems.map((item, idx) => (
            <li
              key={idx}
              aria-current={steps == idx ? "step" : false}
              className="flex-1 last:flex-none flex gap-x-2 md:items-center"
              onClick={() => setStep(idx)}
            >
              <div
                className={`cursor-pointer  transition-all duration-500 flex items-center gap-x-2 border-2 hover:border-4 p-1 rounded-xl  hover:border-emerald-400 ${
                  idx == steps ? "border-emerald-400" : " border-indigo-600"
                } group`}
              >
                <div
                  className={`transition-all w-8 h-8 rounded-full group-hover:w-9 group-hover:h-9 flex-none flex items-center justify-center ${
                    idx == steps
                      ? "border-emerald-400 bg-emerald-400"
                      : " bg-indigo-600 border-indigo-600"
                  }  group-hover:border-emerald-400 group-hover:bg-emerald-400 `}
                >
                  {steps === idx && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </div>
                <div className="h-8 flex items-center md:h-auto">
                  <h3
                    className={`text-sm ${
                      idx == steps ? "text-emerald-400" : " text-indigo-600"
                    } group-hover:text-emerald-400 group-hover:text-lg group-hover:font-semibold`}
                  >
                    {item}
                  </h3>
                </div>
              </div>
              <hr
                className={` mr-2 py-[2px] w-full border md:block bg-gradient-to-r ${
                  steps == 0
                    ? "from-emerald-400 to-indigo-600"
                    : "to-emerald-400 from-indigo-600"
                }  `}
              />
            </li>
          ))}
        </ul>
      </div>
      
      {steps === 0 && <Fade><UploadVideo /></Fade>}
      {steps === 1 && <Fade><YourVideo /></Fade>}
    </div>
  );
}
