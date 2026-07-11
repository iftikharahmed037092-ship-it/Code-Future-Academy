import { db } from "./firebase.js";

import {
ref,
get,
set,
push,
remove
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

const productImage = document.getElementById("productImage");
const productTitle = document.getElementById("productTitle");
const productPrice = document.getElementById("productPrice");

const checkoutForm = document.getElementById("checkoutForm");

let currentProduct = null;

if(productId){

const productRef = ref(db,"products/"+productId);

get(productRef).then((snapshot)=>{

if(snapshot.exists()){

currentProduct = snapshot.val();

productImage.src = currentProduct.image;
productTitle.innerHTML = currentProduct.title;
productPrice.innerHTML = "Rs " + currentProduct.price;

}

});

}

checkoutForm.addEventListener("submit",(e)=>{

e.preventDefault();

if(!currentProduct){

alert("Product not found.");

return;

}

const customerName =
document.getElementById("customerName").value;

const phone =
document.getElementById("phone").value;

const address =
document.getElementById("address").value;

const city =
document.getElementById("city").value;

const payment =
document.getElementById("payment").value;

const ordersRef = ref(db,"orders");

const newOrder = push(ordersRef);

set(newOrder,{

productId: productId,
productTitle: currentProduct.title,
productImage: currentProduct.image,
price: currentProduct.price,

customerName: customerName,
phone: phone,
address: address,
city: city,
payment: payment,

status: "Pending",

date: new Date().toLocaleString()

})

.then(()=>{

  const uid = localStorage.getItem("uid");

if(uid){

remove(ref(db,"cart/"+uid));

  }

alert("Order Placed Successfully!");

window.location.href = "orders.html";

})

.catch((error)=>{

alert(error.message);

});

});
