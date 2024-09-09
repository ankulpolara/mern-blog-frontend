import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosWithoutToast } from "../../config/axiosWithoutToast";
import { setLoading, setSuccess } from "../../redux/slices/postSlice";
import timeDifference from "../../config/TimeDifferent";
import { IoBagHandle } from "react-icons/io5";
import { axiosInstance } from "../../config/axiousConfig";
import { set } from "mongoose";
import { Link, Navigate } from "react-router-dom";

const CommentSection = ({ blogId, setBlog }) => {
  console.log(blogId);

  const status = useSelector((state) => state.posts.status);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();

  //   commentvalue state
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [getComment, setGetComment] = useState(false);
  const [AllComeent, setAllComment] = useState([]);
  const [isHalfSTR, setIsHalfSTR] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const comments = await axiosWithoutToast(
          `/post/${blogId}/comments`,
          "get"
        );
        setAllComment(comments);
        console.log(comments);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [dispatch, blogId, getComment]);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
  }, [value]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!value) {
      toast.error("please Enter comment");
    }

    const response = await axiosWithoutToast(`post/${blogId}/comment`, "post", {
      content: value,
    });
    console.log(response);
    if (response.success == true) {
      setBlog(response?.post);
      setValue("");
      setGetComment(!getComment);
    }
  };

  const deleteCommentHandler = async (id) => {
    console.log("delete call", id);
    const response = await axiosInstance(`comments/${id}`, "delete");
    if (response.success) {
      const newComment = AllComeent.filter((ele) => ele._id !== id);
      setAllComment(newComment);
    }
  };

  //   const formateTime = (dateString) => {
  //     const date = new Date(dateString);
  //     return date.toLocaleString("en-IN", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit",
  //     });
  //   };

  return (
    <div
      className="w-full flex   flex-col items-center mt-5  max-h-[79vh]  overflow-y-auto "
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* form  */}
      <div
        className={`shadow-lg rounded-lg shadow-gray-600 w-[98%] min-h-fit ${
          isDarkMode ? "bg-[#262525] text-gray-100" : "shadow-sm"
        } p-3 `}
      >
        <section className="flex gap-4">
          <img
            src={user?.ImageURL}
            alt=""
            className="w-9 h-9 p-[1.5px] border-[1px] object-cover my-auto rounded-full"
          />
          <p className="my-auto">{user?.userName}</p>
        </section>
        <section className="mt-2">
          <textarea
            ref={textareaRef}
            value={value}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent default form submission
                handleSubmit(e);
              }
            }}
            onChange={(e) => setValue(e.target.value)}
            className={`w-full p-2 mt-2 ${
              isDarkMode
                ? "bg-[#262525] text-gray-100"
                : "bg-gray-200 text-gray-800"
            } border border-gray-300 rounded-md resize-none focus:outline-none`}
            placeholder="Enter your comment here..."
            rows={4}
          />
          <div className=" flex items-end">
            <button
              type="submit"
              onClick={handleSubmit}
              className="ml-full px-3 py-1.5 mt-3 mb-1   bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200   "
            >
              Submit Comment
            </button>
          </div>
        </section>
      </div>

      {/* now all coment show  */}
      <section className="mt-10 w-full ">
        {loading ? (
          <div className="select-none w-full h-full flex justify-center items-center mt-10">
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-14 h-14 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            {AllComeent && AllComeent.length > 0 ? (
              AllComeent.map((comment, index) => (
                <div
                  key={comment._id}
                  className="flex gap-4 flex-col w-full min-h-[100px] h-fit border-b-[0.2px] border-gray-400 pb-3   mb-2"
                >
                  <div className="flex  gap-4 w-full pl-1  h-fit relative   ">
                    <img
                      src={comment?.author?.ImageURL}
                      alt=""
                      className="w-9 h-9 p-[1.5px] border-[1px] object-cover my-auto  rounded-full"
                    />
                    <div>
                      <p className="my-auto">
                        <Link to={`/view-profile/${comment?.author?._id}`}>
                          {comment?.author?.userName}
                        </Link>
                      </p>
                      <p className="my-auto  font-light text-[12px]">
                        {timeDifference(comment?.createdAt)}
                      </p>
                    </div>
                    {comment?.author?.email === user?.email && (
                      <div
                        className="absolute top-0 right-0 text-sm text-red-500 hover:cursor-pointer "
                        onClick={() => deleteCommentHandler(comment?._id)}
                      >
                        Delete
                      </div>
                    )}
                  </div>
                  <div>
                    {isHalfSTR == comment?._id
                      ? comment?.content
                      : comment?.content?.slice(0, 70)}
                    <span
                      className="text-blue-400 hover:text-blue-600 hover:cursor-pointer"
                      onClick={() =>
                        isHalfSTR == comment._id
                          ? setIsHalfSTR("")
                          : setIsHalfSTR(comment?._id)
                      }
                    >
                      {comment.length > 70
                        ? isHalfSTR !== comment?._id
                          ? "... read more"
                          : "Less"
                        : ""}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div>No comment</div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default CommentSection;
