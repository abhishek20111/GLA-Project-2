import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./component/ErrorPage";
import UserProfile from "./component/profile/UserProfile.jsx";
import Home from "./component/Home";
import Signin from "./component/auth/Signin.jsx";
import Signup from "./component/auth/Signup.jsx";
import Navbar from "./component/Navbar";
import { updateToken, setIsLogin } from "./store/UserSilce.js";
import Footer from "./component/sideLayout/Footer.jsx";
import Cource from "./component/cource/Cource.jsx";
import CourseDesc from "./component/cource/CouseDesc.jsx";
import MyCource from "./component/cource/MyCource.jsx";
import About from "./component/sideLayout/About.jsx";
import Internship from "./component/sideLayout/Intership.jsx";
import VideoWindow from "./component/VideoWindow";
import Logout from "./component/auth/Logout.jsx";
import Manage from "./component/Manage";
import UploadVideo from "./component/cource/uploadCource/UploadVideo.jsx";
import YourVideo from "./component/YourVideo";
import { Helmet } from "react-helmet";
import Forgot_Password from "./component/auth/Forgot_Password.jsx";
import Reset_Password from "./component/auth/Reset_Password.jsx";
import VerifyEmail from "./component/auth/VerifyEmail.jsx";

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

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>LearnUp</title>
        <meta name="description" content="LearnUp is platform for Courses" />
        <meta name="keywords" content="LearnUp, LearnUp, Education, Learning platform, course, buy courses, courses" />
      </Helmet>
      <Navbar />
      <AppRoutes />
      <Footer />
      <ToastContainer />
    </div>
  );
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicElement>
              <Signup />
            </PublicElement>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicElement>
              <Forgot_Password />
            </PublicElement>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicElement>
              <Reset_Password />
            </PublicElement>
          }
        />
        <Route
          path="/VerifyEmail"
          element={
            <PublicElement>
              <VerifyEmail />
            </PublicElement>
          }
        />
        <Route
          path="/about"
          element={
            <PublicElement>
              <About />
            </PublicElement>
          }
        />
        <Route
          path="/intern"
          element={
            <PublicElement>
              <Internship />
            </PublicElement>
          }
        />
        <Route
          path="/VWindow"
          element={
            <PublicElement>
              <VideoWindow />
            </PublicElement>
          }
        />
        <Route
          path="/manage"
          element={
            <AdminElement>
              <Manage />
            </AdminElement>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicElement>
              <Signin />
            </PublicElement>
          }
        />
        <Route
          path="/"
          element={
            <PublicElement>
              <Home />
            </PublicElement>
          }
        />
        <Route
          path="*"
          element={
            <PublicElement>
              <ErrorPage />
            </PublicElement>
          }
        />
        <Route
          path="/UserProfile"
          element={
            <UserElement>
              <UserProfile />
            </UserElement>
          }
        />
        <Route
          path="/logout"
          element={
            <UserElement>
              <Logout />
            </UserElement>
          }
        />
        <Route
          path="/myCourse"
          element={
            <UserElement>
              <MyCource />
            </UserElement>
          }
        />
        <Route
          path="/courses"
          element={
            <PublicElement>
              <Cource />
            </PublicElement>
          }
        />
        <Route
          path="/course_description"
          element={
            <UserElement>
              <CourseDesc />
            </UserElement>
          }
        />
        <Route
          path="/uploadVideo"
          element={
            <AdminElement>
              <UploadVideo />
            </AdminElement>
          }
        />
        <Route
          path="/yourVideo"
          element={
            <AdminElement>
              <YourVideo />
            </AdminElement>
          }
        />
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
