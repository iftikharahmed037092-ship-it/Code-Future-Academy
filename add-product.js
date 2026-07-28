/*==================================================
 CFA AI ADMIN ADD PRODUCT JS v2.1
 FIREBASE SAVE PRODUCT + UPLOAD + URL
==================================================*/

import { db } from "./firebase.js";

import {
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const productForm = document.getElementById("productForm");

// ===== نئے IDs =====
const imageUpload = document.getElementById("imageUpload");
const imageUrl = document.getElementById("imageUrl");
const imagePreview = document.getElementById("imagePreview");
const finalImage = document.getElementById("finalImage");

/*==============================
TAB SWITCH
==============================*/
window.showTab = function(tab) {
    document.querySelectorAll('.img-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(div => div.classList.remove('active'));

    if(tab === 'upload'){
        document.querySelector('.img-tab:nth-child(1)').classList.add('active');
        document.getElementById('uploadTab').classList.add('active');
    } else {
        document.querySelector('.img-tab:nth-child(2)').classList.add('active');
        document.getElementById('linkTab').classList.add('active');
    }
}

/*==============================
IMAGE PREVIEW
==============================*/

// 1. گیلری سے سلیکٹ
imageUpload.addEventListener("change", (e)=>{
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = (event)=>{
            imagePreview.src = event.target.result;
            finalImage.value = event.target.result; // Base64 کو hidden میں ڈالا
        }
        reader.readAsDataURL(file);
    }
});

// 2. URL پیسٹ
imageUrl.addEventListener("input", (e)=>{
    if(e.target.value){
        imagePreview.src = e.target.value;
        finalImage.value = e.target.value; // URL کو hidden میں ڈالا
    } else {
        imagePreview.src = "images/no-image.png";
        finalImage.value = "";
    }
});

/*==============================
ADD PRODUCT TO FIREBASE
==============================*/
productForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    if(!finalImage.value){
        alert("براہ کرم تصویر Upload کریں یا URL پیسٹ کریں ⚠️");
        return;
    }

    const productRef = push(ref(db,"products"));

    const product = {
        title: document.getElementById("productName").value,
        price: document.getElementById("productPrice").value,
        oldPrice: document.getElementById("oldPrice").value,
        discount: document.getElementById("discount").value,
        image: finalImage.value, // <-- اب یہاں سے جائے گا
        category: document.getElementById("productCategory").value,
        badge: document.getElementById("productBadge").value,
        stock: document.getElementById("productStock").value,
        rating: document.getElementById("productRating").value,
        description: document.getElementById("productDescription").value,
        createdAt: Date.now()
    };

    set(productRef, product)
  .then(()=>{
        alert("Product Added Successfully ✅");
        productForm.reset();
        imagePreview.src = "images/no-image.png";
        finalImage.value = "";
        showTab('upload'); // واپس Upload Tab پر
    })
  .catch((error)=>{
        alert("Error: " + error.message);
    });
});
