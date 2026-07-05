const checkoutForm =
document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert("Order placed successfully");

    window.location.href =
    "orders.html";

});
