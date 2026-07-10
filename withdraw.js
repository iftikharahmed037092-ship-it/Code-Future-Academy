import { db } from "./firebase.js";

import {
ref,
push,
set
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const withdrawBtn =
document.getElementById("withdrawBtn");

withdrawBtn.addEventListener("click",()=>{

const amount =
document.getElementById("amount").value;

const method =
document.getElementById("method").value;

const account =
document.getElementById("account").value;

if(amount=="" || account==""){

alert("Please fill all fields");

return;

}

const withdrawRef =
ref(db,"withdrawRequests");

const newRequest =
push(withdrawRef);

set(newRequest,{

amount:amount,
method:method,
account:account,
status:"Pending",
date:new Date().toLocaleString()

})

.then(()=>{

alert("Withdraw Request Submitted Successfully");

document.getElementById("amount").value="";
document.getElementById("account").value="";

})

.catch((error)=>{

alert(error.message);

});

});
