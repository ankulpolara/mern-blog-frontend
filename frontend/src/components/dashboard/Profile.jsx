import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Button,
  Avatar,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { axiosInstance } from "../../config/axiousConfig";
import { toast } from "react-toastify";
import {  setUser } from "../../redux/slices/authSlice";
import uploadToCloudinary from "../../utillity/uploadToCloudinary";

const theme = {
  light: {
    background: "#fff",
    text: "#000",
    card: {
      background: "#fff",
      text: "#000",
      inputBackground: "#fff",
      inputText: "#000",
    },
  },
  dark: {
    background: "#424242",
    text: "#fff",
    card: {
      background: "#333",
      text: "#fff",
      inputBackground: "#555",
      inputText: "#fff",
    },
  },
};

const ContainerStyled = styled(motion(Container))`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;

const AvatarStyled = styled(motion(Avatar))`
  width: 120px;
  height: 120px;
`;

const FormStyled = styled(motion.form)`
  width: 100%; // Fix IE 11 issue.
  margin-top: 24px;
`;

const SubmitButton = styled(Button)`
  margin: 24px 0 16px;
`;

const animationVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export function Profile() {
  // const user = JSON.parse(localStorage?.getItem("user")); //get user from localStorage
  // const token = localStorage?.getItem("token"); //get user from localStorage
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth?.user);
  // console.log(user);

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(user?.ImageURL);
  let imageRef = useRef(null);

  const imageHandler = async (e) => {
    setImageLoading(true);
    console.log("onchangr handleer ca;;");
    const file = e.target.files[0];

    // let image = URL.createObjectURL(e.target.files[0]);
    // console.log(image);
    if (file) {
      try {
        const response = await uploadToCloudinary(file, token);
        if (response.success === false) {
          toast.warn(response.message);
          setLoading(false);
          return;
        }
        console.log(response);
        const updatesUser = await axiosInstance(
          "/update-user",
          "post",
          { ImageURL: response },
          "Profile Pic updated successfully"
        );
        console.log(updatesUser);
        // set for locally
        dispatch(setUser({ ...user, ImageURL: response }));
        setImage(response);
      } catch (error) {
        toast.error(error);
      }
    }
    // toast.warn("please choose image...");
    // setImage(image);
    setImageLoading(false);
  };

  const [formData, setFormData] = useState({
    userName: user?.userName,
    email: user?.email,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,

      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    setLoading(true);
    formData.userName = formData?.userName?.split(" ").join("");
    // formData.userName.toLowerCase()

    // console.log(formData?.userName, user?.userName);
    if (formData?.userName == user?.userName && formData.email == user.email) {
      if (formData.password.length === 0) {
        toast.error("No changes found");

        setLoading(false);
        return;
      }
    }
    try {
      let response = await axiosInstance(
        "/update-user",
        "POST",
        formData,
        "Updated successfully"
        //here mention token
      );
      if (response.success === false) {
        toast.warn(response.message);
        setLoading(false);
        return;
      }
      console.log(response);

      dispatch(setUser(response.user));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error after disabled", error);
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  if (imageLoading) {
    return (
      <div className="select-none w-full min-h-screen flex flex-col  justify-center items-center">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
        </div>
        <div className="mt-5">Uploading...</div>
      </div>
    );
  }
  return (
    <ContainerStyled
      component="main"
      maxWidth="md"
      theme={currentTheme}
      initial="hidden"
      animate="visible"
      variants={animationVariants}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        transition={{ duration: 0.5 }}
      >
        <input
          type="file"
          ref={imageRef}
          className="hidden"
          onChange={imageHandler}
        />
        <Typography
          component="h2"
          sx={{ margin: "20px auto", textAlign: "center" }}
          variant="h4"
        >
          Profile
        </Typography>
        <div></div>
        <img
          onClick={() => imageRef.current.click()}
          className={`mx-auto rounded-full hover:before:content-['Hovering'] hover:cursor-pointer w-[128px] h-[128px] 
            object-cover  `}
          src={image ? image :`https://ui-avatars.com/api/?name=${user?.userName}&size=128&background=random&color=fff`}
        ></img>
      </motion.div>

      <FormStyled
        noValidate
        onSubmit={handleSubmit}
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              autoComplete="userName"
              InputProps={{
                style: {
                  backgroundColor: currentTheme.card.inputBackground,
                  color: currentTheme.card.inputText,
                },
              }}
              InputLabelProps={{
                style: { color: currentTheme.card.inputText },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              InputProps={{
                style: {
                  backgroundColor: currentTheme.card.inputBackground,
                  color: currentTheme.card.inputText,
                },
              }}
              InputLabelProps={{
                style: { color: currentTheme.card.inputText },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              InputProps={{
                style: {
                  backgroundColor: currentTheme.card.inputBackground,
                  color: currentTheme.card.inputText,
                },
              }}
              InputLabelProps={{
                style: { color: currentTheme.card.inputText },
              }}
            />
          </Grid>
        </Grid>
        <SubmitButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Loading" : "Update"}
        </SubmitButton>
      </FormStyled>
    </ContainerStyled>
  );
}
