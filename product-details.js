const addToCartBtn = document.getElementById("addToCartBtn");

const buyNowBtn = document.getElementById("buyNowBtn");

addToCartBtn.addEventListener("click", () => {

    alert("Product added to cart");

});

buyNowBtn.addEventListener("click", () => {

    window.location.href = "checkout.html";

});
