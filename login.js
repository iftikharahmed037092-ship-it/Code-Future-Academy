import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {

const user = userCredential.user;

localStorage.setItem("uid", user.uid);

localStorage.setItem("email", user.email);

alert("Login Successful");

window.location.href = "dashboard.html";

})

    .catch((error) => {

        if(error.code === "auth/user-not-found"){
            alert("Email not found");
        }
        else if(error.code === "auth/wrong-password"){
            alert("Wrong password");
        }
        else if(error.code === "auth/invalid-credential"){
            alert("Wrong Email or Password");
        }
        else{
            alert(error.message);
        }

    });

});
