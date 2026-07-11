import { db } from "./firebase.js";

import {
ref,
get
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

const productImage = document.getElementById("productImage");
const productTitle = document.getElementById("productTitle");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productDescription = document.getElementById("productDescription");

const addToCartBtn = document.getElementById("addToCartBtn");
const buyNowBtn = document.getElementById("buyNowBtn");

if(productId){

const productRef = ref(db,"products/"+productId);

get(productRef).then((snapshot)=>{

if(snapshot.exists()){

const product = snapshot.val();

productImage.src = product.image;
productTitle.innerHTML = product.title;
productPrice.innerHTML = "Rs " + product.price;
productCategory.innerHTML = product.category;
productDescription.innerHTML = product.description;

}else{

alert("Product Not Found");

}

});

}

addToCartBtn.addEventListener("click",()=>{

alert("Add To Cart system will be connected in next step.");

});

buyNowBtn.addEventListener("click",()=>{

window.location.href="checkout.html?id="+productId;

});
