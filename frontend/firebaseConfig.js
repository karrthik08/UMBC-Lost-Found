// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI1oe8fs4fcArCyLDxmQl1CYz5jKcSawk",
  authDomain: "lostandfound-f6fbe.firebaseapp.com",
  projectId: "lostandfound-f6fbe",
  storageBucket: "lostandfound-f6fbe.firebasestorage.app",
  messagingSenderId: "124313247281",
  appId: "1:124313247281:web:51c8b3b77216b1f468ff10",
  measurementId: "G-V3W44WM34X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);