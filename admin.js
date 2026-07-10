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

if (productId) {

    const productRef = ref(db, "products/" + productId);

    get(productRef).then((snapshot) => {

        if (snapshot.exists()) {

            const product = snapshot.val();

            document.getElementById("title").value = product.title;
            document.getElementById("price").value = product.price;
            document.getElementById("category").value = product.category;
            document.getElementById("image").value = product.image;
            document.getElementById("description").value = product.description;

        }

    });

}

productForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;

    const productData = {

        title,
        price,
        category,
        image,
        description

    };

    if (productId) {

        update(ref(db, "products/" + productId), productData)

        .then(() => {

            alert("Product Updated Successfully");

            window.location.href = "manage-products.html";

        })

        .catch((error) => {

            alert(error.message);

        });

    } else {

        const productsRef = ref(db, "products");

        const newProductRef = push(productsRef);

        set(newProductRef, productData)

        .then(() => {

            alert("Product Added Successfully");

            productForm.reset();

        })

        .catch((error) => {

            alert(error.message);

        });

    }

});
