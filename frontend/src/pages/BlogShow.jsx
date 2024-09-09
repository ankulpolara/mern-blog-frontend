import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setLoading, setSuccess } from "../redux/slices/postSlice";
import { axiosInstance } from "../config/axiousConfig";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import CommentSection from "../components/BlogShow/CommentSection";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const BlogShow = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const dispatch = useDispatch();
  const [Blog, setBlog] = useState([]);
  const [liked, setLiked] = useState(false);
  const [isCommmet, setIsComment] = useState(false);
  const status = useSelector((state) => state.posts.status);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.auth.user?._id);

  useEffect(() => {
    async function fetchData() {
      dispatch(setLoading());
      try {
        const singleBlog = await axiosInstance(`/posts/${id}`, "get");
        setBlog(singleBlog);
        if (singleBlog.likes.includes(userId)) setLiked(true);
        dispatch(setSuccess());
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [dispatch, id]);

  console.log(Blog);

  const sectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  const sectionVariantsRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const toggleLikeHandler = async () => {
    if (!userId) {
      toast.warn("please login or create Account for more activity");
      navigate("/register");
      return;
    }
    setLiked(!liked);
    const response = await axiosInstance(
      `/post/${id}/${liked ? "dislike" : "like"}`,
      "post"
    );
    if (response.success) {
      // console.log(response);
      console.log(response);

      setBlog({ ...Blog, likesCount: response?.data?.likesCount });
    }
  };

  if (status === "loading") {
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

  if (Blog) {
    return (
      <div
        className="w-screen h-fit  min-h-screen relative"
        // style={{ msOverflowStyle: "none", scrollbarWidth: "3px" }}
      >
        <div className="w-[99%] sm:w-[94%] md:w-[65%] xl:w-[58%] mx-auto p-3 py-6 my-8 flex flex-col gap-4">
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-bold text-4xl">{Blog?.title}</h1>
          </motion.section>
          <motion.section
            variants={sectionVariantsRight}
            initial="hidden"
            animate="visible"
          >
            <p className="opacity-60">{Blog?.description}</p>
          </motion.section>
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-5"
          >
            <img
              src={Blog?.author?.ImageURL}
              alt=""
              className="w-14 h-14 rounded-full border-[1px] border-gray-400 p-[2px] object-cover"
            />
            <div className="font-semibold my-auto flex flex-col">
              <Link
                to={`/view-profile/${Blog?.author?._id}`}
                className="hover:text-blue-400"
              >
                {Blog?.author?.userName}
              </Link>
              <p className="text-blue-500 hover:text-blue-700 font-light">
                {Blog?.author?.email}
              </p>
            </div>
          </motion.section>
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="border-y-[0.1px] mt-2 border-gray-400 p-2 flex-row flex gap-9 select-none"
          >
            <div
              onClick={toggleLikeHandler}
              className="text-xl flex gap-3 my-auto"
            >
              {liked ? (
                <BiSolidLike className="text-purple-700 my-auto text-2xl" />
              ) : (
                <BiLike className="my-auto text-2xl" />
              )}
              {Blog?.likesCount}
            </div>
            <div
              className="flex gap-3 text-xl hover:cursor-pointer"
              onClick={() => {
                if (!userId) {
                  toast.warn(
                    "please Login or Create Account for more activity"
                  );
                  navigate("/register");
                  return;
                }

                setIsComment(!isCommmet);
              }}
            >
              <div className="my-auto ">
                <FaComment />
              </div>
              <div>{Blog?.comments?.length}</div>
            </div>
          </motion.section>
          <motion.section
            variants={sectionVariantsRight}
            initial="hidden"
            animate="visible"
            className="mt-1"
          >
            <img src={Blog?.blogImage} alt="Blog-Image" />
          </motion.section>
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-end text-sm mt-3 opacity-75"
          >
            <div>{formatDate(Blog?.publishedAt)}</div>
            <div>{formateTime(Blog?.publishedAt)}</div>
          </motion.section>
          <motion.section
            variants={sectionVariantsRight}
            initial="hidden"
            animate="visible"
          >
            <div
              className="text-xl leading-10 opacity-90"
              dangerouslySetInnerHTML={{ __html: Blog?.content }}
            ></div>
          </motion.section>
        </div>

        <div
          className={`fixed top-16 p-4    rounded-lg shadow-md shadow-gray-600 right-0 w-[90%] md:w-[26%]   min-h-screen transform duration-500  ${
            isCommmet ? "opacity-100 " : "translate-x-80 opacity-0 duration-500"
          } ${
            isDarkMode
              ? "bg-[#333232] text-gray-100"
              : "min-h-screen bg-gray-200 text-gray-800"
          }`}
        >
          <p
            className="font-bold text-2xl flex  justify-between items-start"
            onClick={() => setIsComment(false)}
          >
            <IoCloseSharp className="text-3xl hover:cursor-pointer" />
            <p>Responses : ( {Blog?.comments?.length} )</p>
          </p>
          <CommentSection blogId={id} setBlog={setBlog} />
        </div>
      </div>
    );
  }
};

export default BlogShow;
