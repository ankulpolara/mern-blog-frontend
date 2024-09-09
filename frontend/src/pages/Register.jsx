import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiousConfig";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { login } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "white", // Text color for input
  },
  "& .MuiInputLabel-root": {
    color: "white", // Text color for label
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "white", // Color of underline before focus
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "white", // Color of underline on hover
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white", // Color of underline after focus
  },
});

export const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [show, setshow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [Gloading, setGLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    setGLoading(true);
    console.log("start");
    let auth = getAuth(app);
    let provider = new GoogleAuthProvider();

    // Remove or update the custom parameter
    // provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      localStorage.setItem("firebase", JSON.stringify(result));
      let user = {
        _id: result?.user?.uid,
        userName: result?.user?.displayName.split(" ").join(""),
        email: result?.user?.email,
      };
      // let token = result?.user?.accessToken;
      // let register in our databse  so call api
      let data = {
        userName: user?.userName?.toLowerCase(),
        email: user?.email,
      };

      let response = await axiosInstance(
        "/google-sign-in",
        "post",
        data,
        "Login success.."
      );
      if (response.success === false) {
        toast.warn(response.message);
        return;
      }
      console.log("response", response);
      dispatch(login({ user: response?.user, token: response?.token })); //it will login auth slice

      setGLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error?.code);
      setGLoading(false);
      toast?.error(error?.code);
    }
  };

  // submit functioon
  const handleSubmit = async () => {
    userName.trim();
    // Define the regex pattern for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if all fields are filled
    if (!userName || !email || !password) {
      toast.warn("All fields are mandatory");
      return;
    }

    // Validate the email format
    if (!emailRegex.test(email)) {
      toast.warn("Please enter a valid email address");
      return;
    }

    // Validate that the userName does not contain spaces
    if (/\s/.test(userName)) {
      toast.warn("Username must not contain spaces");
      return;
    }

    // If all validations pass, proceed with form submission
    const data = { userName, email, password };
    setLoading(true);
    let response = await axiosInstance("/signup", "post", data);
    if (response.success === false) {
      toast.warn(response.message);
      setLoading(false);
      return;
    }
    console.log(response);
    setLoading(false);

     

    

    // Clear the form fields
    setUserName("");
    setemail("");
    setpassword("");
    navigate("/sign-in");
  };

  return (
    <div
      className="w-screen h-fit md:h-[95vh] pb-16  flex flex-col md:flex-row gap-8 md:gap-3 pt-10 md:pt-0 md:justify-evenly items-center   my-auto 
     bg-gradient-to-r from-[#bdc3c7] via-purple-500 to-[#233a53] text-white overflow-x-hidden"
    >
      {/* left side  */}

      <motion.div
        className="flex flex-col w-[70%] md:w-[40%]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex gap-2 my-auto items-end justify-center W-[50%] text-[18px] md:text-[40px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="font-extrabold">Polara's</p>
          <span className="font-mono  md:px-5 py-1 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center my-auto text-[17px] md:text-[23px] w-2/6">
            Blog
          </span>
        </motion.div>
        <motion.p
          className="opacity-70 w-full mt-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          nesciunt cupiditate sequi? Iste, reiciendis voluptate.
        </motion.p>
      </motion.div>

      <motion.div
        className="flex flex-col justify-center items-center gap-6 w-[85%] md:w-[40%] py-8 px-2 border-2 rounded-lg text-white bg-[#ffffff14] shadow-lg shadow-gray-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <CustomTextField
          id="standard-basics"
          label="UserName"
          variant="standard"
          className="w-full max-w-md text-white"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <CustomTextField
          id="standard-basicss"
          label="Email"
          type="email"
          variant="standard"
          className="w-full max-w-md"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <div className="relative w-full max-w-md">
          <CustomTextField
            id="standard-basicsss"
            label="Password"
            type={show ? "password" : "text"}
            variant="standard"
            className="w-full"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <div
                  className="absolute right-2 top-[46%] transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setshow(!show)}
                >
                  {show ? <IoEye /> : <IoEyeOff />}
                </div>
              ),
            }}
          />
        </div>
        <Button
          disabled={loading}
          variant="contained"
          onClick={handleSubmit}
          className="mt-4 w-[70%]"
        >
          {loading ? " Loading ....." : "Submit"}
        </Button>
        <Button
          disabled={Gloading}
          variant="outlined"
          onClick={handleGoogleClick}
          className="mt-4 w-[70%] text-white "
          sx={{
            color: "white",
            border: "1px solid ",
            fontSize: "12px",
            width: "fit-content",
          }}
        >
          {Gloading ? (
            "Loading...."
          ) : (
            <div className="flex ">
              <FcGoogle className="mr-3 text-[20px]" />
              Continue With Google
            </div>
          )}
        </Button>

        <p>
          Have an Account ?{" "}
          <Link to={"/sign-in"} className="text-pink-500">
            Sign in{" "}
          </Link>
        </p>
      </motion.div>
      {/* <Footer /> */}
    </div>
  );
};
