import axios from "axios";
import React, { useEffect, useState } from "react";
import Delete from "../../assets/logo/delete.png";
import NotVerified from "../../assets/logo/NotVerified.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllUser() {
  const [userData, setUserData] = useState([]);
  const [change, setChange] = useState(true);
  const notify1 = (msg) => toast.success(msg);
  const notify4 = (msg) => toast.error(msg);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/getallUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    console.log(id);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8080/deletUser", {id},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChange(!change);
      notify1(response.data.meassage)
    } catch (error) {
      console.error("Error fetching user data:", error);
      notify4(response.data.error)
    }
  };

  useEffect(() => {
    fetchUserData();
    console.log(change);
  }, [change]);

  return (
    <div className="container">
      <div className=" w-[80%] mx-auto mt-8 ">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Created</th>
              <th className="border border-gray-300 px-4 py-2">Verified</th>
              <th className="border border-gray-300 px-4 py-2 cursor-cell">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300  px-4 py-2">
                  {user.verified ? (
                    <span class="material-symbols-outlined cursor-pointer text-green-700 ">
                      verified_user
                    </span>
                  ) : (
                    <img className="h-5 " src={NotVerified} alt="Not" />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                  onClick={(e)=>handleDelete(e, user._id)}
                    src={Delete}
                    className="h-9 w-6 mx-auto cursor-pointer"
                    alt="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUser;
