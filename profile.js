import { auth } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

onAuthStateChanged(auth, (user) => {

    if (user) {

        userName.textContent =
            user.displayName || "User";

        userEmail.textContent =
            user.email;

    } else {

        window.location.href =
            "login.html";

    }

});
