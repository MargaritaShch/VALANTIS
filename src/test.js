//hash library
import md5 from 'md5';

class API  {
//create a string format password
getXAuth(password) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0'); 
    const timestamp = `${year}${month}${day}`
    const string = `${password}_${timestamp}`;
    
    console.log(string)
    return md5(string);
  }
  
  //request settings
  async fetchAPI(action, params, password) {
    const XAUTH = this.getXAuth(password);
    //request body
    const requestSettings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": XAUTH,
      },
      body: JSON.stringify({ action, params }),
  };
  console.log("RequestSettings",requestSettings)
    //request execution
    try {
      const response = await fetch("http://api.valantis.store:40000/", requestSettings);
      console.log("RESPONSE:",response)
      const data = await response.json();
      // ordered list of product identifiers
      console.log("DATA", data)
      return data;
    } catch (error) {
      console.error("Error while retrieving data:", error);
    }
  }
  //get ids
  async getProduct(action, params, password) {
    try {
    const data = await this.fetchAPI( action, params, password);
      return data;
    } catch (error) {
      console.error("Error while retrieving data:", error);
    }
  }
}

export { API};
/*________________________________________________________________________*/
import API from "../api/api.js";

class ManagerProducts{
    constructor(container){
        this.container = document.querySelector(container)
        this.api = new API()
    }

    async renderProducts(action, responseIds, password){
        try{
            const responseProduct = await this.api.getProduct(
                action,
                { ids: responseIds.result },
                password
              );

            if(responseIds.result && responseProduct.result){
                const productElem = document.createElement("div");
                productElem.classList.add("product");
      
                const brand = product.brand || "Нет информации";
                const brandProduct = document.createElement("p");
                brandProduct.textContent = `Brand: ${brand}`;
                productElem.appendChild(brandProduct);
              
      
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
                
                this.container.appendChild(productElem);
            } else {
                console.error("Error: No products data received");
            }
        } catch(error){
            console.error("Error while retrieving data:", error)
        }
    }
}

export default ManagerProducts;

/*________________________________________________________________________*/

import ManagerProducts from "./Modules/ManagerProducts.js";
import API from "../api/api.js";

class CreateProducts {
    constructor(){
        this.api = new API()
        this.container = ".products-container"
        this.managerProducts = new ManagerProducts(this.container)
    }

    async render(){
        try{
            const responseIds = await this.api.getProduct(
                "get_ids",
                { offset: 0, limit: 50 },
                "Valantis"
              );
            this.managerProducts.renderProducts("get_items", responseIds.result, "Valantis" )
        } catch(error){
            console.error("Error while creating products:", error);
        }  
    }
}

export default CreateProducts;
/*________________________________________________________________________*/
import API from "../api/api.js";
import ManagerProducts from "./Modules/ManagerProducts.js";

class PaginationPage{
    constructor(){
        this.api = new API()
        this.container = ".products-container"
        this.managerProducts = new ManagerProducts(this.container)
        this.currentPage = 0;
        this.limit = 50;
    }

    async getNextPage() {
        this.currentPage++;
        await this.renderPage(this.currentPage, this.limit);
        this.scrollTop()
    }

    async  getPrevPage() {
        if (this.currentPage >0) {
            this.currentPage--;
            await this.renderPage(this.currentPage, this.limit);
            this.scrollTop()
        }
    }

    async renderPage(page, limit){
        try{
            const offset = page*limit;//1*50 ...2*50...
            const responseIds = await this.api.getProduct(
                "get_ids",
                { offset, limit },
                "Valantis"
              );
              this.managerProducts.renderProducts("get_items", responseIds.result, "Valantis" )
              //if page more then 0
              if(page>0){
                document.querySelector(".back-page").style.display = "block"
              }else {
                document.querySelector(".back-page").style.display = "none";
            }
        } catch(error){
            console.error("Error while retrieving data:", error);
        }
    }

   scrollTop(){
        this.managerProducts.scrollIntoView({ behavior: "smooth", block: "start" })
    }
}

export default PaginationPage;
/*_____________________________________________________________________________*/
import API from "../api/api.js";
// import debounce from "./debounce.js"; 
class GetFilteredProducts {
    constructor(){
        this.container = ".products-container"
        this.managerProducts = new ManagerProducts(this.container)
        this.api = new API()
    }

    async render(){
        try{
            const params = this.getFilters()
            const responseIds = await this.api.getProduct(
                "get_ids",
                { offset: 0, limit: 50 },
                "Valantis"
              );
              const filtersIds = await this.api.getProduct("filter",{...params, ids:responseIds},"Valantis")
              this.managerProducts.renderProducts("get_items",filtersIds,"Valantis")
        } catch(error){
            console.error("Error while retrieving data:", error)
           }
    }

    getFilters(){
        const params ={}
        const productName = document.querySelector(".productName").value;
        const productPrice = parseFloat(document.querySelector(".productPrice").value);
        const productBrand = document.querySelector(".productBrand").value;
    
        if (productName) params.product = productName;
        if (productPrice) params.price = productPrice;
        if (productBrand) params.brand = productBrand;
    
        return params;
    }
}
export default GetFilteredProducts;
/*______________________________________________________________________________________________________*/
 //script.js
    import './style.scss';
    import CreateProducts from "./Modules/CreateProducts.js";
    import PaginationPage from "./Modules/PaginationPage.js";
    import GetFilteredProducts from "./Modules/GetFilteredProducts.js";


document.addEventListener("DOMContentLoaded", function () {
    const createProducts = new CreateProducts();
    createProducts.render();

    const getFilteredProducts = new GetFilteredProducts();
    document.querySelector(".search-btn").addEventListener("click", () => {
        getFilteredProducts.render(getFilteredProducts.getFilters());
    });

    const paginationPage = new PaginationPage();
    document.querySelector(".next-page").addEventListener("click", () => {
        paginationPage.getNextPage();
    });
    document.querySelector(".back-page").addEventListener("click", () => {
        paginationPage.getPrevPage();
    }); 
})   






document.querySelector(".next-page").addEventListener("click", getNextPage);
document.querySelector(".back-page").addEventListener("click", getPrevPage);

