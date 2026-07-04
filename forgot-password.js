import { auth } from "./firebase.js";

import {
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    if(email === ""){
        alert("Please enter your email");
        return;
    }

    sendPasswordResetEmail(auth, email)

    .then(() => {

        alert("Password reset email sent");

    })

    .catch((error) => {

        if(error.code === "auth/user-not-found"){
            alert("Email not found");
        }
        else{
            alert(error.message);
        }

    });

});
