import axios from "axios";

const uploadToCloudinary = async (image = "", width = 460, height = 300) => {
  if (image) {
    const preset_key = 'wkng3tdl'; // Your upload preset key
    const cloudName = 'dqd3xw8b2'; // Your Cloudinary cloud name
    
    let formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset_key);

    // Set the transformation parameters in the Cloudinary URL
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const response = await axios.post(cloudinaryUrl, formData, {
      params: {
        transformation: `c_scale,w_${width},h_${height}`
      }
    });

    const secureUrl = response?.data?.secure_url;
    if (secureUrl) {
      return secureUrl;
    } else {
      throw new Error("Upload failed, please try again later.");
    }
  } else {
    throw new Error("No image provided.");
  }
};

export default uploadToCloudinary;
