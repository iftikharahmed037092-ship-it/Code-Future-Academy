/*==================================================
   SETTINGS.JS
   PART 1
   FIREBASE IMPORTS + HTML ELEMENTS
==================================================*/


/*==============================
FIREBASE IMPORTS
==============================*/

import { db, auth } from "./firebase.js";

import {

ref,
get,
set,
update,
onValue

} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

import {

onAuthStateChanged,
updatePassword

} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {

getStorage,
ref as storageRef,
uploadBytes,
getDownloadURL

} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";


/*==============================
FIREBASE STORAGE
==============================*/

const storage = getStorage();


/*==============================
HTML ELEMENTS
==============================*/

const profileTab =
document.getElementById("profileTab");

const storeTab =
document.getElementById("storeTab");

const paymentTab =
document.getElementById("paymentTab");

const securityTab =
document.getElementById("securityTab");

const notificationsTab =
document.getElementById("notificationsTab");

const appearanceTab =
document.getElementById("appearanceTab");


/*==============================
MENU BUTTONS
==============================*/

const menuButtons =
document.querySelectorAll(".menu-btn");


/*==============================
PROFILE INPUTS
==============================*/

const fullName =
document.getElementById("fullName");

const username =
document.getElementById("username");

const email =
document.getElementById("email");

const phone =
document.getElementById("phone");

const bio =
document.getElementById("bio");

const profileImage =
document.getElementById("profileImage");


/*==============================
STORE INPUTS
==============================*/

const storeLogo =
document.getElementById("storeLogo");

const storeBanner =
document.getElementById("storeBanner");

const storeName =
document.getElementById("storeName");

const storeDescription =
document.getElementById("storeDescription");


/*==============================
PAYMENT INPUTS
==============================*/

const jazzCash =
document.getElementById("jazzCash");

const easyPaisa =
document.getElementById("easyPaisa");

const bankAccount =
document.getElementById("bankAccount");

const paypal =
document.getElementById("paypal");


/*==============================
SECURITY INPUTS
==============================*/

const currentPassword =
document.getElementById("currentPassword");

const newPassword =
document.getElementById("newPassword");

const confirmPassword =
document.getElementById("confirmPassword");


/*==============================
NOTIFICATION INPUTS
==============================*/

const emailNotifications =
document.getElementById("emailNotifications");

const orderNotifications =
document.getElementById("orderNotifications");

const messageNotifications =
document.getElementById("messageNotifications");

const promotionNotifications =
document.getElementById("promotionNotifications");


/*==============================
APPEARANCE INPUTS
==============================*/

const theme =
document.getElementById("theme");

const language =
document.getElementById("language");

const currency =
document.getElementById("currency");


/*==============================
BUTTONS
==============================*/

const saveSettings =
document.getElementById("saveSettings");

const resetSettings =
document.getElementById("resetSettings");


/*==============================
CURRENT USER
==============================*/

let currentUser = null;

let currentUid = null;


/*==================================================
   END OF PART 1

   NEXT:
   PART 2

   LOGIN CHECK
   ACTIVE MENU
   TAB SWITCHING
==================================================*/
/*==================================================
   SETTINGS.JS
   PART 2
   LOGIN CHECK + MENU + TAB SWITCHING
==================================================*/


/*==============================
AUTH CHECK
==============================*/

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="login.html";

return;

}

currentUser=user;

currentUid=user.uid;

loadUserData();

});


/*==============================
HIDE ALL TABS
==============================*/

function hideAllTabs(){

profileTab.style.display="none";

storeTab.style.display="none";

paymentTab.style.display="none";

securityTab.style.display="none";

notificationsTab.style.display="none";

appearanceTab.style.display="none";

}


/*==============================
SHOW TAB
==============================*/

function showTab(tabName){

hideAllTabs();

switch(tabName){

case"profile":

profileTab.style.display="block";

break;

case"store":

storeTab.style.display="block";

break;

case"payment":

paymentTab.style.display="block";

break;

case"security":

securityTab.style.display="block";

break;

case"notifications":

notificationsTab.style.display="block";

break;

case"appearance":

appearanceTab.style.display="block";

break;

}

}


/*==============================
ACTIVE MENU
==============================*/

function activeMenu(button){

menuButtons.forEach((btn)=>{

btn.classList.remove("active");

});

button.classList.add("active");

}


/*==============================
MENU CLICK EVENTS
==============================*/

menuButtons.forEach((button)=>{

button.addEventListener("click",()=>{

activeMenu(button);

const tab=

button.dataset.tab;

showTab(tab);

});

});


/*==============================
DEFAULT TAB
==============================*/

hideAllTabs();

profileTab.style.display="block";


/*==================================================
   END OF PART 2

   NEXT:
   PART 3

   LOAD USER DATA
   FIREBASE PROFILE DATA
==================================================*/
/*==================================================
   SETTINGS.JS
   PART 3
   LOAD USER DATA FROM FIREBASE
==================================================*/


/*==============================
LOAD USER DATA
==============================*/

function loadUserData(){

const userRef =
ref(db,"users/"+currentUid);

onValue(userRef,(snapshot)=>{

if(!snapshot.exists()){

return;

}

const data =
snapshot.val();


/*==============================
PROFILE
==============================*/

fullName.value =
data.fullName || "";

username.value =
data.username || "";

email.value =
data.email || currentUser.email || "";

phone.value =
data.phone || "";

bio.value =
data.bio || "";


/*==============================
PROFILE IMAGE
==============================*/

if(data.profileImage){

profileImage.src =
data.profileImage;

}


/*==============================
STORE
==============================*/

storeName.value =
data.storeName || "";

storeDescription.value =
data.storeDescription || "";


/*==============================
PAYMENT
==============================*/

jazzCash.value =
data.jazzCash || "";

easyPaisa.value =
data.easyPaisa || "";

bankAccount.value =
data.bankAccount || "";

paypal.value =
data.paypal || "";


/*==============================
NOTIFICATIONS
==============================*/

emailNotifications.checked =
data.emailNotifications ?? true;

orderNotifications.checked =
data.orderNotifications ?? true;

messageNotifications.checked =
data.messageNotifications ?? true;

promotionNotifications.checked =
data.promotionNotifications ?? false;


/*==============================
APPEARANCE
==============================*/

theme.value =
data.theme || "light";

language.value =
data.language || "en";

currency.value =
data.currency || "PKR";

});

}


/*==================================================
   END OF PART 3

   NEXT:
   PART 4

   SAVE PROFILE
   SAVE STORE
   SAVE PAYMENT
==================================================*/

/*==================================================
   SETTINGS.JS
   PART 4
   SAVE SETTINGS
==================================================*/


/*==============================
SAVE SETTINGS
==============================*/

saveSettings.addEventListener("click",saveUserData);


/*==============================
SAVE USER DATA
==============================*/

function saveUserData(){

if(!currentUid){

alert("User not found");

return;

}

const userData={

/*==============================
PROFILE
==============================*/

fullName:
fullName.value.trim(),

username:
username.value.trim(),

email:
email.value.trim(),

phone:
phone.value.trim(),

bio:
bio.value.trim(),


/*==============================
STORE
==============================*/

storeName:
storeName.value.trim(),

storeDescription:
storeDescription.value.trim(),


/*==============================
PAYMENT
==============================*/

jazzCash:
jazzCash.value.trim(),

easyPaisa:
easyPaisa.value.trim(),

bankAccount:
bankAccount.value.trim(),

paypal:
paypal.value.trim(),


/*==============================
NOTIFICATIONS
==============================*/

emailNotifications:
emailNotifications.checked,

orderNotifications:
orderNotifications.checked,

messageNotifications:
messageNotifications.checked,

promotionNotifications:
promotionNotifications.checked,


/*==============================
APPEARANCE
==============================*/

theme:
theme.value,

language:
language.value,

currency:
currency.value,


/*==============================
UPDATED
==============================*/

updatedAt:
Date.now()

};


update(

ref(db,"users/"+currentUid),

userData

)

.then(()=>{

alert("Settings Saved Successfully");

})

.catch((error)=>{

alert(error.message);

});

}


/*==================================================
   END OF PART 4

   NEXT:
   PART 5

   PROFILE IMAGE
   STORE LOGO
   STORE BANNER
   FIREBASE STORAGE UPLOAD
==================================================*/

/*==================================================
   SETTINGS.JS
   PART 5
   PROFILE IMAGE UPLOAD
==================================================*/


/*==============================
PROFILE IMAGE UPLOAD
==============================*/

const profileImageInput =
document.getElementById("profileImageInput");


if(profileImageInput){

profileImageInput.addEventListener("change",

async(e)=>{

const file =
e.target.files[0];

if(!file){

return;

}

try{

const imageRef =
storageRef(

storage,

"profile-images/"+
currentUid

);

await uploadBytes(

imageRef,

file

);

const imageUrl =
await getDownloadURL(
imageRef
);

profileImage.src =
imageUrl;

await update(

ref(
db,
"users/"+currentUid
),

{

profileImage:imageUrl

}

);

alert(

"Profile Image Updated Successfully"

);

}

catch(error){

alert(error.message);

}

});

}


/*==================================================
   END OF PART 5

   NEXT:
   PART 6

   STORE LOGO
   STORE BANNER
   FIREBASE STORAGE
==================================================*/

/*==================================================
   SETTINGS.JS
   PART 6
   STORE LOGO + STORE BANNER UPLOAD
==================================================*/


/*==============================
STORE LOGO UPLOAD
==============================*/

if(storeLogo){

storeLogo.addEventListener("change",

async(e)=>{

const file=e.target.files[0];

if(!file) return;

try{

const logoRef=
storageRef(
storage,
"store-logo/"+currentUid
);

await uploadBytes(
logoRef,
file
);

const logoUrl=
await getDownloadURL(
logoRef
);

await update(

ref(db,"users/"+currentUid),

{

storeLogo:logoUrl

}

);

alert("Store Logo Updated");

}

catch(error){

alert(error.message);

}

});

}


/*==============================
STORE BANNER UPLOAD
==============================*/

if(storeBanner){

storeBanner.addEventListener("change",

async(e)=>{

const file=e.target.files[0];

if(!file) return;

try{

const bannerRef=
storageRef(
storage,
"store-banner/"+currentUid
);

await uploadBytes(
bannerRef,
file
);

const bannerUrl=
await getDownloadURL(
bannerRef
);

await update(

ref(db,"users/"+currentUid),

{

storeBanner:bannerUrl

}

);

alert("Store Banner Updated");

}

catch(error){

alert(error.message);

}

});

}


/*==================================================
   END OF PART 6

   NEXT:
   PART 7

   PASSWORD UPDATE
   RESET SETTINGS
==================================================*/

/*==================================================
   SETTINGS.JS
   PART 7
   PASSWORD UPDATE + RESET SETTINGS
==================================================*/


/*==============================
CHANGE PASSWORD
==============================*/

if(newPassword){

newPassword.addEventListener("keyup",()=>{

if(newPassword.value.length<6){

newPassword.style.borderColor="#ef4444";

}else{

newPassword.style.borderColor="#10b981";

}

});

}


/*==============================
UPDATE PASSWORD
==============================*/

function changePassword(){

if(newPassword.value===""){

return;

}

if(newPassword.value.length<6){

alert("Password must be at least 6 characters");

return;

}

if(newPassword.value!=confirmPassword.value){

alert("Passwords do not match");

return;

}

updatePassword(

currentUser,

newPassword.value

)

.then(()=>{

alert("Password Updated Successfully");

newPassword.value="";

confirmPassword.value="";

currentPassword.value="";

})

.catch((error)=>{

alert(error.message);

});

}


/*==============================
RESET SETTINGS
==============================*/

resetSettings.addEventListener("click",()=>{

if(!confirm("Reset all unsaved changes?")){

return;

}

loadUserData();

alert("Settings Reset");

});


/*==============================
SAVE BUTTON
==============================*/

saveSettings.addEventListener("click",()=>{

changePassword();

});


/*==================================================
   END OF PART 7

   NEXT:
   PART 8

   DARK MODE
   LANGUAGE
   CURRENCY
   NOTIFICATIONS
==================================================*/

/*==================================================
   SETTINGS.JS
   PART 8
   THEME + LANGUAGE + CURRENCY
==================================================*/


/*==============================
APPLY THEME
==============================*/

function applyTheme(themeName){

if(themeName==="dark"){

document.body.classList.add("dark-mode");

}

else{

document.body.classList.remove("dark-mode");

}

}


/*==============================
THEME CHANGE
==============================*/

theme.addEventListener("change",()=>{

applyTheme(theme.value);

});


/*==============================
LANGUAGE CHANGE
==============================*/

language.addEventListener("change",()=>{

console.log(

"Language Changed :",

language.value

);

});


/*==============================
CURRENCY CHANGE
==============================*/

currency.addEventListener("change",()=>{

console.log(

"Currency Changed :",

currency.value

);

});


/*==============================
NOTIFICATIONS
==============================*/

function notificationStatus(){

return{

email:

emailNotifications.checked,

orders:

orderNotifications.checked,

messages:

messageNotifications.checked,

promotions:

promotionNotifications.checked

};

}


/*==============================
LOAD SAVED THEME
==============================*/

window.addEventListener("load",()=>{

applyTheme(

theme.value

);

});


/*==================================================
   END OF PART 8

   NEXT:
   PART 9

   INITIALIZE PAGE
   AUTO LOAD
   FINAL FUNCTIONS
==================================================*/

/*==================================================
   SETTINGS.JS
   PART 9
   FINAL INITIALIZATION
==================================================*/


/*==============================
INITIALIZE PAGE
==============================*/

function initializeSettings(){

hideAllTabs();

profileTab.style.display="block";

menuButtons.forEach((button)=>{

button.classList.remove("active");

});

if(menuButtons.length>0){

menuButtons[0].classList.add("active");

}

}


/*==============================
AUTO LOAD
==============================*/

window.addEventListener("load",()=>{

initializeSettings();

});


/*==============================
AUTO SAVE STATUS
==============================*/

const allInputs=document.querySelectorAll(

"input, textarea, select"

);

allInputs.forEach((input)=>{

input.addEventListener("change",()=>{

console.log("Settings Changed");

});

});


/*==============================
PREVENT EMPTY STORE NAME
==============================*/

if(storeName){

storeName.addEventListener("blur",()=>{

if(storeName.value.trim()==""){

storeName.value="My Store";

}

});

}


/*==============================
PREVENT EMPTY FULL NAME
==============================*/

if(fullName){

fullName.addEventListener("blur",()=>{

if(fullName.value.trim()==""){

fullName.value=currentUser?.displayName||"Seller";

}

});

}


/*==============================
AUTO EMAIL
==============================*/

if(currentUser){

if(email){

email.value=currentUser.email;

}

}


/*==============================
CONSOLE
==============================*/

console.log(

"Settings Page Loaded Successfully"

);


/*==================================================
   END OF SETTINGS.JS

   FILE COMPLETED
==================================================*/
