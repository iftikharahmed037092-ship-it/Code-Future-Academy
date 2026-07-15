/*==================================================
 CFA AI ADMIN ADD PRODUCT JS
 FIREBASE SAVE PRODUCT
==================================================*/


import { db } from "./firebase.js";


import {

ref,
push,
set

} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";




const productForm =
document.getElementById("productForm");




const imageInput =
document.getElementById("productImage");


const imagePreview =
document.getElementById("imagePreview");





/*==============================
IMAGE PREVIEW
==============================*/


imageInput.addEventListener(
"input",
()=>{


imagePreview.src =
imageInput.value || "images/no-image.png";


});






/*==============================
ADD PRODUCT
==============================*/


productForm.addEventListener(

"submit",

(e)=>{


e.preventDefault();





const productRef =
push(ref(db,"products"));





const product = {


title:
document.getElementById("productName").value,



price:
document.getElementById("productPrice").value,



oldPrice:
document.getElementById("oldPrice").value,



discount:
document.getElementById("discount").value,



image:
document.getElementById("productImage").value,



category:
document.getElementById("productCategory").value,



badge:
document.getElementById("productBadge").value,



stock:
document.getElementById("productStock").value,



rating:
document.getElementById("productRating").value,



description:
document.getElementById("productDescription").value,



createdAt:
Date.now()



};






set(productRef,product)

.then(()=>{


alert(
"Product Added Successfully ✅"
);



productForm.reset();



imagePreview.src=
"images/no-image.png";



})

.catch((error)=>{


alert(error.message);


});



});
