import { db } from "./firebase.js";

import {
ref,
onValue,
remove
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const uid = localStorage.getItem("uid");

const wishlistItems =
document.getElementById("wishlistItems");

const wishlistRef =
ref(db,"wishlist/"+uid);

onValue(wishlistRef,(snapshot)=>{

wishlistItems.innerHTML="";

if(!snapshot.exists()){

wishlistItems.innerHTML="<h2>No Wishlist Items</h2>";

return;

}

snapshot.forEach((child)=>{

const item = child.val();

wishlistItems.innerHTML += `

<div class="card">

<img src="${item.image}">

<h2>${item.title}</h2>

<div class="price">
Rs ${item.price}
</div>

<p>${item.description}</p>

<div class="buttons">

<button
class="cart-btn"
onclick="addToCart('${child.key}')">
Add To Cart
</button>

<button
class="remove-btn"
onclick="removeWishlist('${child.key}')">
Remove
</button>

</div>

</div>

`;

});

});

window.removeWishlist=function(id){

remove(ref(db,"wishlist/"+uid+"/"+id));

}

window.addToCart=function(id){

alert("Next Step: Wishlist To Cart");

}
