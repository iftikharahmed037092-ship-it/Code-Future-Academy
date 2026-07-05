import { auth } from "./firebase.js";

import {
  updatePassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const saveBtn = document.getElementById("saveBtn");
const newPassword = document.getElementById("newPassword");

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

    }

});

saveBtn.addEventListener("click", (e) => {

    e.preventDefault();

    const password = newPassword.value;

    if (password.length < 6) {

        alert("Password must be at least 6 characters");

        return;

    }

    const user = auth.currentUser;

    updatePassword(user, password)

    .then(() => {

        alert("Password updated successfully");

        newPassword.value = "";

    })

    .catch((error) => {

        alert(error.message);

    });

});
