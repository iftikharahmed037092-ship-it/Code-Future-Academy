import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js"; // نئی لائن

const firebaseConfig = {
  apiKey: "AIzaSyA65Nzil2LTMZbMWU5AIGqsKDd24tEuDAM",
  authDomain: "smartservices-2ac5f.firebaseapp.com",
  databaseURL: "https://smartservices-2ac5f-default-rtdb.firebaseio.com",
  projectId: "smartservices-2ac5f",
  storageBucket: "smartservices-2ac5f.firebasestorage.app",
  messagingSenderId: "102519520447",
  appId: "1:102519520447:web:0563091a5d51a4f42cda0a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // پرانا جیسا
export const db = getDatabase(app); // پرانا جیسا
export const storage = getStorage(app); // نئی لائن - پروڈکٹ اپلوڈ کے لیے
