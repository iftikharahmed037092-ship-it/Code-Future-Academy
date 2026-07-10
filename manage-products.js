import { db } from "./firebase.js";

import {
ref,
onValue,
remove
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const productsGrid = document.getElementById("productsGrid");

const productsRef = ref(db, "products");

onValue(productsRef, (snapshot) => {

productsGrid.innerHTML = "";

if(!snapshot.exists()){

productsGrid.innerHTML = `
<h2 style="text-align:center;">
No Products Found
</h2>
`;

return;

}

snapshot.forEach((childSnapshot)=>{

const product = childSnapshot.val();

const productId = childSnapshot.key;

productsGrid.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.title}">

<div class="content">

<h2>${product.title}</h2>

<div class="price">
Rs ${product.price}
</div>

<p class="desc">
${product.description}
</p>

<div class="buttons">

<button
class="edit-btn"
onclick="editProduct('${productId}')">
Edit
</button>

<button
class="delete-btn"
onclick="deleteProduct('${productId}')">
Delete
</button>

</div>

</div>

</div>

`;

});

});

window.deleteProduct = function(productId){

if(confirm("Delete this product?")){

remove(ref(db,"products/"+productId))

.then(()=>{

alert("Product Deleted");

})

.catch((error)=>{
 

alert(error.message);

});

}

}

window.editProduct = function(productId){

window.location.href =
"admin.html?id="+productId;

}
