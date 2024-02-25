import React, { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { updateToken, setIsLogin } from "./store/UserSilce.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./component/ErrorPage";

import Navbar from "./component/Navbar";
import Footer from "./component/sideLayout/Footer";
const Home = lazy(() => import("./component/Home"));
const Signin = lazy(() => import("./component/auth/Signin"));
const Signup = lazy(() => import("./component/auth/Signup"));
const UserProfile = lazy(() => import("./component/profile/UserProfile"));
const Forgot_Password = lazy(() => import("./component/auth/Forgot_Password"));
const Reset_Password = lazy(() => import("./component/auth/Reset_Password"));
const VerifyEmail = lazy(() => import("./component/auth/VerifyEmail"));
const About = lazy(() => import("./component/sideLayout/About"));
const Internship = lazy(() => import("./component/sideLayout/Intership"));
const VideoWindow = lazy(() => import("./component/VideoWindow"));
const Manage = lazy(() => import("./component/Manage"));
const Logout = lazy(() => import("./component/auth/Logout"));
const MyCource = lazy(() => import("./component/cource/MyCource"));
const Cource = lazy(() => import("./component/cource/Cource"));
const CourseDesc = lazy(() => import("./component/cource/CouseDesc.jsx"));
const UploadVideo = lazy(() => import("./component/cource/uploadCource/UploadVideo"));
const YourVideo = lazy(() => import("./component/YourVideo"));

import { Helmet } from "react-helmet";
import Loading from '../src/assets/logo/loading.gif'

const USER_TYPE = {
  PUBLIC: "Public User",
  USER: "User",
  ADMIN: "Admin",
  SUPER_ADMIN: "Super Admin",
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(updateToken(token));
      dispatch(setIsLogin(true));
    }
  }, [dispatch]);
  const LoadingSpinner = () => (
    <di45v style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <img src={Loading} alt="Loading..." className="h-[20vh]" />
    </di45v>
  );

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>LearnUp</title>
        <meta name="description" content="LearnUp is platform for Courses" />
        <meta name="keywords" content="LearnUp, LearnUp, Education, Learning platform, course, buy courses, courses" />
      </Helmet>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <AppRoutes />
      </Suspense>
      <Footer />
      <ToastContainer />
    </div>
  );
}

function AppRoutes() {
    return (
    <>
      <Routes>
        <Route path="/signup" element={<PublicElement><Signup /></PublicElement>} />
        <Route path="/forgot-password" element={<PublicElement><Forgot_Password /></PublicElement>} />
        <Route path="/reset-password" element={<PublicElement><Reset_Password /></PublicElement>} />
        <Route path="/VerifyEmail" element={<PublicElement><VerifyEmail /></PublicElement>} />
        <Route path="/about" element={<PublicElement><About /></PublicElement>} />
        <Route path="/intern" element={<PublicElement><Internship /></PublicElement>} />
        <Route path="/VWindow" element={<PublicElement><VideoWindow /></PublicElement>} />
        <Route path="/manage" element={<AdminElement><Manage /></AdminElement>} />
        <Route path="/signin" element={<PublicElement><Signin /></PublicElement>} />
        <Route path="/" element={<PublicElement><Home /></PublicElement>} />
        <Route path="*" element={<PublicElement><ErrorPage /></PublicElement>} />
        <Route path="/UserProfile" element={<UserElement><UserProfile /></UserElement>} />
        <Route path="/logout" element={<UserElement><Logout /></UserElement>} />
        <Route path="/myCourse" element={<UserElement><MyCource /></UserElement>} />
        <Route path="/courses" element={<PublicElement><Cource /></PublicElement>} />
        <Route path="/course_description" element={<UserElement><CourseDesc /></UserElement>} />
        <Route path="/uploadVideo" element={<AdminElement><UploadVideo /></AdminElement>} />
        <Route path="/yourVideo" element={<AdminElement><YourVideo /></AdminElement>} />
      </Routes>
    </>
  );
}

function PublicElement({ children }) {
  return <>{children}</>;
}

function UserElement({ children }) {
  const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);

  if (
    CURRENT_USER_TYPE === USER_TYPE.USER ||
    CURRENT_USER_TYPE === USER_TYPE.ADMIN ||
    CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN
  )
    return <>{children}</>;
  else return <>do not access to this domain</>;
}

function OnlyUserElement({ children }) {
  const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);

  if (CURRENT_USER_TYPE === USER_TYPE.USER) return <>{children}</>;
  else return <>You do not need to access this site</>;
}

function AdminElement({ children }) {
  const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);

  if (
    CURRENT_USER_TYPE === USER_TYPE.ADMIN ||
    CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN
  )
    return <>{children}</>;
  else return <>do not access to Admin domain</>;
}

export default App;

// import React, { useEffect, lazy, Suspense } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Loading from "../src/assets/logo/loading.gif";
// import { Helmet } from "react-helmet";
// import Navbar from "./component/Navbar";
// import Footer from "./component/sideLayout/Footer";
// import { USER_TYPE } from "./constants"; // Assuming you have a constants file
// import PublicElement from "./components/PublicElement";
// import ErrorPage from "./component/ErrorPage";

// const Home = lazy(() => import("./component/Home"));
// const Signin = lazy(() => import("./component/auth/Signin"));
// const Signup = lazy(() => import("./component/auth/Signup"));
// const UserProfile = lazy(() => import("./component/profile/UserProfile"));
// const Forgot_Password = lazy(() => import("./component/auth/Forgot_Password"));
// const Reset_Password = lazy(() => import("./component/auth/Reset_Password"));
// const VerifyEmail = lazy(() => import("./component/auth/VerifyEmail"));
// const About = lazy(() => import("./component/sideLayout/About"));
// const Internship = lazy(() => import("./component/sideLayout/Intership"));
// const VideoWindow = lazy(() => import("./component/VideoWindow"));
// const Manage = lazy(() => import("./component/Manage"));
// const Logout = lazy(() => import("./component/auth/Logout"));
// const MyCource = lazy(() => import("./component/cource/MyCource"));
// const Cource = lazy(() => import("./component/cource/Cource"));
// const CourseDesc = lazy(() => import("./component/cource/CourseDesc"));
// const UploadVideo = lazy(() => import("./component/cource/uploadCource/UploadVideo"));
// const YourVideo = lazy(() => import("./component/YourVideo"));

// const AppRoutes = () => {
//   const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);

//   return (
//     <>
//       <Routes>
//         <Route path="/signup" element={<PublicElement><Signup /></PublicElement>} />
//         <Route path="/forgot-password" element={<PublicElement><Forgot_Password /></PublicElement>} />
//         <Route path="/reset-password" element={<PublicElement><Reset_Password /></PublicElement>} />
//         <Route path="/VerifyEmail" element={<PublicElement><VerifyEmail /></PublicElement>} />
//         <Route path="/about" element={<PublicElement><About /></PublicElement>} />
//         <Route path="/intern" element={<PublicElement><Internship /></PublicElement>} />
//         <Route path="/VWindow" element={<PublicElement><VideoWindow /></PublicElement>} />
//         <Route path="/manage" element={<AdminElement><Manage /></AdminElement>} />
//         <Route path="/signin" element={<PublicElement><Signin /></PublicElement>} />
//         <Route path="/" element={<PublicElement><Home /></PublicElement>} />
//         <Route path="*" element={<PublicElement><ErrorPage /></PublicElement>} />
//         <Route path="/UserProfile" element={<UserElement><UserProfile /></UserElement>} />
//         <Route path="/logout" element={<UserElement><Logout /></UserElement>} />
//         <Route path="/myCourse" element={<UserElement><MyCource /></UserElement>} />
//         <Route path="/courses" element={<PublicElement><Cource /></PublicElement>} />
//         <Route path="/course_description" element={<UserElement><CourseDesc /></UserElement>} />
//         <Route path="/uploadVideo" element={<AdminElement><UploadVideo /></AdminElement>} />
//         <Route path="/yourVideo" element={<AdminElement><YourVideo /></AdminElement>} />
//       </Routes>
//     </>
//   );
// };

// function PublicElement({ children }) {
//   return <>{children}</>;
// }

// function UserElement({ children }) {
//   if (
//     CURRENT_USER_TYPE === USER_TYPE.USER ||
//     CURRENT_USER_TYPE === USER_TYPE.ADMIN ||
//     CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN
//   )
//     return <>{children}</>;
//   else return <>do not access to this domain</>;
// }

// function AdminElement({ children }) {
//   if (
//     CURRENT_USER_TYPE === USER_TYPE.ADMIN ||
//     CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN
//   )
//     return <>{children}</>;
//   else return <>do not access to Admin domain</>;
// }

// const LoadingSpinner = () => (
//   <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//     <img src={Loading} alt="Loading..." />
//   </div>
// );

// const App = () => {
//   return (
//     <div className="min-h-screen">
//       <Helmet>
//         <title>LearnUp</title>
//         <meta name="description" content="LearnUp is platform for Courses" />
//         <meta name="keywords" content="LearnUp, LearnUp, Education, Learning platform, course, buy courses, courses" />
//       </Helmet>
//       <Navbar />
//       <Suspense fallback={<LoadingSpinner />}>
//         <AppRoutes />
//       </Suspense>
//       <Footer />
//       <ToastContainer />
//     </div>
//   );
// };

// export default App;

