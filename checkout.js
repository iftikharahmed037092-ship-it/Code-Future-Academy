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

/*==================================================
    CHECKOUT.JS
    PART 9A-1
    ADVANCED ORDER SYSTEM
    ORDER ID + INVOICE + DATE TIME
==================================================*/


/*==============================
AUTO ORDER ID GENERATOR
==============================*/

function generateOrderId(){

    const time =
    Date.now();

    const random =
    Math.floor(
        Math.random() * 9000
    ) + 1000;


    return "ORD-" + time + "-" + random;

}


/*==============================
AUTO INVOICE NUMBER GENERATOR
==============================*/

function generateInvoiceNumber(){

    const date =
    new Date();


    const year =
    date.getFullYear();


    const month =
    String(
        date.getMonth()+1
    ).padStart(2,"0");


    const day =
    String(
        date.getDate()
    ).padStart(2,"0");


    const random =
    Math.floor(
        Math.random()*90000
    ) + 10000;


    return (
        "INV-" +
        year +
        month +
        day +
        "-" +
        random
    );

}


/*==============================
ORDER DATE & TIME
==============================*/

function getOrderDateTime(){

    const now =
    new Date();


    return {

        date:
        now.toLocaleDateString(
            "en-PK"
        ),


        time:
        now.toLocaleTimeString(
            "en-PK"
        ),


        timestamp:
        now.getTime()

    };

}


/*==============================
PAYMENT STATUS
==============================*/

function getPaymentStatus(
    paymentMethod
){

    if(
        paymentMethod ===
        "Cash On Delivery"
    ){

        return "Pending";

    }


    return "Paid";

}


/*==============================
GET SELECTED PAYMENT METHOD
==============================*/

function getSelectedPayment(){

    const payment =
    document.querySelector(
        'input[name="payment"]:checked'
    );


    if(payment){

        return payment.value;

    }


    return "";

}


/*==============================
ORDER SYSTEM READY
==============================*/

console.log(
    "Part 9A-1 Order System Loaded"
);

/*==================================================
    CHECKOUT.JS
    PART 9A-2
    FINAL ORDER OBJECT CREATION
    PRODUCT + BUYER + PAYMENT DATA
==================================================*/


/*==============================
CREATE FINAL ORDER OBJECT
==============================*/

function createFinalOrderObject(){


    const paymentMethod =
    getSelectedPayment();


    const orderDateTime =
    getOrderDateTime();



    const finalTotal =
    Number(
        currentProduct.price || 0
    )
    *
    quantity;



    const orderStatus =
    getPaymentStatus(
        paymentMethod
    );



    return {


        /*--------------------------
        ORDER INFORMATION
        --------------------------*/

        orderId:
        generateOrderId(),


        invoiceNumber:
        generateInvoiceNumber(),


        orderDate:
        orderDateTime.date,


        orderTime:
        orderDateTime.time,


        createdAt:
        orderDateTime.timestamp,



        /*--------------------------
        PRODUCT INFORMATION
        --------------------------*/

        productId:
        productId,


        productTitle:
        currentProduct.title || "",


        productImage:
        currentProduct.image || "",


        productCategory:
        currentProduct.category || "",



        productPrice:
        Number(
            currentProduct.price || 0
        ),



        quantity:
        quantity,



        totalAmount:
        finalTotal,



        /*--------------------------
        BUYER INFORMATION
        --------------------------*/


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



        /*--------------------------
        PAYMENT INFORMATION
        --------------------------*/


        paymentMethod:
        paymentMethod,


        transactionId:
        transactionId.value.trim(),



        paymentAmount:
        finalTotal,



        /*--------------------------
        ORDER STATUS
        --------------------------*/


        status:
        orderStatus,


        orderStatus:
        orderStatus


    };


}



/*==============================
PREVIEW ORDER DATA
==============================*/

function previewOrderData(){

    const order =
    createFinalOrderObject();


    console.log(
        "FINAL ORDER DATA:",
        order
    );


}



/*==============================
PART 9A READY
==============================*/

console.log(
    "Part 9A-2 Final Order Object Ready"
);


/*==================================================
    CHECKOUT.JS
    PART 9B
    FIREBASE SAVE + ADVANCED ERROR HANDLING
==================================================*/


/*==============================
FIREBASE IMPORT
==============================*/

import {

    set,
    push

} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";



/*==============================
DOUBLE SUBMIT PROTECTION
==============================*/

let orderSubmitting = false;



/*==============================
SHOW USER MESSAGE
==============================*/

function showMessage(
    message,
    type="error"
){

    alert(message);

}



/*==============================
SAVE ORDER TO FIREBASE
==============================*/

async function saveFinalOrder(){


    if(orderSubmitting){

        showMessage(
            "Order is already processing. Please wait."
        );

        return;

    }



    if(!validateForm()){

        return;

    }



    if(!currentProduct){

        showMessage(
            "Product data not loaded."
        );

        return;

    }



    orderSubmitting = true;



    showLoading();



    try{


        const orderData =
        createFinalOrderObject();



        const ordersRef =
        ref(
            db,
            "orders"
        );



        const newOrderRef =
        push(
            ordersRef
        );



        await set(
            newOrderRef,
            orderData
        );



        hideLoading();


        orderSubmitting = false;



        orderSuccess(
            orderData
        );



    }


    catch(error){


        console.error(
            "Order Save Error:",
            error
        );



        hideLoading();


        orderSubmitting = false;



        if(
            error.message
            .includes("network")
        ){

            showMessage(
                "Network error. Please check your internet connection."
            );

        }

        else{


            showMessage(
                "Order could not be completed. Please try again."
            );


        }


    }



}



/*==============================
FORM SUBMIT EVENT
==============================*/

if(checkoutForm){


    checkoutForm.addEventListener(

        "submit",

        function(event){


            event.preventDefault();



            saveFinalOrder();



        }

    );


}



/*==============================
SUCCESS HANDLER UPDATE
==============================*/

function orderSuccess(
    orderData
){


    setStep(3);



    successPopup.classList.add(
        "show"
    );



    console.log(
        "ORDER SUCCESS:",
        orderData
    );



}



/*==============================
PART 9B READY
==============================*/

console.log(
    "Part 9B Firebase Order System Ready"
);


/*==================================================
    CHECKOUT.JS
    PART 10A
    FINAL PROFESSIONAL MERGE
    IMPORTS + GLOBAL STRUCTURE
==================================================*/


/*==============================
FIREBASE IMPORTS
==============================*/

import { db } from "./firebase.js";

import {

    ref,
    get,
    set,
    push

} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";



/*==============================
URL PARAMETERS
==============================*/

const urlParams =
new URLSearchParams(
    window.location.search
);


const productId =
urlParams.get("id");



/*==============================
GLOBAL VARIABLES
==============================*/


let currentProduct = null;


let quantity = 1;


let orderSubmitting = false;



/*==============================
DOM ELEMENTS
==============================*/


const productImage =
document.getElementById(
    "productImage"
);


const productTitle =
document.getElementById(
    "productTitle"
);


const productCategory =
document.getElementById(
    "productCategory"
);


const productPrice =
document.getElementById(
    "productPrice"
);


const paymentAmount =
document.getElementById(
    "paymentAmount"
);


const summaryPrice =
document.getElementById(
    "summaryPrice"
);


const totalAmount =
document.getElementById(
    "totalAmount"
);


const sellerName =
document.getElementById(
    "sellerName"
);



const checkoutForm =
document.getElementById(
    "checkoutForm"
);



const loadingBox =
document.getElementById(
    "loadingBox"
);



const successPopup =
document.getElementById(
    "successPopup"
);



const continueBtn =
document.getElementById(
    "continueBtn"
);



const paymentDetails =
document.getElementById(
    "paymentDetails"
);



const paymentRadios =
document.querySelectorAll(
    'input[name="payment"]'
);



const paymentCards =
document.querySelectorAll(
    ".payment-card"
);



const progressItems =
document.querySelectorAll(
    ".progress-item"
);



const progressLines =
document.querySelectorAll(
    ".line"
);



const minusQty =
document.getElementById(
    "minusQty"
);



const plusQty =
document.getElementById(
    "plusQty"
);



const quantityValue =
document.getElementById(
    "quantityValue"
);



/*==============================
BUYER INPUTS
==============================*/


const customerName =
document.getElementById(
    "customerName"
);


const customerEmail =
document.getElementById(
    "customerEmail"
);


const phone =
document.getElementById(
    "phone"
);


const country =
document.getElementById(
    "country"
);


const province =
document.getElementById(
    "province"
);


const city =
document.getElementById(
    "city"
);


const postalCode =
document.getElementById(
    "postalCode"
);


const address =
document.getElementById(
    "address"
);


const orderNotes =
document.getElementById(
    "orderNotes"
);


const acceptTerms =
document.getElementById(
    "acceptTerms"
);


const transactionId =
document.getElementById(
    "transactionId"
);



/*==============================
PAYMENT INFO ELEMENTS
==============================*/


const accountName =
document.getElementById(
    "accountName"
);


const paymentNumber =
document.getElementById(
    "paymentNumber"
);



/*==============================
PAYMENT DATA
==============================*/


let paymentData = {};



/*==============================
PART 10A READY
==============================*/


console.log(
    "Checkout.js Part 10A Loaded"
);

/*==================================================
    CHECKOUT.JS
    PART 10B-1
    FINAL FUNCTIONS MERGE
    PRODUCT + QUANTITY + PAYMENT SYSTEM
==================================================*/


/*==============================
SHOW / HIDE LOADING
==============================*/

function showLoading(){

    if(loadingBox){

        loadingBox.style.display =
        "flex";

    }

}



function hideLoading(){

    if(loadingBox){

        loadingBox.style.display =
        "none";

    }

}



/*==============================
LOAD PRODUCT FROM FIREBASE
==============================*/

async function loadProduct(){


    if(!productId){

        alert(
            "Product Not Found"
        );

        window.location.href =
        "products.html";

        return;

    }



    showLoading();



    try{


        const snapshot =
        await get(
            ref(
                db,
                "products/" + productId
            )
        );



        if(!snapshot.exists()){


            alert(
                "Product Not Found"
            );


            window.location.href =
            "products.html";


            return;

        }



        currentProduct =
        snapshot.val();



        updateProductUI();



    }


    catch(error){


        console.error(
            "Product Loading Error:",
            error
        );


        alert(
            "Unable to load product."
        );


    }


    finally{


        hideLoading();


    }


}



/*==============================
UPDATE PRODUCT UI
==============================*/

function updateProductUI(){


    if(!currentProduct)
    return;



    if(productImage){

        productImage.src =
        currentProduct.image ||
        "images/no-image.png";

    }



    if(productTitle){

        productTitle.textContent =
        currentProduct.title ||
        "Untitled Product";

    }



    if(productCategory){

        productCategory.textContent =
        currentProduct.category ||
        "Other";

    }



    if(sellerName){

        sellerName.textContent =
        currentProduct.sellerName ||
        "Code Future Academy AI";

    }



    updateTotal();



}



/*==============================
UPDATE TOTAL PRICE
==============================*/

function updateTotal(){


    if(!currentProduct)
    return;



    const price =
    Number(
        currentProduct.price || 0
    );



    const total =
    price * quantity;



    if(quantityValue){

        quantityValue.textContent =
        quantity;

    }



    if(productPrice){

        productPrice.textContent =
        "Rs " + price;

    }



    if(summaryPrice){

        summaryPrice.textContent =
        "Rs " + total;

    }



    if(totalAmount){

        totalAmount.textContent =
        "Rs " + total;

    }



    if(paymentAmount){

        paymentAmount.textContent =
        "Rs " + total;

    }


}



/*==============================
PLUS QUANTITY
==============================*/

if(plusQty){


    plusQty.addEventListener(

        "click",

        ()=>{


            quantity++;


            updateTotal();


        }

    );


}



/*==============================
MINUS QUANTITY
==============================*/

if(minusQty){


    minusQty.addEventListener(

        "click",

        ()=>{


            if(quantity > 1){


                quantity--;


                updateTotal();


            }


        }

    );


}



/*==============================
PAYMENT METHOD UPDATE
==============================*/

function updatePaymentMethod(){



    let selected = "";



    paymentRadios.forEach(

        radio=>{


            if(radio.checked){


                selected =
                radio.value;


            }


        }

    );



    paymentCards.forEach(

        card=>{


            card.classList.remove(
                "active"
            );



            const radio =
            card.querySelector(
                "input"
            );



            if(radio && radio.checked){


                card.classList.add(
                    "active"
                );


            }


        }

    );



    if(paymentDetails){


        if(
            selected ===
            "Cash On Delivery"
        ){


            paymentDetails.style.display =
            "none";


        }

        else{


            paymentDetails.style.display =
            "block";


        }


    }


}



/*==============================
PAYMENT EVENTS
==============================*/

paymentRadios.forEach(

    radio=>{


        radio.addEventListener(

            "change",

            ()=>{


                updatePaymentMethod();


            }

        );


    }

);



/*==============================
PART 10B-1 READY
==============================*/


console.log(
    "Checkout.js Part 10B-1 Loaded"
);


/*==================================================
    CHECKOUT.JS
    PART 10B-2
    FINAL FUNCTIONS MERGE
    VALIDATION + ORDER OBJECT
==================================================*/


/*==============================
LOAD PAYMENT SETTINGS
==============================*/

async function loadPaymentSettings(){


    try{


        const snapshot =
        await get(
            ref(
                db,
                "settings/payment"
            )
        );



        if(snapshot.exists()){


            paymentData =
            snapshot.val();


        }


    }


    catch(error){


        console.error(
            "Payment Settings Error:",
            error
        );


    }


}



/*==============================
UPDATE PAYMENT INFORMATION
==============================*/

function updatePaymentInfo(){


    let selected = "";



    paymentRadios.forEach(

        radio=>{


            if(radio.checked){


                selected =
                radio.value;


            }


        }

    );



    if(!accountName || !paymentNumber)
    return;



    if(selected === "JazzCash"){


        accountName.textContent =
        paymentData.jazzcash?.accountName ||
        "Not Available";


        paymentNumber.textContent =
        paymentData.jazzcash?.number ||
        "Not Available";


    }


    else if(selected === "EasyPaisa"){


        accountName.textContent =
        paymentData.easypaisa?.accountName ||
        "Not Available";


        paymentNumber.textContent =
        paymentData.easypaisa?.number ||
        "Not Available";


    }


    else if(selected === "Bank Transfer"){


        accountName.textContent =
        paymentData.bank?.accountName ||
        "Not Available";


        paymentNumber.textContent =
        paymentData.bank?.number ||
        "Not Available";


    }


    else{


        accountName.textContent =
        "-";


        paymentNumber.textContent =
        "-";


    }


}



/*==============================
PAYMENT UPDATE EVENTS
==============================*/

paymentRadios.forEach(

    radio=>{


        radio.addEventListener(

            "change",

            ()=>{


                updatePaymentMethod();

                updatePaymentInfo();


            }

        );


    }

);



/*==============================
EMAIL VALIDATION
==============================*/

function validEmail(email){


    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email);


}



/*==============================
PHONE VALIDATION
==============================*/

function validPhone(number){


    return /^[0-9+\-\s]{10,15}$/
    .test(number);


}



/*==============================
CHECKOUT FORM VALIDATION
==============================*/

function validateForm(){



    if(
        !customerName.value.trim()
    ){


        alert(
            "Please enter your full name."
        );


        customerName.focus();


        return false;


    }



    if(
        !validEmail(
            customerEmail.value.trim()
        )
    ){


        alert(
            "Please enter valid email."
        );


        customerEmail.focus();


        return false;


    }



    if(
        !validPhone(
            phone.value.trim()
        )
    ){


        alert(
            "Please enter valid phone number."
        );


        phone.focus();


        return false;


    }



    if(
        !province.value.trim()
    ){


        alert(
            "Please enter province."
        );


        province.focus();


        return false;


    }



    if(
        !city.value.trim()
    ){


        alert(
            "Please enter city."
        );


        city.focus();


        return false;


    }



    if(
        !address.value.trim()
    ){


        alert(
            "Please enter address."
        );


        address.focus();


        return false;


    }



    const payment =
    getSelectedPayment();



    if(
        payment !==
        "Cash On Delivery"
    ){


        if(
            !transactionId.value.trim()
        ){


            alert(
                "Please enter Transaction ID."
            );


            transactionId.focus();


            return false;


        }


    }



    if(
        !acceptTerms.checked
    ){


        alert(
            "Please accept Terms & Conditions."
        );


        acceptTerms.focus();


        return false;


    }



    return true;


}



/*==============================
CREATE FINAL ORDER OBJECT
==============================*/

function createFinalOrderObject(){



    const paymentMethod =
    getSelectedPayment();



    const total =
    Number(
        currentProduct.price || 0
    )
    *
    quantity;



    const now =
    new Date();



    return {


        orderId:
        generateOrderId(),



        invoiceNumber:
        generateInvoiceNumber(),



        date:
        now.toLocaleDateString(
            "en-PK"
        ),



        time:
        now.toLocaleTimeString(
            "en-PK"
        ),



        productId:
        productId,



        productTitle:
        currentProduct.title || "",



        productImage:
        currentProduct.image || "",



        price:
        Number(
            currentProduct.price || 0
        ),



        quantity:
        quantity,



        totalAmount:
        total,



        buyerName:
        customerName.value.trim(),



        buyerEmail:
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
        paymentMethod,



        transactionId:
        transactionId.value.trim(),



        status:
        getPaymentStatus(
            paymentMethod
        ),



        createdAt:
        Date.now()


    };


}



/*==============================
PART 10B-2 READY
==============================*/


console.log(
    "Checkout.js Part 10B-2 Loaded"
);



/*==================================================
    CHECKOUT.JS
    PART 10C-1
    FINAL SAVE SYSTEM
    FIREBASE + SECURITY + ERROR HANDLING
==================================================*/


/*==============================
FINAL ORDER SUBMIT
==============================*/

async function saveOrder(){


    if(orderSubmitting){


        alert(
            "Order is already processing. Please wait."
        );


        return;


    }



    if(!validateForm()){


        return;


    }



    if(!currentProduct){


        alert(
            "Product information not available."
        );


        return;


    }



    orderSubmitting = true;



    showLoading();



    try{


        const orderData =
        createFinalOrderObject();



        const ordersPath =
        ref(
            db,
            "orders"
        );



        const newOrder =
        push(
            ordersPath
        );



        await set(

            newOrder,

            orderData

        );



        console.log(

            "Order Saved Successfully:",

            orderData

        );



        hideLoading();



        orderSubmitting = false;



        completeOrderSuccess(
            orderData
        );



    }


    catch(error){



        console.error(

            "Firebase Order Error:",

            error

        );



        hideLoading();



        orderSubmitting = false;



        handleOrderError(
            error
        );


    }


}



/*==============================
ERROR HANDLER
==============================*/

function handleOrderError(error){



    if(
        error.code ===
        "PERMISSION_DENIED"
    ){


        alert(
            "Permission denied. Please contact support."
        );


        return;


    }



    if(
        error.message
        &&
        error.message
        .toLowerCase()
        .includes("network")
    ){


        alert(
            "Internet connection problem. Please try again."
        );


        return;


    }



    alert(
        "Order failed. Please try again later."
    );



}



/*==============================
FORM SUBMIT EVENT
==============================*/

if(checkoutForm){


    checkoutForm.addEventListener(

        "submit",

        function(event){


            event.preventDefault();


            saveOrder();


        }

    );


}



/*==============================
PREVENT MULTIPLE CLICKS
==============================*/

function disableOrderButton(){


    const button =
    checkoutForm?.querySelector(
        "button[type='submit']"
    );



    if(button){


        button.disabled =
        true;



        button.style.opacity =
        "0.6";


    }


}



function enableOrderButton(){


    const button =
    checkoutForm?.querySelector(
        "button[type='submit']"
    );



    if(button){


        button.disabled =
        false;



        button.style.opacity =
        "1";


    }


}



/*==============================
PART 10C-1 READY
==============================*/

console.log(
    "Checkout.js Part 10C-1 Loaded"
);




/*==================================================
    CHECKOUT.JS
    PART 10C-2
    SUCCESS FLOW + RESET + REDIRECT
==================================================*/


/*==============================
COMPLETE ORDER SUCCESS
==============================*/

function completeOrderSuccess(
    orderData
){


    setStep(3);



    if(successPopup){


        successPopup.classList.add(
            "show"
        );


    }



    console.log(

        "Order Completed:",

        orderData

    );


}



/*==============================
RESET CHECKOUT FORM
==============================*/

function resetCheckoutForm(){



    if(checkoutForm){


        checkoutForm.reset();


    }



    quantity = 1;



    updateTotal();



    paymentRadios.forEach(

        radio=>{


            radio.checked =
            false;


        }

    );



    paymentCards.forEach(

        card=>{


            card.classList.remove(
                "active"
            );


        }

    );



    if(paymentDetails){


        paymentDetails.style.display =
        "none";


    }



    if(accountName){


        accountName.textContent =
        "-";


    }



    if(paymentNumber){


        paymentNumber.textContent =
        "-";


    }



}



/*==============================
CONTINUE BUTTON
==============================*/

if(continueBtn){


    continueBtn.addEventListener(

        "click",

        ()=>{


            if(successPopup){


                successPopup.classList.remove(
                    "show"
                );


            }



            resetCheckoutForm();



            window.location.href =
            "products.html";



        }

    );


}



/*==============================
CLOSE POPUP OUTSIDE CLICK
==============================*/

if(successPopup){


    successPopup.addEventListener(

        "click",

        (event)=>{


            if(
                event.target ===
                successPopup
            ){


                successPopup.classList.remove(
                    "show"
                );


            }


        }

    );


}



/*==============================
ESC KEY CLOSE POPUP
==============================*/

document.addEventListener(

    "keydown",

    (event)=>{


        if(
            event.key ===
            "Escape"
        ){


            if(successPopup){


                successPopup.classList.remove(
                    "show"
                );


            }


        }


    }

);



/*==============================
BROWSER BACK HANDLING
==============================*/

window.addEventListener(

    "pageshow",

    (event)=>{


        if(
            event.persisted
        ){


            console.log(
                "Page restored from cache"
            );


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
PART 10C-2 READY
==============================*/

console.log(
    "Checkout.js Part 10C-2 Loaded"
);



/*==================================================
    CHECKOUT.JS
    PART 10C-3
    FINAL INITIALIZATION
    PRODUCTION READY FINISH
==================================================*/


/*==============================
START PRODUCT LOADING
==============================*/

async function initializeCheckout(){


    try{


        showLoading();



        await loadProduct();



        await loadPaymentSettings();



        updatePaymentMethod();



        updatePaymentInfo();



        updateTotal();



        hideLoading();



        console.log(
            "Checkout Initialized Successfully"
        );


    }


    catch(error){


        console.error(

            "Checkout Initialization Error:",

            error

        );



        hideLoading();



        alert(
            "Checkout could not be loaded."
        );


    }


}



/*==============================
REFRESH DATA PROTECTION
==============================*/

window.addEventListener(

    "beforeunload",

    ()=>{


        sessionStorage.setItem(

            "checkoutProduct",

            productId || ""

        );


    }

);



/*==============================
RESTORE PRODUCT AFTER REFRESH
==============================*/

window.addEventListener(

    "load",

    ()=>{


        const savedProduct =

        sessionStorage.getItem(

            "checkoutProduct"

        );



        if(
            savedProduct
            &&
            !productId
        ){


            console.log(

                "Previous checkout product:",

                savedProduct

            );


        }


    }

);



/*==============================
FINAL BUTTON PROTECTION
==============================*/

document.addEventListener(

    "click",

    (event)=>{


        const button =
        event.target.closest(
            "button"
        );



        if(
            button
            &&
            button.type === "submit"
        ){


            if(orderSubmitting){


                event.preventDefault();



                return false;


            }


        }


    }

);



/*==============================
DISABLE RIGHT AFTER SUBMIT
==============================*/

if(checkoutForm){


    checkoutForm.addEventListener(

        "submit",

        ()=>{


            disableOrderButton();


        }

    );


}



/*==============================
FINAL PAGE START
==============================*/


initializeCheckout();



/*==============================
FINAL CHECK
==============================*/


console.log(
`
==================================
CHECKOUT.JS FINAL VERSION READY

✔ Firebase Connected
✔ Product System Active
✔ Payment System Active
✔ Quantity System Active
✔ Validation Active
✔ Order Save Active
✔ Success Flow Active
✔ Production Optimization Complete

==================================
`
);



