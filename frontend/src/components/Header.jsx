import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Divider from "@mui/material/Divider";
import { IoMenu } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { GrProjects } from "react-icons/gr";
// import { IoSearchOutline } from "react-icons/io5";

import { FaRegRegistered } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { IoMdLogIn } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";

import { toggleTheme } from "../redux/slices/themeSLice";

export const Header = () => {
  let location = useLocation();
  let route = location?.pathname;
  let currentRoute = route.split("/").join("");
  console.log(currentRoute);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userData = useSelector((state) => state.auth);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useSelector((state) => state.auth.user);
  let isDarkMode = useSelector((state) => state?.theme?.isDarkMode);

  return (
    <div
      className={`${
        isDarkMode ? "border-gray-400 bg-gray-800" : " border-gray-400 bg-white"
      } py-3 border-b-[1.5px] shadow-md shadow-[#85808060] flex  justify-around  w-screen max-h-fit fixed  top-0 left-0 z-10 mb-44 `}
    >
      <Link
        to={"/"}
        className="flex gap-2 my-auto items-end justify-center W-[10%] md:w-auto text-[9px] md:text-sm"
      >
        <p className=" font-extrabold"> Polara's </p>
        <span className=" font-mono px-1 md:px-3 py-0.5 rounded-lg  b bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  text-center my-auto text-[9px] md:text-sm">
          Blog
        </span>
      </Link>

      {/* search bar  */}

      {/* <input
        type="text"
        placeholder="Search ...."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`w-[32%] md:w-[19%] rounded-lg text-[9px] md:text-[17px] py-0 md:py-1 ${
          isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
        }`}
      ></input> */}

      {/* nav bar links   */}

      <ul className=" list-none md:flex gap-1  my-auto hidden ">
        <li
          className={`${
            currentRoute == "" ? "opacity-100 text-purple-500" : "opacity-70"
          } font-bold hover:opacity-100 px-5`}
        >
          <Link to={"/"}> Home</Link>
        </li>
        <li
          className={`${
            currentRoute == "about"
              ? "opacity-100 text-purple-500"
              : "opacity-70"
          } font-bold hover:opacity-100 px-5`}
        >
          <Link to={"/about"}> about</Link>
        </li>
        {isAuth && (
          <li
            className={`${
              currentRoute == "dashboardprofile"
                ? "opacity-100 text-purple-500"
                : "opacity-70"
            } font-bold hover:opacity-100 px-5`}
          >
            <Link to={"/dashboard"}> Dashboard</Link>
          </li>
        )}
      </ul>

      {/* last part  */}
      <div className=" gap-4  hidden md:flex ">
        {userData.isLoggedIn === true ? (
          <div className="flex  gap-2 ">
            <Link
              to={"/post/create"}
              className="flex items-center gap-1 mr-5  "
            >
              <p
                src={
                  user?.ImageURL
                    ? user?.ImageURL
                    : `https://ui-avatars.com/api/?name=${user?.userName}&size=128&background=random&color=fff`
                }
                className={`${
                  currentRoute == "postcreate"
                    ? "opacity-100 text-purple-500"
                    : ""
                } font-bold hover:opacity-100 `}
              >
                {" "}
                Write
              </p>
              <TfiWrite />
            </Link>
            <div
              className="flex justify-center items-center p-1.5 bg-[#b2b1b152] rounded-lg hover:cursor-pointer"
              onClick={() => dispatch(toggleTheme())}
            >
              {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
            </div>
            <img
              src={
                user?.ImageURL
                  ? user?.ImageURL
                  : `https://ui-avatars.com/api/?name=${user?.userName}&size=128&background=random&color=fff`
              }
              alt="profile_pic"
              className="rounded-[110%] border-2 w-8 h-8 p-[1px]  object-cover hover:cursor-pointer select-none"
              onClick={() => navigate("/dashboard?tab=profile")}
            ></img>

            <button
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
              className=" text-[9px] md:text-sm px-3 py-1.5 rounded-lg my-auto bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white select-none"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className=" gap-2 hidden sm:flex ">
            <div
              className="flex justify-center items-center p-1.5 bg-[#b2b1b152] rounded-lg hover:cursor-pointer"
              onClick={() => dispatch(toggleTheme())}
            >
              {isDarkMode ? <MdOutlineDarkMode /> : <MdDarkMode />}
            </div>
            <Link
              to={"/sign-in"}
              className=" text-[9px] md:text-sm px-3 py-1.5 rounded-lg my-auto bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white"
            >
              Sign In
            </Link>

            <Link
              to={"/register"}
              className=" text-[9px] md:text-sm px-3 py-1.5 rounded-lg my-auto bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* menu in min screen  */}
      <div className="md:hidden flex gap-2">
        <div
          className="flex justify-center items-center p-1.5 bg-[#b2b1b152] rounded-lg hover:cursor-pointer"
          onClick={() => dispatch(toggleTheme())}
        >
          {isDarkMode ? <MdOutlineDarkMode /> : <MdDarkMode />}
        </div>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={
            <IoMenu className="text-[6px] w-3 h-3 text-center mx-auto" />
          }
          sx={{
            minWidth: "fit-content", // Adjust width as needed
            fontSize: "9px", // Adjust font size as needed

            padding: "4px 7px", // Adjust padding as needed
          }}
        >
          Menu
        </Button>
        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className="text-purple-400 mt-4 px-3"
        >
          {!userData.isLoggedIn ? (
            <div className="text-purple-500">
              <MenuItem onClick={handleClose} disableRipple>
                <FaRegRegistered className="mr-2" />
                <Link to={"/register"}> Register</Link>
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <IoMdLogIn className="mr-2 text-[17px] text-purple-400" />
                <Link to={"/sign-in"}> Sign In</Link>
              </MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem onClick={handleClose} disableRipple>
                <img
                  // src={`https://ui-avatars.com/api/?name=${user?.userName}&size=128&background=random&color=fff`}
                  src={
                    user?.ImageURL
                      ? user.ImageURL
                      : `https://ui-avatars.com/api/?name=${user?.userName}&size=128&background=random&color=fff`
                  }
                  alt="profile_pic"
                  width={"18px"}
                  height={"18px"}
                  className="rounded-full mr-2"
                />

                <Link to={"/dashboard"}> Profile</Link>
              </MenuItem>

              <MenuItem
                onClick={handleClose}
                disableRipple
                className=" text-purple-500"
              >
                <FaRegRegistered className="mr-2 " />
                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Log Out
                </button>
              </MenuItem>
            </div>
          )}

          <Divider sx={{ my: 0.5 }} />
          <div className="  text-purple-500">
            <MenuItem onClick={handleClose} disableRipple>
              <Link to={"/post/create"} className="flex items-center gap-2  ">
                <TfiWrite />
                <p
                  src={
                    user?.ImageURL
                      ? user?.ImageURL
                      : `https://ui-avatars.com/api/?name=${user?.userName}&size=128&background=random&color=fff`
                  }
                  className={`${
                    currentRoute == "postcreate"
                      ? "opacity-100 text-purple-500"
                      : ""
                  } font-bold hover:opacity-100 `}
                >
                  {" "}
                  Write
                </p>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <FaHome className="mr-2" />
              <Link to={"/"}>Home</Link>
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <IoIosInformationCircle className="mr-2" />
              <Link to={"/about"}> About</Link>
            </MenuItem>

            <MenuItem onClick={handleClose} disableRipple>
              <GrProjects className="mr-2" />
              <Link to={"/dashboard"}>Dashboard</Link>
            </MenuItem>
          </div>
        </Menu>
      </div>
    </div>
  );
};
