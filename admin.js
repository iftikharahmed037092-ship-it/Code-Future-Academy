import { db } from "./firebase.js";
import {
  ref,
  push,
  set,
  get,
  update
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;

    const productsRef = ref(db, "products");

    const newProductRef = push(productsRef);

    set(newProductRef, {

        title: title,
        price: price,
        category: category,
        image: image,
        description: description

    })

    .then(() => {

        alert("Product Added Successfully");

        productForm.reset();

    })

    .catch((error) => {

        alert(error.message);

    });

});
