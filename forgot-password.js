import { auth } from "./firebase.js";

import {
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const resetForm = document.getElementById("resetForm");

resetForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    sendPasswordResetEmail(auth, email)

    .then(() => {

        alert("Password reset email sent");

    })

    .catch((error) => {

        alert(error.message);

    });

});
