import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { togglePopUp } from "../redux/slices/authSlice";

export const PopUp = ({
  heading,
  text,
  btn1Text,
  btn2Text,
  handler1,
  handler2,
}) => {
  const isDarkMode = useSelector((state) => state?.theme?.isDarkMode);
  // const dispatch = useDispatch();
  console.log("click");

  const isPopUpOpen = useSelector((state) => state?.auth?.isPopUpOpen);
  //   console.log(isPopUpOpen);
  useEffect(() => {
    if (isPopUpOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.scrollBehavior = "block";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isPopUpOpen]);
  return (
    <div
      className={`min-h-fit w-[70%] sm:w-[50%] md:w-[30%] fixed top-[45%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-20 rounded-lg shadow-xl shadow-[#3b3a3a95] p-3 transition-all duration-700 ease-in-out  ${
        isDarkMode ? "bg-gray-300 text-gray-800" : "bg-gray-600 text-gray-200"
      } ${
        isPopUpOpen ? "animate-popup  brightness-125 " : " scale-0 opacity-0"
      }`}
    >
      <div className="w-full h-full relative">
        <div
          className="absolute -top-1 right-0 hover:cursor-pointer"
          onClick={() => handler1()}
        >
          <IoCloseSharp className="text-[22px]" />
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-xl font-bold mb-4">{heading}</h2>
          <p className="mb-4">{text}</p>
          <div className="flex  space-x-5 mt-5">
            <button
              onClick={handler1}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300"
            >
              {btn1Text}
            </button>
            <button
              onClick={handler2}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700 transition-colors duration-300"
            >
              {btn2Text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
