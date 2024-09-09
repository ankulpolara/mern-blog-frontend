// src/components/Home.js
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import AllBlog from "../components/Home/AllBlog";
import { useDispatch, useSelector } from "react-redux";
import { categoryChangeHandler, setPage, setQuery } from "../redux/slices/blog";

export const Home = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state?.theme?.isDarkMode);
  const selectedCategory = useSelector((state) => state.blog.selectedCategory);
  const [selected, setSelected] = useState(selectedCategory);
  // console.log(process.env.REACT_APP_PRESET_KEY, process.env.REACT_APP_CLOUD_NAME);
  useEffect(() => {
    setSelected(selectedCategory);
  }, [selectedCategory]);

  const categories = [
    "All",
    "Religious",
    "Technology",
    "Health",
    "Lifestyle",
    "Education",
    "Finance",
  ];

  return (
    <div className="container mx-auto">
      <div className="container w-full min-h  -screen flex">
        <div className="sm:w-[80%] md:w-[70%] w-full border-r-[1px] border-gray-400">
          <AllBlog />
        </div>
        <div className="right-part mt-10   w-0 sm:w-[20%] md:w-[30%]  hidden sm:block h-[70vh]  overflow-y-hidden p-7">
          <h2 className="mb-10 font-bold text-2xl">Choose category </h2>
          <div className="w-[90%] select-none h-1/3  bg-green flex flex-wrap  gap-4 ">
            {categories.map((ele, index) => (
              <div
                className={`${
                  isDarkMode
                    ? selected === ele
                      ? " bg-gray-400 text-white"
                      : " bg-gray-800 "
                    : "bg-gray-300"
                }    ${
                  selected === ele ? " bg-gray-400 text-white" : ""
                }  w-fit h-fit rounded-lg px-4 sm:px-6 select-none py-2.5  sm:py-4 hover:cursor-pointer`}
                key={index}
                onClick={() => {
                  setSelected(ele);
                  dispatch(setPage(1));
                  dispatch(setQuery(""));
                  dispatch(categoryChangeHandler(ele));
                }}
              >
                {ele}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
