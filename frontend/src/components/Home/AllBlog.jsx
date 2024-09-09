import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiousConfig";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSuccess } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import timeDifference from "../../config/TimeDifferent";
import { FiEdit } from "react-icons/fi";


import {
  categoryChangeHandler,
  setPage,
  setQuery,
  setTotalPage,
} from "../../redux/slices/blog";
import { axiosWithoutToast } from "../../config/axiosWithoutToast";


const AllBlog = () => {
  // const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.status);
  const selectedCategory = useSelector((state) => state.blog?.selectedCategory);
  let query = useSelector((state) => state.blog?.query);
  const isDarkMode = useSelector((state) => state?.theme?.isDarkMode);
  const page = useSelector((state) => state.blog?.page);
  const totalPage = useSelector((state) => state.blog?.totalPage);
  const userId = useSelector((state) => state.auth.user?._id);
  console.log(userId);

  const navigate = useNavigate();

  const [search, setSearch] = useState(false);
  useEffect(() => {
    async function fetchData() {
      dispatch(setLoading());
      setLoadingMore(true);

      try {
        let response;

        if (query) {
          // Fetch posts based on search query
          response = await axiosWithoutToast(
            `/search?search=${query}&category=${selectedCategory}&page=${page}&limit=4`,
            "get"
          );
        } else {
          // Fetch posts based on category
          if (selectedCategory === "All") {
            response = await axiosWithoutToast(
              `/fresh-posts?page=${page}&limit=4`,
              "get"
            );
          } else {
            response = await axiosWithoutToast(
              `/posts/category/${selectedCategory}/?page=${page}&limit=4`,
              "get"
            );
          }
        }

        const { data, totalPages } = response || {};

        if (data) {
          if (page === 1) {
            setBlogs(data);
          } else {
            setBlogs((prevBlogs) => [...prevBlogs, ...data]);
          }
          dispatch(setTotalPage(totalPages));
        }
        dispatch(setSuccess());
      } catch (error) {
        console.error(error);
      }
      setLoadingMore(false);
    }

    fetchData();
  }, [page, selectedCategory, search]);

  const handleSearch = () => {
    dispatch(categoryChangeHandler(selectedCategory));
    dispatch(setPage(1)); // Reset to the first page for new search
    setSearch(!search);
  };
  // console.log(blogs);

  const handleLoadMore = () => {
    if (page < totalPage) {
      dispatch(setPage(page + 1)); // Increment page number
    }
  };

  if (status === "loading" || loadingMore) {
    return (
      <div className="select-none w-full min-h-screen flex justify-center items-center">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 relative">
      <div className="flex relative mb-7">
        <h2 className="font-extrabold text-xl md:text-4xl">All Blogs</h2>
        <div className="absolute right-0 md:left-[50%] top-2 transform md:-translate-x-[50%] w-[60%] md:w-[39%] flex gap-2">
          <input
            type="text"
            placeholder="Hit Enter For Search ...."
            value={query}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            className={`w-full rounded-lg text-[9px] md:text-[17px] py-0 md:py-1 h-fit ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
            }`}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-[1px] text-xs md:text-lg md:py-1 rounded-lg bg-blue-500 text-white"
          >
            Search
          </button>
        </div>
      </div>
      <div>
        {blogs.length ? (
          <div className="flex flex-col gap-3 h-auto">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <section
                  // to={`/blog/${blog._id}`}
                  onClick={() => navigate(`/blog/${blog._id}`)}
                  className="p-4 gap-3 w-full flex max-h-[200px] border-[0.1px] border-gray-500 rounded-lg shadow-md shadow-[#1111112a] relative"
                >
                  {blog?.author?._id === userId && (
                    <div
                      className={`absolute -top-2.5 -left-2.5  flex gap-2 p-0.5 px-1  rounded-full hover:cursor-pointer   ${
                        isDarkMode ? "bg-gray-500" : "bg-gray-300"
                      } `}
                    >
                      <FiEdit
                        className="text-md opacity-85"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("edit clock");

                          navigate(
                            `/post/create?postId=${blog?._id}&update=true`
                          );
                        }}
                      />
                      {/* <MdDelete
                        className="text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          let toastId = toast.loading("deleting");
                          toast.update(toastId, {
                            render: "done", // New message
                            type: 'success', // Success type
                            isLoading: false, // Stop loading spinner
                            autoClose: 2000, // Duration to auto-close
                          });
                       
                        }}
                      /> */}
                    </div>
                  )}
                  <section className="w-[80%] flex flex-col">
                    <div className="flex gap-3">
                      <img
                        src={blog?.author?.ImageURL}
                        alt=""
                        className="md:w-10 md:h-10 w-7 h-7 rounded-full border-[1px] border-gray-400 p-[1px] object-cover"
                      />
                      <div className="font-semibold text-xs md:text-sm md:text-md">
                        {blog?.author?.userName} {"   "}
                        {blog?.author?.email}
                        <span
                          className="md:ml-3 ml-1 text-xs p-1 text-blue-500 hover:cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(categoryChangeHandler(blog?.category));
                          }}
                        >
                          {"#"}
                          {blog?.category}
                        </span>
                        <div className="text-xs opacity-70">
                          {timeDifference(blog?.publishedAt)}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semi mb-1 mt-2 md:mt-3 bold text-md md:text-2xl">
                        {blog?.title}
                      </h3>
                      <p className="font-light leading-6 mt-2 text-xs md:text-[16px]">
                        {blog?.description?.slice(0, 150)}
                        {"....."}
                      </p>
                    </div>
                  </section>
                  <div className="w-[27%] md:w-[22%] h-full flex items-center mt-4">
                    <img
                      className="rounded-lg my-auto"
                      src={blog?.blogImage}
                      alt="blog-image"
                    />
                  </div>
                </section>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-[29px] font-bold text-center">No Blog Found</div>
        )}
        {page < totalPage && (
          <button
            onClick={handleLoadMore}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            {loadingMore ? "Loading..." : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AllBlog;
