/*==================================================
    PRODUCTS.JS
    PART 1
    FIREBASE + VARIABLES + LOAD PRODUCTS
==================================================*/


/*==============================
FIREBASE IMPORTS
==============================*/

import { db } from "./firebase.js";

import {

    ref,
    onValue,
    push,
    set,
    get

} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";


/*==============================
HTML ELEMENTS
==============================*/

const productsGrid =
document.getElementById("productsGrid");

const loadingBox =
document.getElementById("loadingBox");

const emptyProducts =
document.getElementById("emptyProducts");

const searchInput =
document.getElementById("searchInput");

const filterButtons =
document.querySelectorAll(".filter-btn");


/*==============================
FIREBASE REFERENCES
==============================*/

const productsRef =
ref(db, "products");

const uid =
localStorage.getItem("uid");


/*==============================
GLOBAL VARIABLES
==============================*/

let allProducts = [];

let filteredProducts = [];

let currentCategory = "All";


/*==============================
SHOW LOADING
==============================*/

function showLoading() {

    loadingBox.style.display = "block";

    productsGrid.style.display = "none";

    emptyProducts.style.display = "none";

}


/*==============================
HIDE LOADING
==============================*/

function hideLoading() {

    loadingBox.style.display = "none";

    productsGrid.style.display = "grid";

}


/*==============================
SHOW EMPTY
==============================*/

function showEmpty() {

    productsGrid.innerHTML = "";

    productsGrid.style.display = "none";

    loadingBox.style.display = "none";

    emptyProducts.style.display = "block";

}


/*==============================
HIDE EMPTY
==============================*/

function hideEmpty() {

    emptyProducts.style.display = "none";

    productsGrid.style.display = "grid";

}


/*==============================
LOAD PRODUCTS
==============================*/

showLoading();

onValue(productsRef, (snapshot) => {

    allProducts = [];

    if (!snapshot.exists()) {

        hideLoading();

        showEmpty();

        return;

    }

    snapshot.forEach((item) => {

        allProducts.push({

            id: item.key,

            ...item.val()

        });

    });

    filteredProducts = [...allProducts];

    hideLoading();

    renderProducts(filteredProducts);

});


/*==============================
RENDER PRODUCTS
==============================*/

function renderProducts(products) {

    productsGrid.innerHTML = "";

    if (products.length === 0) {

        showEmpty();

        return;

    }

    hideEmpty();

    products.forEach((product) => {

        /*--------------------------
        DEFAULT VALUES
        --------------------------*/

        const image =
        product.image || "images/no-image.png";

        const title =
        product.title || "Untitled Product";

        const description =
        product.description ||
        "No description available.";

        const category =
        product.category || "Other";

        const price =
        product.price || 0;

        const oldPrice =
        product.oldPrice || "";

        const rating =
        product.rating || 5;

        const reviews =
        product.reviews || 0;

        const stock =
        product.stock || "In Stock";

        const badge =
        product.badge || "";

        const discount =
        product.discount || "";

        let badgeClass = "";

        switch (badge.toLowerCase()) {

            case "new":

                badgeClass = "badge-new";

                break;

            case "sale":

                badgeClass = "badge-sale";

                break;

            case "hot":

                badgeClass = "badge-hot";

                break;

            case "featured":

                badgeClass = "badge-featured";

                break;

            case "best":

                badgeClass = "badge-best";

                break;

            default:

                badgeClass = "";

        }

        /*==============================
        PRODUCT CARD
        ==============================*/

        productsGrid.innerHTML += `

        <div class="product-card">

            ${badge ? `
            <div class="product-badge ${badgeClass}">
                ${badge}
            </div>
            ` : ""}

            <div class="product-image-box">

       <img
           src="${image}"
           alt="${title}"
           class="product-image">

        <button
           class="wishlist-top-btn"
            onclick="addToWishlist(event,'${product.id}')">

      <i class="fa-regular fa-heart"></i>

        </button>

      </div>

           <div class="product-content">

                <h2 class="product-title">
                    ${title}
                </h2>

                <div class="product-rating">

                    <i class="fas fa-star"></i>

                    ${rating}

                    <span>

                        (${reviews} Reviews)

                    </span>

                </div>

                <div class="price-row">

                    <div class="product-price">

                        Rs ${price}

                    </div>

                    ${oldPrice ? `

                    <div class="old-price">

                        Rs ${oldPrice}

                    </div>

                    ` : ""}

                    ${discount ? `

                    <div class="discount">

                        ${discount}

                    </div>

                    ` : ""}

                </div>

                <div class="product-category">

                    ${category}

                </div>

                <div class="stock">

                    ${stock}

                </div>

                <div class="product-buttons">

                

                    <a
                        href="product-details.html?id=${product.id}"
                        class="view-btn">

                        View Details

                    </a>

                    <button
                        class="buy-btn"
                        onclick="buyNow('${product.id}')">

                        Buy Now

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

/*==================================================
    PRODUCTS.JS
    PART 3
    SEARCH + CATEGORY FILTER
==================================================*/


/*==============================
FILTER PRODUCTS
==============================*/

function filterProducts() {

    const searchText =
    searchInput.value
    .trim()
    .toLowerCase();

    filteredProducts =
    allProducts.filter((product) => {

        const title =
        (product.title || "")
        .toLowerCase();

        const description =
        (product.description || "")
        .toLowerCase();

        const category =
        (product.category || "")
        .toLowerCase();

        const matchSearch =

            title.includes(searchText) ||

            description.includes(searchText) ||

            category.includes(searchText);

        const matchCategory =

            currentCategory === "All" ||

            category ===
            currentCategory.toLowerCase();

        return matchSearch &&
               matchCategory;

    });

    renderProducts(filteredProducts);

}


/*==============================
LIVE SEARCH
==============================*/

searchInput.addEventListener(

    "input",

    filterProducts

);


/*==============================
CATEGORY FILTER
==============================*/

filterButtons.forEach((button) => {

    button.addEventListener(

        "click",

        () => {

            filterButtons.forEach((btn) => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            currentCategory =
            button.textContent.trim();

            filterProducts();

        }

    );

});

/*==================================================
    PRODUCTS.JS
    PART 4
    BUY NOW + WISHLIST
==================================================*/


/*==============================
BUY NOW
==============================*/

window.buyNow = function (productId) {

    window.location.href =
    "checkout.html?id=" + productId;

};


/*==============================
ADD TO WISHLIST
==============================*/

window.addToWishlist = function (event, productId) {

    const heartBtn = event.currentTarget;

    heartBtn.classList.toggle("active");

    if (!uid) {

        alert("Please Login First");

        window.location.href =
        "login.html";

        return;

    }

    const productRef =
    ref(db, "products/" + productId);

    get(productRef)

    .then((snapshot) => {

        if (!snapshot.exists()) {

            alert("Product Not Found");

            return;

        }

        const product =
        snapshot.val();

        const wishlistRef =
        push(
            ref(
                db,
                "wishlist/" + uid
            )
        );

        return set(wishlistRef, {

            productId: productId,

            title:
            product.title || "",

            price:
            product.price || 0,

            oldPrice:
            product.oldPrice || "",

            discount:
            product.discount || "",

            description:
            product.description || "",

            category:
            product.category || "",

            image:
            product.image || "",

            rating:
            product.rating || 5,

            reviews:
            product.reviews || 0,

            stock:
            product.stock || "",

            badge:
            product.badge || "",

            createdAt:
            Date.now()

        });

    })

    .then(() => {

    const icon = heartBtn.querySelector("i");

    icon.classList.remove("fa-regular");

    icon.classList.add("fa-solid");

})

    .catch((error) => {

    heartBtn.classList.remove("active");

    console.error(error);

    alert(error.message);

});
    
};

/*==================================================
    PRODUCTS.JS
    PART 5
    FINAL POLISH
==================================================*/


/*==============================
SORT PRODUCTS
==============================*/

function sortProducts() {

    allProducts.sort((a, b) => {

        return (

            (b.createdAt || 0) -

            (a.createdAt || 0)

        );

    });

}


/*==============================
REFRESH PRODUCTS
==============================*/

function refreshProducts() {

    sortProducts();

    filterProducts();

}


/*==============================
WINDOW LOAD
==============================*/

window.addEventListener(

    "load",

    () => {

        hideLoading();

        refreshProducts();

    }

);


/*==============================
ONLINE / OFFLINE
==============================*/

window.addEventListener(

    "offline",

    () => {

        alert(
            "No Internet Connection."
        );

    }

);

window.addEventListener(

    "online",

    () => {

        refreshProducts();

    }

);


/*==============================
GLOBAL ERROR
==============================*/

window.addEventListener(

    "error",

    (event) => {

        console.error(

            "Products Error:",

            event.error

        );

    }

);


/*==============================
UNHANDLED PROMISE
==============================*/

window.addEventListener(

    "unhandledrejection",

    (event) => {

        console.error(

            "Promise Error:",

            event.reason

        );

    }

);


/*==============================
READY
==============================*/

console.log(

    "Products Page Loaded Successfully."

);
