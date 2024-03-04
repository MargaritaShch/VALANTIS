import '../style.scss';
import { getProduct } from "../api/api.js";
//get item

async function CreateProducts() {
  try {
    const responseIds = await getProduct(
      "get_ids",
      { offset: 0, limit: 50 },
      "Valantis"
    );
    const responseProduct = await getProduct(
      "get_items",
      { ids: responseIds.result },
      "Valantis"
    );
    if (responseIds.result) {
      if (responseProduct.result) {
        const containerProducts = document.querySelector(".products-container");
        console.log(containerProducts);
        responseProduct.result.forEach((product) => {
          const productElem = document.createElement("div");
          productElem.classList.add("product");

          const nameProduct = document.createElement("p");
          nameProduct.textContent = product.product;
  
          productElem.appendChild(nameProduct);
          console.log("Name product:", nameProduct);

          const priceProduct = document.createElement("p");
          priceProduct.textContent = `${product.price}р`;
          productElem.appendChild(priceProduct);
          console.log("Price:", priceProduct);

          
          const btnBuy = document.createElement("button");
          btnBuy.textContent = "Купить";
          productElem.appendChild(btnBuy);
        
          containerProducts.appendChild(productElem);
        });
      } 
    }
  } catch (error) {
    console.error("Error while retrieving data:", error);
  }
}

export default CreateProducts;
