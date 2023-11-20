// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "zonev2-77533.firebaseapp.com",
  projectId: "zonev2-77533",
  storageBucket: "zonev2-77533.appspot.com",
  messagingSenderId: "205059882211",
  appId: "1:205059882211:web:61ec6ce4683805a74399d6",
  measurementId: "G-EBMGLB31RY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

