import { db } from "./firebase.js";

import {
ref,
onValue,
remove,
push,
set
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

const itemRef = ref(db,"wishlist/"+uid+"/"+id);

onValue(itemRef,(snapshot)=>{

if(snapshot.exists()){

const item = snapshot.val();

const cartRef = push(ref(db,"cart/"+uid));

set(cartRef,{

productId:item.productId,

title:item.title,

price:item.price,

description:item.description,

category:item.category,

image:item.image,

quantity:1

})

.then(()=>{

remove(ref(db,"wishlist/"+uid+"/"+id));

alert("Added To Cart Successfully 🛒");

})

.catch((error)=>{

alert(error.message);

});

}

},{onlyOnce:true});

}
