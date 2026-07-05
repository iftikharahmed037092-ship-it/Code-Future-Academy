const searchBtn =
document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {

    const searchValue =
    document.getElementById("searchInput").value;

    if(searchValue === ""){

        alert("Please enter something");

        return;
    }

    alert("Searching for: " + searchValue);

});
