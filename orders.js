import { db } from "./firebase.js";

import {
ref,
onValue,
update
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const ordersContainer =
document.getElementById("ordersContainer");

const ordersRef =
ref(db,"orders");

onValue(ordersRef,(snapshot)=>{

ordersContainer.innerHTML="";

if(!snapshot.exists()){

ordersContainer.innerHTML=`

<div class="empty">

No Orders Yet

</div>

`;

return;

}

snapshot.forEach((child)=>{

const order=child.val();

const orderId=child.key;

ordersContainer.innerHTML+=`

<div class="order-card">

<h3>${order.productTitle}</h3>

<p><b>Customer:</b> ${order.customerName}</p>

<p><b>Phone:</b> ${order.phone}</p>

<p><b>City:</b> ${order.city}</p>

<p><b>Price:</b> Rs ${order.price}</p>

<p><b>Date:</b> ${order.date}</p>

<p><b>Status:</b> ${order.status}</p>

<div style="margin-top:15px;display:flex;gap:10px;">

<button
onclick="acceptOrder('${orderId}')"
style="
flex:1;
padding:10px;
background:#28a745;
color:white;
border:none;
border-radius:10px;
cursor:pointer;
">

Accept

</button>

<button
onclick="rejectOrder('${orderId}')"
style="
flex:1;
padding:10px;
background:#dc3545;
color:white;
border:none;
border-radius:10px;
cursor:pointer;
">

Reject

</button>

</div>

</div>

`;

});

});

window.acceptOrder=function(orderId){

update(ref(db,"orders/"+orderId),{

status:"Accepted"

})

.then(()=>{

alert("Order Accepted");

});

}

window.rejectOrder=function(orderId){

update(ref(db,"orders/"+orderId),{

status:"Rejected"

})

.then(()=>{

alert("Order Rejected");

});

}
