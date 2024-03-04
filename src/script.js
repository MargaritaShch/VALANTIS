import CreateProducts from "./Modules/CreateProducts.js";
import './style.scss';
import GetFilteredProducts from "./Modules/GetFilteredProducts.js";


document.addEventListener("DOMContentLoaded", function () {
    CreateProducts();
    document.querySelector(".search-btn").addEventListener("click", getFilters);
      
   
})

async function getFilters(){
    const params ={}
    const productName = document.querySelector(".productName").value;
    const productPrice = parseFloat(document.querySelector(".productPrice").value);
    const productBrand = document.querySelector(".productBrand").value;

    if (productName) params.product = productName;
    if (productPrice) params.price = productPrice;
    if (productBrand) params.brand = productBrand;

    await GetFilteredProducts(params)
}







