import { db } from "./firebase.js";

import {
ref,
push,
set,
onValue
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const messages =
document.getElementById("messages");

const messageInput =
document.getElementById("message");

const sendBtn =
document.getElementById("sendBtn");

const chatRef =
ref(db,"chat");

sendBtn.addEventListener("click",()=>{

const text = messageInput.value.trim();

if(text=="") return;

const newMessage = push(chatRef);

set(newMessage,{

sender:"Seller",

message:text,

time:new Date().toLocaleString()

});

messageInput.value="";

});

onValue(chatRef,(snapshot)=>{

messages.innerHTML="";

if(!snapshot.exists()){

messages.innerHTML="<p>No Messages Yet</p>";

return;

}

snapshot.forEach((child)=>{

const chat = child.val();

messages.innerHTML += `

<div class="message">

<b>${chat.sender}</b>

<p>${chat.message}</p>

<div class="time">

${chat.time}

</div>

</div>

`;

});

messages.scrollTop =
messages.scrollHeight;

});
