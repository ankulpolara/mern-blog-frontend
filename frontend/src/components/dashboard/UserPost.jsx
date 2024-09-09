import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiousConfig";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import timeDifference from "../../config/TimeDifferent";
import { BiLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { axiosWithoutToast } from "../../config/axiosWithoutToast";

const UserPost = () => {
  const userId = useSelector((state) => state?.auth.user?._id);
  const isDarkMode = useSelector((state) => state?.theme?.isDarkMode);
  const [blogs, setblogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let response;
    const fetchPost = async () => {
      response = await axiosInstance(
        `/user/posts/${userId}`,
        "get",
        {},
        "fetch post"
      );
      console.log(response);
      setblogs(response?.data);
    };
    fetchPost();
  }, []);

  return (
    <div className="w-4/5 mx-auto my-12">
      {blogs && (
        <h1 className="mb-10 text-3xl">
          Your All Post : {"("}
          {blogs?.length}
          {")"}
        </h1>
      )}
      {blogs ? (
        <div className="flex flex-col gap-5 h-auto hover:cursor-pointercre">
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
                className="p-2 md:p-4 gap-3 w-full flex max-h-[200px] border-[0.1px] border-gray-500 rounded-lg shadow-md shadow-[#1111112a] relative"
              >
                {blog?.author?._id === userId && (
                  <div
                    className={`absolute -top-2.5 -left-2.5  flex gap-2.5 p-0.5 px-1  rounded-full hover:cursor-pointer   ${
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
                    <MdDelete
                      className="text-red-500 text-lg"
                      onClick={async (e) => {
                        e.stopPropagation();
                        let toastId = toast.loading("deleting");
                        try {
                          const response = await axiosWithoutToast(
                            `posts/${blog?._id}`,
                            "delete"
                          );
                          console.log(response);
                          let newblogs = blogs.filter(
                            (single) => single?._id !== blog?._id
                          );
                          setblogs(newblogs);

                          toast.update(toastId, {
                            render: "post deleted", // New message
                            type: "success", // Success type
                            isLoading: false, // Stop loading spinner
                            autoClose: 2000, // Duration to auto-close
                          });
                        } catch (error) {
                          toast.update(toastId, {
                            render: error, // New message
                            type: "error", // Success type
                            isLoading: false, // Stop loading spinner
                            autoClose: 2000, // Duration to auto-close
                          });
                        }
                      }}
                    />
                  </div>
                )}

                <section className="w-[80%] flex flex-col">
                  <div className=" hidden md:flex gap-3">
                    <img
                      src={blog.author.ImageURL}
                      alt=""
                      className="md:w-10 md:h-10 w-7 h-7 rounded-full border-[1px] border-gray-400 p-[1px] object-cover"
                    />
                    <div className="font-semibold text-sm md:text-md">
                      {blog?.author?.userName} {"   "}
                      {blog?.author?.email}
                      <span
                        className="ml-3 text-xs p-1 text-blue-500 hover:cursor-pointer"
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   dispatch(categoryChangeHandler(blogs?.category));
                        // }}
                      >
                        {"#"}
                        {blog?.category}
                      </span>
                      <div className="text-xs opacity-70 flex w-[45%] ">
                        <p>{timeDifference(blog?.publishedAt)}</p>
                        <div
                          //   onClick={toggleLikeHandler}
                          className="text-xs flex my-auto ml-auto mr-4"
                        >
                          <BiLike className="my-auto text-xs" />
                          {blog?.likesCount}
                        </div>
                        <div className="my-auto ">
                          <FaComment />
                        </div>
                        <div className="my-auto">{blog?.comments?.length}</div>
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
                <div className="w-[50px] md:w-[22%] h-full flex items-center">
                  <img
                    className="rounded-lg h-[70px] object-cover my-auto"
                    src={blog?.blogImage}
                    alt="blogs-image"
                  />
                </div>
              </section>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-lg  md:text-[35px] font-bold text-center">
          {" "}
          You haven't write blog{" "}
        </div>
      )}
    </div>
  );
};

export default UserPost;
