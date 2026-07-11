import { db } from "./firebase.js";

import {
    ref,
    onValue,
    push,
    set,
    get,
    child
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
const productsGrid = document.getElementById("productsGrid");

const productsRef = ref(db, "products");
const uid = localStorage.getItem("uid");

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

     <div style="display:flex;gap:10px;flex-wrap:wrap;">

<button
   onclick="addToWishlist('${childSnapshot.key}')"
  style="
        background:#ff3366;
        color:white;
        border:none;
        border-radius:50px;
        padding:12px;
        font-weight:bold;
        cursor:pointer;
       ">
         ❤
</button>
     
  <a href="product-details.html?id=${childSnapshot.key}"
    class="view-btn"
    style="flex:1;text-align:center;">
    View Details
  </a>

<button
class="buy-btn"
onclick="buyNow('${childSnapshot.key}')"
style="
flex:1;
background:#00b894;
color:white;
border:none;
border-radius:50px;
padding:12px;
font-weight:bold;
cursor:pointer;
">
Buy Now
</button>

</div>

            </div>

        </div>

        `;

    });

});

window.buyNow = function(productId){

window.location.href = "checkout.html?id=" + productId;

}

window.addToWishlist = function(productId){

if(!uid){

alert("Please Login First");

window.location.href="login.html";

return;

}

const productRef = ref(db,"products/"+productId);

get(productRef).then((snapshot)=>{

if(snapshot.exists()){

const product = snapshot.val();

const wishlistRef = push(ref(db,"wishlist/"+uid));

set(wishlistRef,{

productId: productId,

title: product.title,

price: product.price,

description: product.description,

category: product.category,

image: product.image

})

.then(()=>{

alert("Added To Wishlist ❤️");

})

.catch((error)=>{

alert(error.message);

});

}

});

}
