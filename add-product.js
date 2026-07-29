/*==================================================
 CFA AI ADMIN ADD PRODUCT JS v3.0
 FIREBASE + STORAGE + UPLOAD + URL - NO CRASH
==================================================*/

import { db, storage } from "./firebase.js"; // storage بھی امپورٹ

import {
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

import {
    ref as sRef,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js"; // نئے

const productForm = document.getElementById("productForm");
const imageUpload = document.getElementById("imageUpload");
const imageUrl = document.getElementById("imageUrl");
const imagePreview = document.getElementById("imagePreview");
const finalImage = document.getElementById("finalImage");

let uploadedFile = null; // فائل کو یہاں سیو کریں گے

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
imageUpload.addEventListener("change", (e)=>{
    uploadedFile = e.target.files[0]; // فائل سیو کر لی
    if(uploadedFile){
        const reader = new FileReader();
        reader.onload = (event)=>{
            imagePreview.src = event.target.result; // صرف Preview کے لیے
            finalImage.value = "uploading"; // Flag
        }
        reader.readAsDataURL(uploadedFile);
    }
});

imageUrl.addEventListener("input", (e)=>{
    uploadedFile = null; // URL ہے تو فائل null
    if(e.target.value.trim()!== ""){
        imagePreview.src = e.target.value;
        finalImage.value = e.target.value; // سیدھا URL
    } else {
        imagePreview.src = "images/no-image.png";
        finalImage.value = "";
    }
});

/*==============================
ADD PRODUCT TO FIREBASE
==============================*/
productForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const title = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value;
    let image = finalImage.value;

    if(title === "" || price === "" || price <= 0){
        alert("Name اور Price لازمی ہیں ⚠️");
        return;
    }

    // اگر Upload والی ہے تو Storage میں اپلوڈ کرو
    if(uploadedFile){
        try{
            alert("تصویر اپلوڈ ہو رہی ہے... تھوڑا انتظار کریں");
            const storageRef = sRef(storage, `products/${Date.now()}_${uploadedFile.name}`);
            const snapshot = await uploadBytes(storageRef, uploadedFile);
            image = await getDownloadURL(snapshot.ref); // لنک مل گیا
        } catch(err){
            alert("تصویر اپلوڈ فیل: " + err.message);
            return;
        }
    }

    if(image === "" || image === "uploading"){
        alert("براہ کرم تصویر Upload کریں یا URL پیسٹ کریں ⚠️");
        return;
    }

    const productRef = push(ref(db,"products"));

    const product = {
        title: title,
        price: price,
        oldPrice: document.getElementById("oldPrice").value,
        discount: document.getElementById("discount").value,
        image: image, // اب یہاں صرف لنک جائے گا
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
        uploadedFile = null;
        showTab('upload');
        window.scrollTo(0,0);
    })
.catch((error)=>{
        alert("Firebase Error: " + error.message);
    });
});
