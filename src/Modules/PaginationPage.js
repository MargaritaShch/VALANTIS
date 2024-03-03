import { getProduct } from "../api/api";

const containerProducts = document.querySelector(".products-container");

let currentPage = 0;
const limit = 50;

async function getNextPage() {
    currentPage++;
    await PaginationPage(currentPage, limit);
}

async function getPrevPage() {
    if (currentPage >0) {
        currentPage--;
        await PaginationPage(currentPage, limit);
    }
}

async function PaginationPage(page, limit){
    try{
        const offset = page*limit;//1*50 ...2*50...
        const responseIds = await getProduct(
            "get_ids",
            { offset, limit },
            "Valantis"
          );
          const responseProduct = await getProduct(
            "get_items",
            { ids: responseIds.result },
            "Valantis"
          );
          //if page more then 0
          if(page>0){
            document.querySelector(".back-page").style.display = "block"
          }else {
            document.querySelector(".back-page").style.display = "none";
        }
          if(responseProduct.result){
            containerProducts.innerHTML = "";
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
          } else {
            console.error("Error: No products data received");
          }

    } catch(error){
        console.error("Error while retrieving data:", error);
    }
}


document.querySelector(".next-page").addEventListener("click", getNextPage);
document.querySelector(".back-page").addEventListener("click", getPrevPage);

export {PaginationPage};