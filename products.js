import { db } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const productsGrid = document.getElementById("productsGrid");

const productsRef = ref(db, "products");

onValue(productsRef, (snapshot) => {

    productsGrid.innerHTML = "";

    if (!snapshot.exists()) {

        productsGrid.innerHTML = `
        <h2 style="text-align:center;color:#666;">
            No Products Found
        </h2>
        `;

        return;
    }

    snapshot.forEach((childSnapshot) => {

        const product = childSnapshot.val();

        productsGrid.innerHTML += `

        <div class="product-card">

            <img
            src="${product.image}"
            alt="${product.title}"
            class="product-image">

            <div class="product-content">

                <h2 class="product-title">
                    ${product.title}
                </h2>

                <div class="product-price">
                    Rs ${product.price}
                </div>

                <p class="product-description">
                    ${product.description}
                </p>

                <p style="margin-bottom:15px;color:#555;">
                    Category: ${product.category}
                </p>

                <a href="product-details.html"
                class="view-btn">
                    View Details
                </a>

            </div>

        </div>

        `;

    });

});
