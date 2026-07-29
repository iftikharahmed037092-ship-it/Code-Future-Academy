/*==================================================
 CFA AI ADMIN ADD PRODUCT JS v3.1
 COMPRESS IMAGE + NO CRASH FIX
==================================================*/

import { db } from "./firebase.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const productForm = document.getElementById("productForm");
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
IMAGE COMPRESS FUNCTION
==============================*/
function compressImage(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality)); // 70% quality
            };
        };
    });
}

/*==============================
IMAGE PREVIEW
==============================*/
imageUpload.addEventListener("change", async (e)=>{
    const file = e.target.files[0];
    if(file){
        alert("تصویر Compress ہو رہی ہے..."); // بتانے کے لیے
        const compressed = await compressImage(file); // Compress کر دی
        imagePreview.src = compressed;
        finalImage.value = compressed; // اب یہ 200KB سے کم ہوگی
    }
});

imageUrl.addEventListener("input", (e)=>{
    if(e.target.value.trim()!== ""){
        imagePreview.src = e.target.value;
        finalImage.value = e.target.value;
    } else {
        imagePreview.src = "images/no-image.png";
        finalImage.value = "";
    }
});

/*==============================
ADD PRODUCT
==============================*/
productForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const title = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value;
    const image = finalImage.value;

    if(title === "" || price === "" || price <= 0){
        alert("Name اور Price لازمی ہیں ⚠️");
        return;
    }
    if(image === ""){
        alert("تصویر لازمی ہے ⚠️");
        return;
    }

    const productRef = push(ref(db,"products"));

    const product = {
        title, price,
        oldPrice: document.getElementById("oldPrice").value,
        discount: document.getElementById("discount").value,
        image, // اب یہ Compress ہو چکی ہے
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
        window.scrollTo(0,0);
    })
   .catch((error)=>{
        alert("Error: " + error.message);
    });
});
    })
.catch((error)=>{
        alert("Firebase Error: " + error.message);
    });
});
