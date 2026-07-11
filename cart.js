import { db } from "./firebase.js";

import {
ref,
onValue
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

const uid = localStorage.getItem("uid");

console.log("UID:", uid);
alert("UID = " + uid);
alert(uid);

if(!uid){

alert("Please Login First");

window.location.href="login.html";

}

const cartRef = ref(db,"cart/"+uid);

console.log(uid);
console.log("cart/"+uid);

onValue(cartRef,(snapshot)=>{

cartItems.innerHTML="";

let total=0;

if(!snapshot.exists()){

cartItems.innerHTML=`

<div class="cart-item">

<h3 class="item-title">

Your Cart is Empty

</h3>

</div>

`;

cartTotal.innerHTML="Total: Rs 0";

return;

}

snapshot.forEach((child)=>{

const item=child.val();

const price=Number(
item.price.replace("Rs","").trim()
);

total+=price*item.quantity;

cartItems.innerHTML+=`

<div class="cart-item">

<img
src="${item.image}"
style="
width:100%;
max-height:220px;
object-fit:cover;
border-radius:15px;
margin-bottom:15px;
">

<h3 class="item-title">

${item.title}

</h3>

<p class="item-price">

${item.price}

</p>

<p>

Quantity : ${item.quantity}

</p>

</div>

`;

});

cartTotal.innerHTML="Total: Rs "+total;

});

checkoutBtn.addEventListener("click",()=>{

window.location.href="checkout.html";

});
