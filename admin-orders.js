const approveBtns =
document.querySelectorAll(".approve-btn");

const completeBtns =
document.querySelectorAll(".complete-btn");

const cancelBtns =
document.querySelectorAll(".cancel-btn");

approveBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        alert("Order Approved");

    });

});

completeBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        alert("Order Completed");

    });

});

cancelBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        alert("Order Cancelled");

    });

});
