const supportForm =
document.getElementById("supportForm");

supportForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert("Support request submitted");

    supportForm.reset();

});
