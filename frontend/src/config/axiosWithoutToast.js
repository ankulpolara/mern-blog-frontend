import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

const useToken = () => {
  const token = useSelector((state) => state.auth?.token);
  return token;
}

// Function to create a new Axios instance and handle dynamic API calls
export const axiosWithoutToast = async(URL, METHOD, DATA = {}, MESSAGE, token ,) => {
  token = JSON.parse(localStorage.getItem("token")) ;

  try {
    const instance = axios.create({
       baseURL:  'https://mern-blog-1aal.onrender.com/api'  ,                   //'http://localhost:3001/api',
     // baseURL:   'http://localhost:3001/api'    ,     //'https://mern-blog-1aal.onrender.com/api'  ,                   

      timeout: 10000, // Adjust timeout as needed
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });

    // Add a request interceptor to the instance
    instance.interceptors.request.use(
      config => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    let response;
    switch (METHOD.toUpperCase()) {
      case 'GET':
        response = await instance.get(URL, { params: DATA }, { withCredentials: true });
        break;
      case 'POST':
        response = await instance.post(URL, DATA, { withCredentials: true });
        break;
      case 'PUT':
        response = await instance.put(URL, DATA, { withCredentials: true });
        break;
      case 'DELETE':
        response = await instance.delete(URL, { data: DATA }, { withCredentials: true });
        break;
      default:
        throw new Error('Unsupported HTTP method');
    }
       if(!response?.data?.message =="get all fresh blog"){
        // toast.success(response?.data?.message || MESSAGE || 'Operation successful');
       }
   
    return response.data;

  } catch (error) {
    console.error("Axios error:", error); // Log the error for debugging

    // Handle different error scenarios
    if (error.response) {
      // Server responded with a status code out of the range of 2xx
      toast.error(error.response.data.message);
      toast.error(error.response.data.error?.errorResponse?.errmsg);
    } else if (error.request) {
      // Request was made but no response was received
      toast.warn("No response from the server");
    } else {
      // Something else happened in making the request
      toast.error(error.message || 'Something went wrong');
    }

    // Return an appropriate value or handle the error response accordingly
    return { success: false, message: error.response?.data?.error?.errorResponse?.errmsg || error.response?.data?.message };
  }
};

// Usage example in a component
const MyComponent = () => {
  const token = useToken();

  const handleApiCall = async () => {
    const result = await axiosWithoutToast('/your-endpoint', 'GET', {}, 'Fetching data', token);
    console.log(result);
  };

  return (
    <div>
      <button onClick={handleApiCall}>Call API</button>
    </div>
  );
};

// export default MyComponent;


















































// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Function to create a new Axios instance and handle dynamic API calls
// export const axiosInstance = async (URL, METHOD, DATA = {}, MESSAGE) => {
//   try {
//     const instance = axios.create({
//       baseURL: 'http://localhost:3001/api', // Replace with your API base URL
//       timeout: 10000, // Adjust timeout as needed
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     let response;
//     switch (METHOD.toUpperCase()) {
//       case 'GET':
//         response = await instance.get(URL, { params: DATA }, { withCredentials: true });
//         break;
//       case 'POST':
//         response = await instance.post(URL, DATA, { withCredentials: true });
//         break;
//       case 'PUT':
//         response = await instance.put(URL, DATA, { withCredentials: true });
//         break;
//       case 'DELETE':
//         response = await instance.delete(URL, { data: DATA }, { withCredentials: true });
//         break;
//       default:
//         throw new Error('Unsupported HTTP method');
//     }

//     toast.success(MESSAGE || 'Operation successful');
//     return response.data;
//   } catch (error) {
//     console.error("Axios error:", error); // Log the error for debugging

//     // Handle different error scenarios
//     if (error.response) {
//       // Server responded with a status code out of the range of 2xx
//       toast.error(error?.response?.data?.message || 'Something went wrong...');
//       toast.error(error?.response?.data?.error?.errorResponse?.errmsg || 'Something went wrong');
//     } else if (error.request) {
//       // Request was made but no response was received
//       toast.warn("No response from the server");
//     } else {
//       // Something else happened in making the request
//       toast.error(error?.message || 'Something went wrong');
//     }

//     // Return an appropriate value or handle the error response accordingly
//     return { success: false, message: error?.response?.data?.error?.errorResponse?.errmsg || error?.response?.data?.message };
//   }
// };
