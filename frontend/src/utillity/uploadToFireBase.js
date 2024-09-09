// src/utils/uploadImage.js
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";


/**
 * Uploads an image to Firebase Storage.
 * @param {File} file - The image file to upload.
 * @param {function} onProgress - Callback function to track upload progress.
 * @returns {Promise<string>} - A promise that resolves with the download URL of the uploaded image.
 */
const uploadToFireBase = (file, onProgress) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("No file provided"));
            return;
        }

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (onProgress) {
                    onProgress(progress); // Call the onProgress callback with the current progress
                }
            },
            (error) => {
                reject(new Error("Upload failed: " + error.message));
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                }).catch((error) => {
                    reject(new Error("Failed to get download URL: " + error.message));
                });
            }
        );
    });
};

export default uploadToFireBase;
