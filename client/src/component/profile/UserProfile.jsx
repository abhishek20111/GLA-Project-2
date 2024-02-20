import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [courses, setCourses] = useState([]);
  const [mycourses, setMyCourses] = useState([]);

  const detail = useSelector((state) => state.userData);
  useEffect(() => setUserInfo(detail), []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:8080/getMyCourses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const fetchMyData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/getCourses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.courses);
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchMyData();
    console.log(mycourses);
  }, []);

  return (
    <div className="bg-blue-100">
      <main className=" mx-auto py-8 md:px-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-md bg-white md:p-6 p-3 md:mb-6 mb-3 h-full">
          <h2 className="text-lg font-bold mb-4">Profile</h2>
          <div className="border rounded-md p-4 mb-4">
            <div className="flex justify-center">
              <div className="md:w-1/2 border-2 rounded-xl">
                <img
                  src={`https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png`}
                  alt="User Profile"
                  className=" object-cover rounded-full"
                />
              </div>
            </div>
            <div className="p-4 flex flex-col items-center">
              <p>
                <span className="font-bold">Username: </span>{" "}
                {userInfo.username}
              </p>
              <p>
                <span className="font-bold"></span> {userInfo.email}
              </p>
              <p>
                <span className="font-bold">Name: </span> {userInfo.name}
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
