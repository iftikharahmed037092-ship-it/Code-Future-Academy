import { db } from "./firebase.js";

import {
ref,
onValue,
update
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const requestsContainer =
document.getElementById("requestsContainer");

const requestsRef =
ref(db,"withdrawRequests");

onValue(requestsRef,(snapshot)=>{

requestsContainer.innerHTML="";

if(!snapshot.exists()){

requestsContainer.innerHTML=`

<h2 style="text-align:center;">
No Withdraw Requests
</h2>

`;

return;

}

snapshot.forEach((child)=>{

const request = child.val();

const requestId = child.key;

requestsContainer.innerHTML += `

<div class="request-card">

<h3>Rs ${request.amount}</h3>

<p><b>Method:</b> ${request.method}</p>

<p><b>Account:</b> ${request.account}</p>

<p><b>Date:</b> ${request.date}</p>

<p><b>Status:</b> ${request.status}</p>

<div class="buttons">

<button
class="approve"
onclick="approveRequest('${requestId}')">

Approve

</button>

<button
class="reject"
onclick="rejectRequest('${requestId}')">

Reject

</button>

</div>

</div>

`;

});

});

window.approveRequest = function(requestId){

update(ref(db,"withdrawRequests/"+requestId),{

status:"Approved"

})

.then(()=>{

alert("Withdraw Approved");

})

.catch((error)=>{

alert(error.message);

});

}

window.rejectRequest = function(requestId){

update(ref(db,"withdrawRequests/"+requestId),{

status:"Rejected"

})

.then(()=>{

alert("Withdraw Rejected");

})

.catch((error)=>{

alert(error.message);

});

}
