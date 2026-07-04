// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA65Nzil2LTMZbMWU5AIGqsKDd24tEuDAM",
  authDomain: "smartservices-2ac5f.firebaseapp.com",
  databaseURL: "https://smartservices-2ac5f-default-rtdb.firebaseio.com",
  projectId: "smartservices-2ac5f",
  storageBucket: "smartservices-2ac5f.firebasestorage.app",
  messagingSenderId: "102519520447",
  appId: "1:102519520447:web:0563091a5d51a4f42cda0a",
  measurementId: "G-KHRLSY48C2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
