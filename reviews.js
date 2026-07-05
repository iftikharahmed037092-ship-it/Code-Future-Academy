const reviewForm =
document.getElementById("reviewForm");

reviewForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert("Review submitted successfully");

    reviewForm.reset();

});
