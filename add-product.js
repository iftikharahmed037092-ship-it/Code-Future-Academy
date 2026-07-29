/*==================================================
 CFA AI ADMIN ADD PRODUCT JS v4.0 FINAL
 DB + STORAGE + URL + NO CRASH
==================================================*/

import { db, storage } from "./firebase.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
import { ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

const productForm = document.getElementById("productForm");
const imageUpload = document.getElementById("imageUpload");
const imageUrl = document.getElementById("imageUrl");
const imagePreview = document.getElementById("imagePreview");
const finalImage = document.getElementById("finalImage");
let uploadedFile = null;

window.showTab = function(tab) {
    document.querySelectorAll('.img-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(div => div.classList.remove('active'));
    document.querySelector(`.img-tab[onclick*="${tab}"]`).classList.add('active');
    document.getElementById(tab+'Tab').classList.add('active');
}

imageUpload.addEventListener("change", (e)=>{
    uploadedFile = e.target.files[0];
    if(uploadedFile){
        const reader = new FileReader();
        reader.onload = (event)=>{ imagePreview.src = event.target.result; finalImage.value = "file"; }
        reader.readAsDataURL(uploadedFile);
    }
});

imageUrl.addEventListener("input", (e)=>{
    uploadedFile = null;
    if(e.target.value.trim()!== ""){ imagePreview.src = e.target.value; finalImage.value = e.target.value; } 
    else { imagePreview.src = "images/no-image.png"; finalImage.value = ""; }
});

productForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const title = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value;
    let image = finalImage.value;

    if(!title || !price || price <= 0){ alert("Name اور Price لازمی ہیں ⚠️"); return; }

    // اگر فائل اپلوڈ کی ہے
    if(uploadedFile){
        try{
            alert("تصویر اپلوڈ ہو رہی ہے...");
            const storageRef = sRef(storage, `products/${Date.now()}_${uploadedFile.name}`);
            const snapshot = await uploadBytes(storageRef, uploadedFile);
            image = await getDownloadURL(snapshot.ref); // لنک مل گیا
        } catch(err){ alert("اپلوڈ فیل: " + err.message); return; }
    }

    if(!image || image === "file"){ alert("تصویر لازمی ہے ⚠️"); return; }

    const productRef = push(ref(db,"products"));
    const product = {
        title, price,
        oldPrice: document.getElementById("oldPrice").value,
        discount: document.getElementById("discount").value,
        image, // اب یہاں ہمیشہ لنک ہوگا
        category: document.getElementById("productCategory").value,
        badge: document.getElementById("productBadge").value,
        stock: document.getElementById("productStock").value,
        rating: document.getElementById("productRating").value,
        description: document.getElementById("productDescription").value,
        createdAt: Date.now()
    };

    set(productRef, product)
   .then(()=>{ alert("Product Added ✅"); productForm.reset(); imagePreview.src="images/no-image.png"; finalImage.value=""; uploadedFile=null; showTab('upload'); window.scrollTo(0,0); })
   .catch((error)=>{ alert("Error: " + error.message); });
});
