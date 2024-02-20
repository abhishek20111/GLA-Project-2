
import forgot_icon from '../../assets/logo/forgot-password.avif'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState } from 'react';

function Forgot_Password() {
  const [email, setEmail] = useState('')
  const [sendEmail, setSendEmail] = useState(false);
  const notify1 = (msg) => toast.success(msg);
  const notify4 = (msg) => toast.error(msg);

  const handleForgot = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:8080/forgot-password', {email: email})
      console.log(res.data);
      notify1(res.data.message)
      setSendEmail(true);
    }catch(error){
      console.log(error)
      notify4(error.message)
    }

  }

  return (
    <div className="h-[100dvh] w-[100dvw] flex">
    <div className="max-w-sm flex flex-col rounded overflow-hidden m-auto shadow-lg ">
      <img
        className="w-full"
        src={forgot_icon}
        alt="forgot User"
      />
      {sendEmail ? 
      (<>
      <div>
      <div className="px-6 py-4">
        <div className=" flex gap-x-4 items-center">
        {/* <img src={logo} className="h-10 w-10" alt="forgot User" /> */}
        <div className="font-bold text-xl mb-2">Verification Mail</div>
        </div>
        <p className="text-gray-700 text-base">
          Verification Code send to your Email Id
          <br />
          Please check it..
        </p>
      </div>

      </div>
      </>)
      :
      (
      <div>
      <div className="px-6 py-4">
        <div className=" flex gap-x-4 items-center">
        {/* <img src={logo} className="h-10 w-10" alt="forgot User" /> */}
        <div className="font-bold text-xl mb-2">Forgot Your Password</div>
        </div>
        <p className="text-gray-700 text-base">
          Enter Your Email Id to reset your password 
          <input type="text" name='email' className=' my-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='dreamUp@gmail.com'
            required
          onChange={(e)=>setEmail(e.target.value)} />
        </p>
      </div>


      <div className="w-full flex mb-4 justify-center">
        <button onClick={(e)=>handleForgot(e)} className="flex  justify-center w-[12rem] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
          Reset Password</button>
      </div>
      </div>
      )}
    </div>
      </div>
  )
}

export default Forgot_Password
