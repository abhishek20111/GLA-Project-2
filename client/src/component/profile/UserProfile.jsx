import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadToCloudinary } from "../helper/upload";
import { updateprofileImage } from "../../store/UserSilce";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [courses, setCourses] = useState([]);
  const [mycourses, setMyCourses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [imageChange, setImageChange] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const dispacter = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromProps = location.state && location.state.email;
  const profileImage = useSelector((state) => state.userData.profileImage);
  const emailUser = useSelector((state) => state.userData.email);
  const [detailsModal, setDetailsModal] = useState(false);
  const [refundModal, setRefundModal] = useState(false);
  const [detailsModalData, setDetailsModalData] = useState(null);
  const [refundModalData, setRefundModalData] = useState(null);
  const [loading, setLoading] = useState(false);

  const detail = useSelector((state) => state.userData.details);
  useEffect(() => setUserInfo(detail), []);

  const fetchData = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/cource/getMyCourses",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setUserInfo(response.data.user);
      if (!profileImage && response.data.user.email === emailUser)
        dispacter(updateprofileImage(response.data.user.profileImage));
      setMyCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const handleDetailsModal = async (txnId) => {
    setDetailsModal(true);
    setLoading(true);
    console.log("going to request");
    const details = await axios.post(
      `https://api.razorpay.com/v1/transactions/${txnId}`
    );
    console.log(details);
    setDetailsModalData(details);
    setLoading(false);
  };
  const handleRefundModal = (txn) => {
    setRefundModal(true);
  };
  const fetchMyData = async (email) => {
    try {
      console.log(email);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/cource/getCourses",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.courses);
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const fetchMyTransactions = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/getTxns",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(response.data);
      // console.log(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return error;
    }
  };

  const handleImageChange = (e) => {
    setImageChange(e.target.files[0]);
  };

  const uploadImage = async () => {
    try {
      const { url } = await uploadToCloudinary(imageChange);
      console.log(url);
      setImageUrl(url);
      dispacter(updateprofileImage(url));
      changeProfileImage(url);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
  const changeProfileImage = async (url) => {
    try {
      console.log(imageUrl);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/updateProfileImage`,
        { imageUrl: url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setImageChange("");
    } catch (err) {
      console.log(err);
    }
  };

  function isRefundDisabled(createdAt) {
    const currentDate = new Date();
    const diffInMilliseconds =
      currentDate.getTime() - new Date(createdAt).getTime();
    const diffInDays = diffInMilliseconds / (1000 * 3600 * 24); // Convert milliseconds to days
    return diffInDays > 7;
  }

  const emailToGo = emailFromProps || emailUser;
  useEffect(() => {
    console.log(emailToGo);
    fetchMyData(emailToGo);
    fetchData(emailToGo);
    fetchMyTransactions(emailToGo);
    // console.log(mycourses);
  }, []);
  useEffect(() => {
    if (imageChange !== null) {
      uploadImage();
    }
  }, [imageChange]);

  return (
    <div className="bg-blue-100">
      <main className=" mx-auto py-8 md:px-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-md bg-white md:p-6 p-3 md:mb-6 mb-3 h-full">
          <h2 className="text-lg font-bold mb-4">Profile</h2>
          <div className="border rounded-md p-4 mb-4">
            <label htmlFor="dropzone-file" className="flex justify-center">
              <div className="md:w-1/2  border-2 p-2 rounded-xl">
                <img
                  src={`${
                    userInfo.email === emailUser
                      ? profileImage
                      : userInfo.profileImage
                  }`}
                  alt="User Profile"
                  className="  object-cover rounded-full h-[20rem] w-[20rem]"
                />
                <input
                  id="dropzone-file"
                  onChange={handleImageChange}
                  type="file"
                  className="hidden"
                />
              </div>
            </label>
            <div className="p-4 flex flex-col items-center">
              <p>
                {userInfo.role === "Super Admin" && (
                  <span className="font-semibold text-red-500">
                    Category: Master
                  </span>
                )}
              </p>
              <p>
                {userInfo.role === "Admin" && (
                  <span className="font-semibold text-red-500">
                    Category: Teacher
                  </span>
                )}
              </p>
              <p>
                {userInfo.role === "User" && (
                  <span className="font-semibold text-red-500">
                    Category: Student
                  </span>
                )}
              </p>
              <p>
                <span className="font-bold">Name: </span> {userInfo.name}
              </p>
              <p>
                <span className="font-bold">Email: </span> {userInfo.email}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="border rounded-md bg-white p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">My Cource:</h2>
            <div className="grid grid-cols-2 gap-4 overflow-auto max-h-[500px]">
              {mycourses.map((course) => (
                <div
                  onClick={() => {
                    navigate("/myCourse");
                  }}
                  key={course._id}
                  className="border rounded-md overflow-hidden h-52"
                >
                  <video controls className="w-full h-40 object-cover">
                    <source src={course.courseUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {
            <div>
              <div className="border rounded-md bg-white p-6 mb-6">
                <h2 className="text-lg font-bold mb-4">My Purchases:</h2>

                <table className="w-full">
                  <th className=" flex justify-between w-full">
                    <td>Course Title</td>
                    {/* <td>Date</td> */}
                    <td>Type</td>
                    <td>Details</td>
                    <td>Refund</td>
                  </th>
                  {transactions.length > 0 &&
                    transactions.map((txn) => {
                      return (
                        <tr className="w-full justify-between flex">
                          <td>{txn.courseTitle}</td>
                          {/* <td>{txn.createdAt}</td> */}
                          <td>{txn.hash.length == 0 ? "INR" : "Crypto"}</td>
                          <td>
                            <button
                              onClick={() => {
                                handleDetailsModal(txn);
                              }}
                            >
                              Details
                            </button>
                          </td>
                          <td>
                            <button
                              disabled={
                                txn.hash.length == 0 ||
                                isRefundDisabled(txn.createdAt)
                              }
                              onClick={() => {
                                handleRefundModal(txn);
                              }}
                            >
                              Refund
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>
          }
        </div>
        {detailsModal && (
          <>
            <div
              className="fixed inset-0 z-20 bg-black opacity-80"
              onClick={() => {
                console.log("modal close click");
                setDetailsModal(false);
              }}
            ></div>
            <div className="fixed z-30 flex justify-center w-full">
              <div className="bg-white w-[] text-black">hello</div>
            </div>
          </>
        )}
        {refundModal && (
          <>
            <div
              className="fixed inset-0 z-20 bg-black opacity-80"
              onClick={() => {
                console.log("modal close click");
                setRefundModal(false);
              }}
            ></div>
            <div className="fixed z-30 flex justify-center w-full">
              <div className="bg-white w-[] text-black">hello</div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
