import { db } from "./firebase.js";

import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const productsContainer = document.getElementById("productsContainer");

const productsRef = ref(db, "products");

onValue(productsRef, (snapshot) => {

    productsContainer.innerHTML = "";

    if (!snapshot.exists()) {

        productsContainer.innerHTML =
        "<h3>No Products Found</h3>";

        return;
    }

    snapshot.forEach((childSnapshot) => {

        const product = childSnapshot.val();

        productsContainer.innerHTML += `

        <div class="product-card">

            <img
            src="${product.image}"
            alt="${product.title}"
            width="250">

            <h2>${product.title}</h2>

            <h3>Rs ${product.price}</h3>

            <p>${product.category}</p>

            <p>${product.description}</p>

        </div>

        `;

    });

});
