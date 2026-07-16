/*==================================================
    CHECKOUT.JS
    PART 1
    IMPORTS + URL + PRODUCT LOADING
==================================================*/

/*==============================
FIREBASE IMPORTS
==============================*/

import { db } from "./firebase.js";

import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";


/*==============================
URL PARAMETERS
==============================*/

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");


/*==============================
HTML ELEMENTS
==============================*/

const productImage =
document.getElementById("productImage");

const productTitle =
document.getElementById("productTitle");

const productCategory =
document.getElementById("productCategory");

const productPrice =
document.getElementById("productPrice");

const paymentAmount =
document.getElementById("paymentAmount");

const summaryPrice =
document.getElementById("summaryPrice");

const totalAmount =
document.getElementById("totalAmount");

const sellerName =
document.getElementById("sellerName");

const loadingBox =
document.getElementById("loadingBox");


/*==============================
GLOBAL PRODUCT
==============================*/

let currentProduct = null;


/*==============================
SHOW LOADING
==============================*/

function showLoading(){

    loadingBox.style.display="flex";

}


/*==============================
HIDE LOADING
==============================*/

function hideLoading(){

    loadingBox.style.display="none";

}


/*==============================
LOAD PRODUCT
==============================*/

async function loadProduct(){

    if(!productId){

        alert("Product Not Found");

        window.location.href="products.html";

        return;

    }

    showLoading();

    try{

        const snapshot =
        await get(
            ref(db,"products/"+productId)
        );

        if(!snapshot.exists()){

            alert("Product Not Found");

            window.location.href="products.html";

            return;

        }

        currentProduct = snapshot.val();

        updateProductUI();

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

    hideLoading();

}


/*==============================
UPDATE PRODUCT UI
==============================*/

function updateProductUI(){

    productImage.src =
    currentProduct.image || "";

    productTitle.textContent =
    currentProduct.title || "Product";

    productCategory.textContent =
    currentProduct.category || "Other";

    sellerName.textContent =
    currentProduct.sellerName ||
    "Code Future Academy AI";

    const price =
    Number(currentProduct.price || 0);

    productPrice.textContent =
    "Rs " + price;

    paymentAmount.textContent =
    "Rs " + price;

    summaryPrice.textContent =
    "Rs " + price;

    totalAmount.textContent =
    "Rs " + price;

}


/*==============================
START
==============================*/

loadProduct();

/*==================================================
    CHECKOUT.JS
    PART 2
    PAYMENT METHODS + STEP PROGRESS
==================================================*/


/*==============================
HTML ELEMENTS
==============================*/

const paymentCards =
document.querySelectorAll(".payment-card");

const paymentRadios =
document.querySelectorAll(
'input[name="payment"]'
);

const paymentDetails =
document.getElementById(
"paymentDetails"
);

const progressItems =
document.querySelectorAll(
".progress-item"
);

const progressLines =
document.querySelectorAll(
".line"
);


/*==============================
SET ACTIVE STEP
==============================*/

function setStep(step){

progressItems.forEach((item,index)=>{

item.classList.remove("active");

if(index<step){

item.classList.add("active");

}

});

progressLines.forEach((line,index)=>{

line.classList.remove("active");

if(index<step-1){

line.classList.add("active");

}

});

}


/*==============================
SHOW PAYMENT DETAILS
==============================*/

function updatePaymentMethod(){

let selected="";

paymentRadios.forEach((radio)=>{

if(radio.checked){

selected=radio.value;

}

});


paymentCards.forEach((card)=>{

card.classList.remove("active");

const radio=
card.querySelector("input");

if(radio.checked){

card.classList.add("active");

}

});


if(selected==="Cash On Delivery"){

paymentDetails.style.display="none";

}

else{

paymentDetails.style.display="block";

}


setStep(2);

}


/*==============================
PAYMENT EVENTS
==============================*/

paymentRadios.forEach((radio)=>{

radio.addEventListener(

"change",

updatePaymentMethod

);

});


/*==============================
DEFAULT
==============================*/

updatePaymentMethod();

/*==================================================
    CHECKOUT.JS
    PART 3
    PAYMENT DETAILS FROM FIREBASE
==================================================*/


/*==============================
HTML ELEMENTS
==============================*/

const accountName =
document.getElementById("accountName");

const paymentNumber =
document.getElementById("paymentNumber");


/*==============================
PAYMENT DATA
==============================*/

let paymentData = {};


/*==============================
LOAD PAYMENT SETTINGS
==============================*/

async function loadPaymentSettings(){

    try{

        const snapshot =
        await get(
            ref(db,"settings/payment")
        );

        if(snapshot.exists()){

            paymentData =
            snapshot.val();

        }

    }

    catch(error){

        console.error(error);

    }

}


/*==============================
UPDATE PAYMENT INFO
==============================*/

function updatePaymentInfo(){

    let selected = "";

    paymentRadios.forEach((radio)=>{

        if(radio.checked){

            selected = radio.value;

        }

    });

    if(selected==="JazzCash"){

        accountName.textContent =
        paymentData.jazzcash?.accountName ||
        "Not Available";

        paymentNumber.textContent =
        paymentData.jazzcash?.number ||
        "Not Available";

    }

    else if(selected==="EasyPaisa"){

        accountName.textContent =
        paymentData.easypaisa?.accountName ||
        "Not Available";

        paymentNumber.textContent =
        paymentData.easypaisa?.number ||
        "Not Available";

    }

    else if(selected==="Bank Transfer"){

        accountName.textContent =
        paymentData.bank?.accountName ||
        "Not Available";

        paymentNumber.textContent =
        paymentData.bank?.number ||
        "Not Available";

    }

    else{

        accountName.textContent = "-";

        paymentNumber.textContent = "-";

    }

}


/*==============================
PAYMENT CHANGE
==============================*/

paymentRadios.forEach((radio)=>{

    radio.addEventListener("change",()=>{

        updatePaymentMethod();

        updatePaymentInfo();

    });

});


/*==============================
START
==============================*/

await loadPaymentSettings();

updatePaymentInfo();

/*==================================================
    CHECKOUT.JS
    PART 4
    BUYER FORM VALIDATION
==================================================*/


/*==============================
FORM ELEMENTS
==============================*/

const checkoutForm =
document.getElementById("checkoutForm");

const customerName =
document.getElementById("customerName");

const customerEmail =
document.getElementById("customerEmail");

const phone =
document.getElementById("phone");

const country =
document.getElementById("country");

const province =
document.getElementById("province");

const city =
document.getElementById("city");

const postalCode =
document.getElementById("postalCode");

const address =
document.getElementById("address");

const orderNotes =
document.getElementById("orderNotes");

const acceptTerms =
document.getElementById("acceptTerms");

const transactionId =
document.getElementById("transactionId");


/*==============================
EMAIL CHECK
==============================*/

function validEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/*==============================
PHONE CHECK
==============================*/

function validPhone(number){

    return /^[0-9+\-\s]{10,15}$/.test(number);

}


/*==============================
VALIDATE FORM
==============================*/

function validateForm(){

    if(customerName.value.trim()===""){

        alert("Please enter your Full Name.");

        customerName.focus();

        return false;

    }

    if(!validEmail(customerEmail.value.trim())){

        alert("Please enter a valid Email Address.");

        customerEmail.focus();

        return false;

    }

    if(!validPhone(phone.value.trim())){

        alert("Please enter a valid Phone Number.");

        phone.focus();

        return false;

    }

    if(province.value.trim()===""){

        alert("Please enter Province / State.");

        province.focus();

        return false;

    }

    if(city.value.trim()===""){

        alert("Please enter City.");

        city.focus();

        return false;

    }

    if(address.value.trim()===""){

        alert("Please enter Complete Address.");

        address.focus();

        return false;

    }


    /*--------------------------
    PAYMENT CHECK
    --------------------------*/

    let selectedPayment="";

    paymentRadios.forEach((radio)=>{

        if(radio.checked){

            selectedPayment=radio.value;

        }

    });

    if(selectedPayment!=="Cash On Delivery"){

        if(transactionId.value.trim()===""){

            alert("Please enter Transaction ID.");

            transactionId.focus();

            return false;

        }

    }


    /*--------------------------
    TERMS CHECK
    --------------------------*/

    if(!acceptTerms.checked){

        alert("Please accept Terms & Conditions.");

        acceptTerms.focus();

        return false;

    }

    return true;

  }


/*==================================================
    CHECKOUT.JS
    PART 5A
    SAVE ORDER TO FIREBASE
==================================================*/

/*==============================
FIREBASE IMPORTS
==============================*/

import{
    push
}from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";


/*==============================
PREVENT DOUBLE SUBMIT
==============================*/

let orderProcessing=false;


/*==============================
SAVE ORDER
==============================*/

async function saveOrder(){

    if(orderProcessing) return;

    if(!validateForm()) return;

    orderProcessing=true;

    showLoading();

    try{

        const selectedPayment =
        document.querySelector(
        'input[name="payment"]:checked'
        ).value;

        const orderData={

            orderId:
            "ORD-"+Date.now(),

            productId:
            productId,

            productTitle:
            currentProduct.title || "",

            productPrice:
            Number(currentProduct.price || 0),

            productImage:
            currentProduct.image || "",

            buyerName:
            customerName.value.trim(),

            buyerEmail:
            customerEmail.value.trim(),

            buyerPhone:
            phone.value.trim(),

            country:
            country.value,

            province:
            province.value.trim(),

            city:
            city.value.trim(),

            postalCode:
            postalCode.value.trim(),

            address:
            address.value.trim(),

            notes:
            orderNotes.value.trim(),

            paymentMethod:
            selectedPayment,

            transactionId:
            transactionId.value.trim(),

            status:
            "Pending",

            createdAt:
            Date.now()

        };

        const orderRef=
        push(ref(db,"orders"));

        await set(orderRef,orderData);

        hideLoading();

        orderProcessing=false;

        orderSuccess();

    }

    catch(error){

        hideLoading();

        orderProcessing=false;

        console.error(error);

        alert(error.message);

    }

}


/*==============================
FORM SUBMIT
==============================*/

checkoutForm.addEventListener(

"submit",

function(e){

    e.preventDefault();

    saveOrder();

});

/*==================================================
    CHECKOUT.JS
    PART 5B
    SUCCESS POPUP + COMPLETE ORDER
==================================================*/


/*==============================
HTML ELEMENTS
==============================*/

const successPopup =
document.getElementById("successPopup");

const continueBtn =
document.getElementById("continueBtn");


/*==============================
ORDER SUCCESS
==============================*/

function orderSuccess(){

    /* STEP 3 ACTIVE */

    setStep(3);

    /* SHOW POPUP */

    successPopup.classList.add("show");

}


/*==============================
CONTINUE BUTTON
==============================*/

continueBtn.addEventListener(

"click",

()=>{

    successPopup.classList.remove("show");

    checkoutForm.reset();

    paymentDetails.style.display="none";

    updatePaymentMethod();

    updatePaymentInfo();

    window.location.href="products.html";

}

);


/*==============================
ESC KEY CLOSE
==============================*/

document.addEventListener(

"keydown",

(event)=>{

if(event.key==="Escape"){

successPopup.classList.remove("show");

}

}

);


/*==============================
CLICK OUTSIDE
==============================*/

successPopup.addEventListener(

"click",

(event)=>{

if(event.target===successPopup){

successPopup.classList.remove("show");

}

}

);


/*==============================
AUTO SCROLL TOP
==============================*/

window.scrollTo({

top:0,

behavior:"smooth"

});


/*==============================
READY
==============================*/

console.log(

"Checkout Page Ready."

);

/*==================================================
    CHECKOUT.JS
    PART 6
    PRODUCT SUMMARY + LIVE TOTAL
==================================================*/


/*==============================
HTML ELEMENTS
==============================*/

const productImage =
document.getElementById("productImage");

const productTitle =
document.getElementById("productTitle");

const productCategory =
document.getElementById("productCategory");

const productPrice =
document.getElementById("productPrice");

const summaryPrice =
document.getElementById("summaryPrice");

const totalAmount =
document.getElementById("totalAmount");

const paymentAmount =
document.getElementById("paymentAmount");


/*==============================
CURRENT PRODUCT
==============================*/

let currentProduct = {};


/*==============================
LOAD PRODUCT
==============================*/

async function loadProduct(productId){

    try{

        const snapshot =
        await get(
            ref(db,"products/"+productId)
        );

        if(!snapshot.exists()){

            alert("Product Not Found");

            return;

        }

        currentProduct = snapshot.val();

        updateProductUI();

    }

    catch(error){

        console.error(error);

    }

}


/*==============================
UPDATE PRODUCT UI
==============================*/

function updateProductUI(){

    productImage.src =
    currentProduct.image ||
    "images/no-image.png";

    productTitle.textContent =
    currentProduct.title ||
    "Untitled Product";

    productCategory.textContent =
    currentProduct.category ||
    "Other";

    const price =
    Number(currentProduct.price || 0);

    productPrice.textContent =
    "Rs " + price;

    summaryPrice.textContent =
    "Rs " + price;

    totalAmount.textContent =
    "Rs " + price;

    paymentAmount.textContent =
    "Rs " + price;

}


/*==============================
GET PRODUCT ID
==============================*/

const urlParams =
new URLSearchParams(
window.location.search
);

const productId =
urlParams.get("id");


/*==============================
START
==============================*/

if(productId){

    loadProduct(productId);

}

/*==================================================
    CHECKOUT.JS
    PART 7
    QUANTITY + LIVE TOTAL
==================================================*/

/*==============================
QUANTITY ELEMENTS
==============================*/

const minusQty =
document.getElementById("minusQty");

const plusQty =
document.getElementById("plusQty");

const quantityValue =
document.getElementById("quantityValue");


/*==============================
DEFAULT VALUES
==============================*/

let quantity = 1;

let productPrice = 0;


/*==============================
UPDATE TOTAL
==============================*/

function updateTotal(){

    productPrice =
    Number(currentProduct.price || 0);

    const total =
    productPrice * quantity;

    quantityValue.textContent =
    quantity;

    summaryPrice.textContent =
    "Rs " + productPrice;

    totalAmount.textContent =
    "Rs " + total;

    paymentAmount.textContent =
    "Rs " + total;

}


/*==============================
PLUS BUTTON
==============================*/

plusQty.addEventListener(

    "click",

    () => {

        quantity++;

        updateTotal();

    }

);


/*==============================
MINUS BUTTON
==============================*/

minusQty.addEventListener(

    "click",

    () => {

        if(quantity > 1){

            quantity--;

            updateTotal();

        }

    }

);


/*==============================
UPDATE AFTER PRODUCT LOAD
==============================*/

const oldUpdateProductUI =
updateProductUI;

updateProductUI = function(){

    oldUpdateProductUI();

    updateTotal();

};

/*==================================================
    CHECKOUT.JS
    PART 8
    SAVE QUANTITY + TOTAL
==================================================*/


/*==============================
GET FINAL TOTAL
==============================*/

function getFinalTotal(){

    return Number(currentProduct.price || 0)
    * quantity;

}


/*==============================
ORDER OBJECT
==============================*/

function createOrderObject(){

    return{

        productId: productId,

        productTitle:
        currentProduct.title || "",

        productImage:
        currentProduct.image || "",

        productCategory:
        currentProduct.category || "",

        productPrice:
        Number(currentProduct.price || 0),

        quantity:
        quantity,

        totalAmount:
        getFinalTotal(),

        customerName:
        customerName.value.trim(),

        customerEmail:
        customerEmail.value.trim(),

        phone:
        phone.value.trim(),

        country:
        country.value,

        province:
        province.value.trim(),

        city:
        city.value.trim(),

        postalCode:
        postalCode.value.trim(),

        address:
        address.value.trim(),

        notes:
        orderNotes.value.trim(),

        paymentMethod:
        document.querySelector(
        'input[name="payment"]:checked'
        ).value,

        transactionId:
        transactionId.value.trim(),

        orderStatus:
        "Pending",

        createdAt:
        Date.now()

    };

}
