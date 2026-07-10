import { db } from "./firebase.js";

import {
ref,
onValue,
update,
push,
set
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

<div class="buttons">

<button
class="accept-btn"
onclick="acceptOrder('${orderId}')">
Accept
</button>

<button
class="reject-btn"
onclick="rejectOrder('${orderId}')">
Reject
</button>

<button
class="complete-btn"
onclick="completeOrder('${orderId}')">
Complete
</button>

</div>

`;

});

});

window.acceptOrder=function(orderId){

update(ref(db,"orders/"+orderId),{

status:"Accepted"

})

.then(()=>{

const notificationRef = push(ref(db,"notifications"));

set(notificationRef,{

title:"Order Accepted",

message:"One order has been accepted successfully.",

date:new Date().toLocaleString()

});

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

window.completeOrder = function(orderId){

update(ref(db,"orders/"+orderId),{

status:"Completed"

})

.then(()=>{

alert("Order Completed Successfully");

})

.catch((error)=>{

alert(error.message);

});

}
