import { getProduct } from "./api/api.js"
//get item


async function createProduct(){
    try {
        const response = await getProduct("get_ids", { offset: 10, limit: 3 }, "Valantis");
        if (response.result) {
            const products = response.result;
            const containerProducts = document.querySelector(".products-container");
            products.forEach(product => {
                const productElem = document.createElement("div");
                productElem.classList.add("product");
        
                const nameProduct = document.createElement("p");
                nameProduct.textContent = product.product;
                productElem.appendChild(nameProduct);
        
                const priceProduct = document.createElement("p");
                priceProduct.textContent = product.price;
                productElem.appendChild(priceProduct);
        
                console.log(nameProduct);
        
                containerProducts.appendChild(productElem);
                console.log(containerProducts)
            });
        } else {
            console.error("Error: No products data received");
        }
    } catch (error) {
        console.error("Error while retrieving data:", error);
    }  
}

createProduct()