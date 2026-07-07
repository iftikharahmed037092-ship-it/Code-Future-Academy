const categories =
document.querySelectorAll(".category-card");

categories.forEach(category=>{

category.addEventListener("click",()=>{

const name =
category.querySelector("h3").innerText;

alert("Opening " + name);

});

});
