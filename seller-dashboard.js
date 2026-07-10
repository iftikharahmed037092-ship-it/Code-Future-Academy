import { db } from "./firebase.js";

import {
ref,
onValue,
get
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

document
.getElementById("addProduct")
.addEventListener("click",()=>{

window.location.href="admin.html";

});

document
.getElementById("manageProducts")
.addEventListener("click",()=>{

window.location.href="manage-products.html";

});

document
.getElementById("viewOrders")
.addEventListener("click",()=>{

window.location.href="orders.html";

});

document
.getElementById("withdrawMoney")
.addEventListener("click",()=>{

alert("Withdraw System Coming Soon");

});

const sellerProducts =
document.getElementById("sellerProducts");

const totalProducts =
document.getElementById("totalProducts");

const productsRef =
ref(db,"products");

onValue(productsRef,(snapshot)=>{

sellerProducts.innerHTML="";

let count=0;

if(!snapshot.exists()){

sellerProducts.innerHTML=`

<div class="empty">

No Products Yet

</div>

`;

totalProducts.innerHTML="0";

return;

}

snapshot.forEach((child)=>{

count++;

const product=child.val();

const productId=child.key;

sellerProducts.innerHTML+=`

<div class="product-card">

<img
src="${product.image}"
style="
width:100%;
height:200px;
object-fit:cover;
">

<div style="padding:20px;">

<h3>${product.title}</h3>

<p><b>Rs ${product.price}</b></p>

<p>${product.category}</p>

<p>${product.description}</p>
<div style="margin-top:15px;display:flex;gap:10px;">

<button
onclick="editProduct('${productId}')"
style="
flex:1;
padding:10px;
background:#0066ff;
color:white;
border:none;
border-radius:10px;
cursor:pointer;
">

Edit

</button>

<button
onclick="deleteProduct('${productId}')"
style="
flex:1;
padding:10px;
background:#ff3b30;
color:white;
border:none;
border-radius:10px;
cursor:pointer;
">

Delete

</button>

</div>

</div>

</div>

`;

});

totalProducts.innerHTML=count;

});

window.editProduct = function(productId){
    window.location.href = "admin.html?id=" + productId;
}
window.deleteProduct=function(productId){

if(confirm("Delete this product?")){

import("https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js")

.then(({remove,ref})=>{

remove(ref(db,"products/"+productId))

.then(()=>{

alert("Product Deleted Successfully");

})

.catch((error)=>{

alert(error.message);

});

});

}

  }
