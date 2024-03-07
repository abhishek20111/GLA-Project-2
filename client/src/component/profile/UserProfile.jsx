import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadToCloudinary } from "../helper/upload";
import { updateprofileImage } from "../../store/UserSilce";

const Profile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [courses, setCourses] = useState([]);
  const [mycourses, setMyCourses] = useState([]);
  const [imageChange, setImageChange] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const dispacter = useDispatch();
  const profileImage = useSelector((state) => state.userData.profileImage);
  const emailUser = useSelector((state) => state.userData.email);

  const detail = useSelector((state) => state.userData);
  useEffect(() => setUserInfo(detail), []);

  

  const fetchData = async (email) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:8080/cource/getMyCourses", {email},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setMyCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const fetchMyData = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8080/cource/getCourses",{email} ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const handleImageChange = (e) => {
    setImageChange(e.target.files[0]);
  };

  const uploadImage = async () => {
    try {
      const { url } = await uploadToCloudinary(imageChange);
      console.log(url);
      setImageUrl(url)
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
      const response = await axios.put(`http://localhost:8080/updateProfileImage`, {imageUrl:url},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setImageChange('');
    }catch(err){
      console.log(err);
    }
  }


  const emailToGo = emailUser
  useEffect(() => {
    console.log(emailToGo);
    fetchMyData(emailToGo);
    fetchData(emailToGo);
    if (imageChange !== null) {
      uploadImage();
    }
    console.log(mycourses);
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
                  src={`${profileImage ? profileImage : "https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png"}`}
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
                {userInfo.role === "Super Admin" && <span className="font-semibold text-red-500">Category: {" "}Master</span>}
              </p>
              <p>
                {userInfo.role === "Admin" && <span className="font-semibold text-red-500">Category: {" "}Teacher</span>}
              </p>
              <p>
                {userInfo.role === "User" && <span className="font-semibold text-red-500">Category: {" "}Student</span>}
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
            <h2 className="text-lg font-bold mb-4">Courses:</h2>
            <div className="grid grid-cols-2 gap-4 overflow-auto max-h-[500px]">
              {mycourses.map((course) => (
                <div
                  key={course._id}
                  className="border rounded-md overflow-hidden h-52"
                >
                  <img
                    src={course.courseUrl}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
