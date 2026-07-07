const sendBtn =
document.getElementById("sendBtn");

const input =
document.getElementById("messageInput");

const chatBox =
document.getElementById("chatBox");

sendBtn.addEventListener("click",()=>{

const text = input.value.trim();

if(text===""){
return;
}

const div =
document.createElement("div");

div.classList.add("message");

div.textContent = text;

chatBox.appendChild(div);

input.value="";

chatBox.scrollTop =
chatBox.scrollHeight;

});
