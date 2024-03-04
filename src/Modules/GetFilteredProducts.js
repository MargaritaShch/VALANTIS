import { fetchAPI,getProduct } from "../api/api.js";
// import debounce from "./debounce.js"; 

async function GetFilteredProducts(params) {
   try{
    const filtersIds = await fetchAPI("filter",params,"Valantis")
    const responseProduct = await getProduct("get_items",{ids: filtersIds}, "Valantis")
    const containerProducts = document.querySelector(".products-container");
    containerProducts.innerHTML = "";
    if (responseProduct.result && responseProduct.result.length > 0) {
   
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
      }else {
      console.error("Error: No products data received");
    }
   }catch(error){
    console.error("Error while retrieving data:", error)
   }
}

export default GetFilteredProducts;
