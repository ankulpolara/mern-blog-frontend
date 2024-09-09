import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

import uploadToCloudinary from "../../utillity/uploadToCloudinary";
import { axiosInstance } from "../../config/axiousConfig";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { axiosWithoutToast } from "../../config/axiosWithoutToast";
// import { Query } from "mongoose";

const CreateForm = () => {
  let isDarkMode = useSelector((state) => state?.theme?.isDarkMode);
  let token = useSelector((state) => state?.auth?.token);
  let user = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  const isUpdate = searchParams.get("update");
  const [loading, setLoading] = useState(false);
  // if (!postId && isUpdate) {
  //   toast.warn(" please sure have valid postId");
  // }

  console.log(isUpdate, postId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    tags: "",
    category: "",
    blogImage: null,
  });
  let response;
  useEffect(() => {
    const fetchData = async () => {
      response = await axiosWithoutToast(`/posts/${postId}`, "get");
      if (response.success) {
        navigate("/");
      }
      console.log(response);
      setFormData({
        title: response?.title,
        description: response?.description,
        content: response?.content,
        author: response?.author?.userName,
        category: response?.category,
        blogImage: response?.blogImage,
      });
      setImagePreview(response?.blogImage);
      setTagList(response?.tags);

      if (response?.author?._id !== user._id) {
        console.log(response?.author?._id, user._id);
        toast.warn("You have not access of edit to this post");
        navigate("/");
      }
      setUploaded(true);
    };
    if (postId && isUpdate) {
      fetchData();
    }
  }, []);

  const [imagePreview, setImagePreview] = useState("");
  const [tagList, setTagList] = useState([]);
  const [imageLoad, setImageLoad] = useState(false);
  const [image, setImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const imageRef = useRef(null);
  const updateButtonRef = useRef(null);

  const categories = [
    "Technology",
    "Health",
    "Lifestyle",
    "Education",
    "Finance",
    "Religious",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    // console.log("image....", image);
    let toastId = toast.loading("Image Uploading...");
    setUploaded(true);
    setImageLoad(true);
    // const file = e?.target?.files[0];
    // setImagePreview(URL.createObjectURL(file));

    try {
      // const preset_key=process.env.PRESET_KEY          // "wkng3tdl";
      //   const cloudName=process.env.CLOUD_NAME
      //   console.log(preset_key ,cloudName);

      let response = await uploadToCloudinary(image);
      console.log(response, "response...");
      setFormData((prev) => ({
        ...prev,
        blogImage: response,
      }));
      toast.update(toastId, {
        render: "Image Upload successfully", // New message
        type: "success", // Success type
        isLoading: false, // Stop loading spinner
        autoClose: 2000, // Duration to auto-close
      });

      setImageLoad(false);
      setUploaded(true);
      // console.log(formData);
    } catch (error) {
      console.log(error);
      setImageLoad(false);
      setUploaded(false);
      toast.update(toastId, {
        render: error, // New message
        type: "error", // Success type
        isLoading: false, // Stop loading spinner
        autoClose: 2000, // Duration to auto-close
      });
    }
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content,
    });
  };

  const handleTagChange = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (!tagList.includes(newTag)) {
        setTagList([...tagList, newTag]);
        setFormData({
          ...formData,
          tags: "",
        });
      }
    }
  };

  const addTag = (e) => {
    e.preventDefault();
    const newTag = formData.tags.trim();
    if (!tagList.includes(newTag)) {
      setTagList([...tagList, newTag]);
      setFormData({
        ...formData,
        tags: "",
      });
    }
  };

  const handleTagRemove = (tag) => {
    setTagList(tagList.filter((t) => t !== tag));
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  //   HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!uploaded) {
      toast.warn("please upload image ...");
      return;
    }

    const { title, content, description, category } = formData;

    if (!title || !content || !description || !category) {
      toast.error("All fields are required.");
      return;
    }
    console.log(tagList.length);

    // if (tagList.length === 0) {
    //   toast.error("please add tag and hit Enter ");
    //   return;
    // }
    // now make backend call
    let res;
    if (postId && isUpdate) {
      console.log("update called......");

      res = await axiosInstance(
        `/post/update/${postId}"`,
        "post",
        { ...formData, tags: tagList },
        "post updated successfully..",
        token
      );
    } else {
      res = await axiosInstance(
        "/create-post",
        "post",
        { ...formData, tags: tagList },
        "post created..",
        token
      );
    }

    console.log(res);
    setFormData({
      title: "",
      description: "",
      content: "",
      author: "",
      tags: "",
      category: "",
      slug: "",
      blogImage: null,
    });
    setLoading(false);
    navigate("/");
    // console.log({ ...formData, tags: tagList });
  };

  if (loading) {
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
    <div
      className={`max-w-4xl mx-auto p-8 ${
        isDarkMode
          ? "bg-[#262525] text-gray-100 "
          : "min-h-screen bg-gray-200 text-gray-800"
      }  mb-32`}
    >
      <h1 className="text-3xl mb-8">Create New Blog </h1>
      <form onSubmit={handleSubmit}>
        <div
          className=" mb-8 w-full min-h-[20rem] hover:cursor-pointer  relative border-[1.5px] border-gray-300 rounded-lg"
          onClick={() => imageRef?.current?.click()}
        >
          <div
            className={` z-10 absolute   text-[28px] top-[50%] left-[40%] transform  -translate-x-[50%] -translate-y-[50%] font-bold ${
              imageLoad ? " block  animate-bounce " : "hidden"
            } `}
          >
            Uploading....
          </div>

          {!imagePreview && (
            <p className=" absolute top-[50%] left-[50%] transform ml-5 sm:ml-0  -translate-x-[50%] -translate-y-[50%] opacity-70 font-bold text-3xl">
              {" "}
              {imageLoad ? "Loading ....bro wait" : "  choose Image"}
            </p>
          )}
          {imagePreview && (
            <div className=" w-full h-full z-10">
              <img
                src={imagePreview}
                alt="Preview"
                className={` h-[20rem] w-full  object-cover rounded  ${
                  imageLoad ? "opacity-70 blur-sm" : ""
                }`}
              />
            </div>
          )}
        </div>

        <button
          className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full mt-2 `}
          abled={uploaded}
          onClick={handleImageChange}
          ref={updateButtonRef}
        >
          {imageLoad ? "Uploading....." : "Upload"}
        </button>
        <div className="mb-6 mt-6">
          <label className="block mb-2 font-medium" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`w-full p-2 border border-gray-300 rounded ${
              isDarkMode
                ? "bg-[#262525] text-gray-100 "
                : " bg-white text-gray-800"
            } `}
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium" htmlFor="title">
            Description
          </label>
          <textarea
            type="text"
            id="descriptoin"
            placeholder="max word 50"
            name="description"
            className={`w-full p-5 border border-gray-300 rounded ${
              isDarkMode
                ? "bg-[#262525] text-gray-100 "
                : " bg-white text-gray-800"
            } `}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6 rounded-lg">
          <label className="block mb-2 font-medium" htmlFor="content">
            Content
          </label>
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            className={`bg-gray-200   rounded-lg ${
              isDarkMode
                ? "bg-[#262525] text-gray-900 "
                : " bg-white text-gray-800"
            } `}
            required
          />
        </div>

        {/* <div className="mb-6">
          <label className="block mb-2 font-medium" htmlFor="author">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className={`w-full p-2 border border-gray-300 rounded ${
              isDarkMode
                ? "bg-[#262525] text-gray-100 "
                : " bg-white text-gray-800"
            }`}
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div> */}

        <div className="mb-6">
          <label className="block mb-2 font-medium" htmlFor="tags">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            className={`w-full p-2 border border-gray-300 rounded ${
              isDarkMode
                ? "bg-[#262525] text-gray-100 "
                : " bg-white text-gray-800"
            }`}
            value={formData.tags}
            onChange={handleChange}
            onKeyDown={handleTagChange}
            placeholder="Press Enter to add tag"
          />
          <div
            type=""
            onClick={(e) => addTag(e)}
            className="bg-blue-500 px-3 py-1 w-fit hover:cursor-pointer md:hidden block  rounded-lg my-2"
          >
            Add
          </div>
          {tagList?.length > 0 && (
            <div className="mt-2">
              {tagList.map((tag, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-3 py-1 mr-2 text-sm font-medium  rounded-full ${
                    isDarkMode ? "bg-black" : "bg-white"
                  }`}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="ml-2 text-[22px] text-red-600 bg-gray-0"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium" htmlFor="category">
            Category
          </label>
          <select
            required
            id="category"
            name="category"
            className={`w-full p-2 border border-gray-300 rounded ${
              isDarkMode
                ? "bg-[#262525] text-gray-100 "
                : " bg-white text-gray-800"
            }`}
            value={formData.category}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="mb-6">
          <label className="block mb-2 font-medium" htmlFor="slug">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </div> */}

        {/* THIS ARE HIDE DISPLAY HIDDEN IMAGE CHOOSE  */}
        <div className="mb-6 hidden">
          <label className="block mb-2 font-medium" htmlFor="blogImage">
            Featured Image
          </label>
          <input
            type="file"
            id="blogImage"
            name="blogImage"
            accept="image/*"
            // onChange={()=>updateButtonRef?.current.click()}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => {
              const file = e?.target?.files[0];
              setImage(file);
              setImagePreview(URL.createObjectURL(file));
            }}
            ref={imageRef}
          />
          {/* {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )} */}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
