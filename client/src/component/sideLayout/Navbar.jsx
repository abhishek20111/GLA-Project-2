import { useState, useEffect } from "react";
import "../../App.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import GIF from "../../assets/logo/Navbar.png";
import { useSelector } from "react-redux";
import { selectLoading } from "../../store/UserSilce.js";
function Navbar() {
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();

  const USER_TYPE = {
    PUBLIC: "Public User",
    USER: "User",
    ADMIN: "Admin",
    SUPER_ADMIN: "Super Admin",
  };

  const location = useLocation();
  let path = location.pathname;

  const token = useSelector((state) => state.userData.token);
  const isLogin = useSelector((state) => state.userData.isLogin);
  const detail = useSelector((state) => state.userData);

  useEffect(() => {
    setUserInfo(detail);
  });
  const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);
  // console.log(CURRENT_USER_TYPE);
  return (
    <nav
      className={`${
        path == "/" || path == "home" ? "bg-cyan-950" : "bg-amber-950"
      } from-cyan-950 via-cyan-950 px-2 sm:px-4 py-2.5`}
    >
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a link to="/" className="flex items-center">
          <img src={GIF} className="md:w-[100px] ml-3 w-28" />
        </a>

        <div className="flex items-center md:order-2 ">
          <button
            type="button"
            className="flex mr-3  text-sm bg-gray-800 rounded-full md:mr-0"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={`https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png`}
              alt="user photo"
            />
          </button>
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 shadow-lg"
            id="user-dropdown"
          >
            {isLogin ? (
              <div className="w-fit">
                <div className="px-4 py-3">
                  <span className="font-bold  text-md text-gray-900 ">
                    {userInfo.name}
                  </span>
                  <span className="block text-sm font-medium text-gray-500 truncate">
                    {userInfo.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li className="px-2">
                    <Link
                      to="/UserProfile"
                      className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                    >
                      Dashboard
                    </Link>
                  </li>
                  <div className="m-1">
                    <w3m-button size="sm" balance="hide"/>
                  </div>
                  <li className="px-2">
                    <Link
                      to="/message"
                      className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                    >
                      Message
                    </Link>
                  </li>
                  <li>
                    <div
                      onClick={() => {
                        navigate("/logout");
                      }}
                      className="block cursor-pointer px-4 py-2 text-sm  hover:rounded hover:border-2 hover:border-red-500 transition-all hover:font-bold text-red-600"
                    >
                      Sign out
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="border rounded-md py-2">
                <Link to="/signIn">
                  <p className=" px-4 py-2 mx-3 border-b border-blue-400 rounded-md hover:bg-blue-500 hover:text-lg transition-all hover:text-white">
                    Log-In
                  </p>
                </Link>
                <Link to="/signUp">
                  <p className=" px-4 py-2 mx-3 border-t border-blue-400 rounded-md hover:bg-blue-500 hover:text-lg transition-all hover:text-white">
                    SignUp
                  </p>
                </Link>
              </div>
            )}
          </div>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className="items-center bg-transparent justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col p-4 mt-4 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border- ">
            <li>
              <a
                href="#"
                className={`block py-2 pl-3 pr-4  rounded md:bg-transparent ${
                  location.pathname === "/" ? "text-yellow-300" : "text-white"
                } md:p-0  hover:text-red-300`}
                aria-current="page"
              >
                <Link to="/">Home</Link>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block py-2 pl-3 pr-4  rounded md:bg-transparent ${
                  location.pathname === "/courses"
                    ? "text-yellow-300"
                    : "text-white"
                } md:p-0 hover:text-yellow-300`}
              >
                <Link to="/courses">Courses</Link>
              </a>
            </li>
            {isLogin ? (
              <li>
                <Link
                  to="/myCourse"
                  className={`block py-2 pl-3 pr-4  rounded md:bg-transparent ${
                    location.pathname === "/myCourse"
                      ? "text-yellow-300"
                      : "text-white"
                  } md:p-0 hover:text-yellow-300`}
                >
                  My Courses
                </Link>
              </li>
            ) : null}
            {CURRENT_USER_TYPE === USER_TYPE.ADMIN ||
            CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN ? (
              <li>
                <Link
                  to="/manage"
                  className={`block py-2 pl-3 pr-4  rounded md:bg-transparent ${
                    location.pathname === "/manage"
                      ? "text-yellow-300"
                      : "text-white"
                  } md:p-0  hover:text-yellow-300`}
                >
                  Manage
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/intern"
                  className={`block py-2 pl-3 pr-4  rounded md:bg-transparent ${
                    location.pathname === "/intern"
                      ? "text-yellow-300"
                      : "text-white"
                  } md:p-0  hover:text-yellow-300`}
                >
                  Internships
                </Link>
              </li>
            )}
            {CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN && (
              <li>
                <Link
                  to="/userMange"
                  className={`block py-2 pl-3 pr-4  rounded md:bg-transparent ${
                    location.pathname === "/userMange"
                      ? "text-yellow-300"
                      : "text-white"
                  } md:p-0  hover:text-yellow-300`}
                >
                  User
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/about"
                className={`block py-2 pl-3 pr-4  rounded md:bg-transparent ${
                  location.pathname === "/about"
                    ? "text-yellow-300"
                    : "text-white"
                } md:p-0  hover:text-yellow-300`}
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
