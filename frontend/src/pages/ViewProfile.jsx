import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/axiousConfig";
import { axiosWithoutToast } from "../config/axiosWithoutToast";

const ViewProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data based on userName from API or other source
    const fetchUserData = async () => {
      try {
        const response = await axiosWithoutToast(`/users/${id}`, "get");
        console.log(response);

        setUser(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex justify-center items-center  p-4">
      <div className=" shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0">
            <img
              src={user.ImageURL}
              alt={`${user.userName}'s profile`}
              className="w-full h-80  md:w-72 object-cover"
            />
          </div>
          <div className="p-6 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{user.userName}</h1>
            <p className="text-gray-600 text-lg">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
