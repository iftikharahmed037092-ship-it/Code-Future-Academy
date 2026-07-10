import { db } from "./firebase.js";

import {
ref,
onValue
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

ordersContainer.innerHTML+=`

<div class="order-card">

<h3>${order.productTitle}</h3>

<p><b>Customer:</b> ${order.customerName}</p>

<p><b>Price:</b> Rs ${order.price}</p>

<p><b>Date:</b> ${order.date}</p>

<span class="status">

${order.status}

</span>

</div>

`;

});

});
