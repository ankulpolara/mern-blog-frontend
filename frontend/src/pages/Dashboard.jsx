import Footer from "../components/Footer";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";

import {
  togglePopUp,
  setPopupType,
  logout,
  deleteAccount,
} from "../redux/slices/authSlice";

import { PopUp } from "../components/PopUp";
import { Outlet, useNavigate } from "react-router-dom";

import { axiosInstance } from "../config/axiousConfig";
import { toast } from "react-toastify";

// import { toast } from "react-toastify";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [CurrentTab, setCurrentTab] = useState("Profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let Links = [
    {
      id: 0,
      name: "Profile",
      link: "/dashboard/profile",
    },
    {
      id: 1,
      name: "Post",
      link: "/dashboard/user-all-post",
    },
    {
      id: 2,
      name: "Logout",
      link: "/",
    },
    {
      id: 3,
      name: "Delete Account",
      link: "/register",
    },
  ];

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isPopUpOpen = useSelector((state) => state.auth.isPopUpOpen);
  const popupType = useSelector((state) => state.auth.popupType);
  const userId = useSelector((state) => state?.auth.user?._id);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handlePopup = (type) => {
    dispatch(setPopupType(type));
    dispatch(togglePopUp());
  };

  const deleteHandler = async () => {
    let deletedUser = await axiosInstance(`/delete-user/${userId}`, "delete");

    if (deletedUser?.success === true) {
      let massage = deletedUser?.user?.userName + " deleted successfully";
      toast.success(massage);
    }
    console.log(deletedUser);
    dispatch(deleteAccount({ navigate }));
    dispatch(togglePopUp());
  };

  return (
      // ${isPopUpOpen ? "overflow-y-hidden": "overflow-y-auto"}
    <div
      className={`relative w-screen flex h-auto 
      
        `}
    >
      {/* Sidebar */}
      <div
        className={`fixed pt-[12%] xl:pt-[6%] top-[0%] left-0 z-5 transition-transform transform h-screen border-r-[1px] md:border-r-[2px] shadow-md shadow-gray-500
          ${isOpen ? "translate-x-0" : "-translate-x-full"} ${
          isDarkMode ? "border-gray-400" : "border-gray-400"
        } w-fit h-full px-0 sm:px-4 md:px-12`}
      >
        <div className="flex flex-col items-start p-4">
          <button
            className="absolute top-[6.5%] md:top-[10%] right-1"
            onClick={handleToggle}
          >
            <IoCloseSharp className="text-[15px] md:text-[22px]" />
          </button>
          {Links.map((ele) => (
            <div key={ele.id}>
              <button
                className={`mt-5 text-[11px] sm:text-[13px] md:text-lg hover:text-purple-400 ${
                  ele.name === CurrentTab && "text-purple-400 font-semibold "
                } ${ele.name === "Delete Account" && "text-red-500"}`}
                onClick={() => {
                  if (ele.name === "Logout") {
                    handlePopup("logout");
                  } else if (ele.name === "Delete Account") {
                    handlePopup("delete");
                  } else if (ele.name === "Post") {
                    navigate(ele.link);
                  } else if (ele.name === "Profile") {
                    navigate(ele.link);
                  }
                  setCurrentTab(ele.name);
                }}
              >
                {ele.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all h-screen ${
          isOpen ? "ml-28 sm:ml-[10rem]  md:ml-72 xl:ml-38" : "ml-0"
        } `}
      >
        {!isOpen && (
          <button
            className="fixed top-10 md:top-8 z-20 left-4"
            onClick={handleToggle}
          >
            <svg
              className="xl:w-6 xl:h-6 h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        )}

        {/* Popups */}
        {isPopUpOpen && popupType === "logout" && (
          <PopUp
            heading={"Are you sure ?"}
            text={
              "This action will log you out from your device. Next time you have to login. Press confirm button to logout."
            }
            btn1Text={"Cancel"}
            btn2Text={"Confirm"}
            handler1={() => dispatch(togglePopUp())}
            handler2={() => {
              dispatch(logout({ navigate }));
              dispatch(togglePopUp());
            }}
          />
        )}

        {isPopUpOpen && popupType === "delete" && (
          <PopUp
            heading={"!!! Sure Delete ?"}
            text={
              "This action will delete all your information from our database. Next time you have to register. Press delete button to delete account."
            }
            btn1Text={"Cancel"}
            btn2Text={"Delete"}
            handler1={() => dispatch(togglePopUp())}
            handler2={() => deleteHandler()}
          />
        )}

        <div className="min-w-full">
          {/* <Profile /> */}
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
