/*==================================================
 CFA AI ADMIN ADD PRODUCT JS v2.3
 FIREBASE SAVE PRODUCT + UPLOAD + URL + MOBILE FIX
==================================================*/

import { db } from "./firebase.js";

import {
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const productForm = document.getElementById("productForm");

// ===== Elements =====
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

// 1. گیلری سے سلیکٹ - سائز چیک کے ساتھ
imageUpload.addEventListener("change", (e)=>{
    const file = e.target.files[0];
    if(file){
        // اگر 2MB سے بڑی ہے تو روک دو
        if(file.size > 2000000){
            alert("تصویر 2MB سے چھوٹی ہونی چاہیے ⚠️");
            imageUpload.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = (event)=>{
            imagePreview.src = event.target.result;
            finalImage.value = event.target.result; // Base64
        }
        reader.readAsDataURL(file);
    }
});

// 2. URL پیسٹ
imageUrl.addEventListener("input", (e)=>{
    if(e.target.value.trim()!== ""){
        imagePreview.src = e.target.value;
        finalImage.value = e.target.value; // URL
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

    // ===== VALIDATION =====
    const title = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value;
    const image = finalImage.value;

    if(title === ""){
        alert("Product Name لازمی ہے ⚠️");
        return;
    }
    if(price === "" || price <= 0){
        alert("Valid Price ڈالیں ⚠️");
        return;
    }
    if(image === ""){
        alert("براہ کرم تصویر Upload کریں یا URL پیسٹ کریں ⚠️");
        return;
    }

    const productRef = push(ref(db,"products"));

    const product = {
        title: title,
        price: price,
        oldPrice: document.getElementById("oldPrice").value,
        discount: document.getElementById("discount").value,
        image: image, // <-- یہاں Base64 یا URL جائے گا
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
        showTab('upload');
        window.scrollTo(0,0); // اوپر لے جائے
    })
 .catch((error)=>{
        console.error(error);
        alert("Firebase Error: " + error.message + "\nنوٹ: تصویر 2MB سے بڑی نہ ہو");
    });
});
