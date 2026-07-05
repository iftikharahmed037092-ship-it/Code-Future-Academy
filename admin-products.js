const productForm =
document.getElementById("productForm");

productForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const product = {

        name:
        document.getElementById("productName").value,

        price:
        document.getElementById("productPrice").value,

        image:
        document.getElementById("productImage").value,

        category:
        document.getElementById("productCategory").value,

        description:
        document.getElementById("productDescription").value

    };

    console.log(product);

    alert("Product Added Successfully");

    productForm.reset();

});
