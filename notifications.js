import { db } from "./firebase.js";

import {
ref,
onValue
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const notificationsContainer =
document.getElementById("notificationsContainer");

const notificationsRef =
ref(db,"notifications");

onValue(notificationsRef,(snapshot)=>{

notificationsContainer.innerHTML="";

if(!snapshot.exists()){

notificationsContainer.innerHTML=`

<h2 style="text-align:center;">
No Notifications
</h2>

`;

return;

}

snapshot.forEach((child)=>{

const notification = child.val();

notificationsContainer.innerHTML += `

<div class="notification-card">

<h3>${notification.title}</h3>

<p>${notification.message}</p>

<div class="date">

${notification.date}

</div>

</div>

`;

});

});
