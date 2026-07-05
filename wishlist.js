const cartBtns =
document.querySelectorAll(".cart-btn");

const removeBtns =
document.querySelectorAll(".remove-btn");

cartBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

alert("Added To Cart");

});

});

removeBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

btn.closest(".card").remove();

});

});
