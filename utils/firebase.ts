// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4R85y_L-UJs4hly-rQhO-aVLl61-IFtQ",
  authDomain: "bookingtour-f45d9.firebaseapp.com",
  projectId: "bookingtour-f45d9",
  storageBucket: "bookingtour-f45d9.firebasestorage.app",
  messagingSenderId: "789704903845",
  appId: "1:789704903845:web:9e99d4e0327e7286d9d14c",
  measurementId: "G-Q167Z3QTT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);