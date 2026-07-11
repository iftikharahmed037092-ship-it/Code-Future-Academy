import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
ref,
set
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
    }

    createUserWithEmailAndPassword(
        auth,
        email,
        password
    )

    .then((userCredential) => {

        alert("Account Created Successfully");

        window.location.href = "login.html";

    })

    .catch((error) => {

        alert(error.message);

    });

});
