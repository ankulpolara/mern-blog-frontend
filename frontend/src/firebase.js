// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJUK8rlJuys158I0p8eNkYZtbbiYmlD_0",
  authDomain: "mern-blog-52d36.firebaseapp.com",
  projectId: "mern-blog-52d36",
  storageBucket: "mern-blog-52d36.appspot.com",
  messagingSenderId: "572163822093",
  appId: "1:572163822093:web:24f39caf6695adf15cbb44",
  measurementId: "G-NYJCGM7PJ8"
};

// Initialize Firebase


export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app); // Initialize other services if needed
 export const storage = getStorage(app);

// export { auth, storage }; // Export storage along with other services







// project-572163822093
