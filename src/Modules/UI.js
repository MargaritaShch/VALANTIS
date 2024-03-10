import API from "../api/api";
import Pagination from "./Pagination";
import Loader from "./Loader";

class UI{
    constructor(){
        this.api = new API();
        this.pagination = new Pagination(this);
        this.loader = new Loader();
        this.container = document.querySelector(".products-container");
        this.nameInput = document.querySelector('.productName');
        this.searchNameButton = document.querySelector('.search-name-btn');
        this.priceSelect = document.querySelector('.productPrice');
        this.brandSelect = document.querySelector('.productBrand');
        this.applyFiltersButton = document.querySelector('.search-btn');
        this.deleteFilterButton = document.querySelector('.delete-btn')
        this.currentPage = 0;
        this.limit = 50;
        this.error = document.querySelector(".error")
        this.applyFiltersButton.addEventListener('click', this.filter.bind(this));
        this.deleteFilterButton.addEventListener('click', this.resetFilters.bind(this));
        this.searchNameButton.addEventListener('click', this.searchByName.bind(this));
    }

    renderHtml(products){
            if(products && products.length > 0){
                products.forEach(product => {
                    const productElem = document.createElement("div");
                    productElem.classList.add("product");
    
                    const brand = product.brand || "~";
                    const brandProduct = document.createElement("p");
                    brandProduct.classList.add("brand");
                    brandProduct.textContent = `Бренд: ${brand}`;
                    productElem.appendChild(brandProduct);
    
                    const nameProduct = document.createElement("p");
                    nameProduct.classList.add("name");
                    nameProduct.textContent = product.product;
                    productElem.appendChild(nameProduct);

                    const idProduct = document.createElement("p");
                    idProduct.classList.add("id");
                    idProduct.textContent = `ID: ${product.id}`;
                    productElem.appendChild(idProduct);
    
                    const priceProduct = document.createElement("p");
                    priceProduct.classList.add("price");
                    priceProduct.textContent = `Цена: ${product.price} ₽`;
                    productElem.appendChild(priceProduct);
    
                    this.container.appendChild(productElem);
                })     
        } 
         else {
            console.error("Error: No products data received");
        }
    }

    async init() {
        this.loader.show();
        if (typeof this.totalItems === 'undefined') {
            this.totalItems = await this.api.getTotalItemsCount();
        }
        this.pagination.update(this.totalItems, this.limit);
        await this.renderPage(this.currentPage, this.limit);
        this.getUniqueBrandOptions();
        this.getUniquePriceOptions()
        this.loader.hide();
    }

    async renderPage(page,limit){
        this.loader.show();
        try {
            const offset = page * limit;
            const responseIds = await this.api.getIDS(offset, limit);
            const responseProducts = await this.api.getProduct(responseIds);
            this.clearHTML();
            this.renderHtml(responseProducts);
            //update pagination
            this.pagination.update(this.totalItems, this.limit);
        } catch (error) {
            console.error("Error while rendering page:", error);
        }
        this.loader.hide();
    }

    async searchByName() {
        const name = this.nameInput.value.trim(); 
        if (name !== "") {
            try {
                const response = await this.api.fetchAPI("filter", { product: name });
                const products = await this.api.getProduct(response.result);
                if(products.length === 0){
                    this.error.style.display = "block"
                }
                this.clearHTML();
                this.renderHtml(products);
            } catch (error) {
                console.error("Error while searching products by name:", error);
            } 
        } else {
            console.log("Please enter a product name.");
        }
    }

    resetFilters() {
        this.priceSelect.value = "";
        this.brandSelect.value = "";

        document.getElementById('priceOptions').innerHTML = '';
        document.getElementById('brandOptions').innerHTML = '';

        this.getUniqueBrandOptions();
        this.getUniquePriceOptions();

        this.currentPage = 0; 
        this.renderPage(this.currentPage, this.limit);
    }

    clearHTML() {
        this.container.innerHTML = '';
    }

    scrollTop() {
        this.container.scrollIntoView({ behavior: 'smooth' });
    }

   async getUniquePriceOptions() {
        const response = await this.api.fetchAPI("get_fields", { field: "price" });
        const pricesDatalist = document.getElementById('priceOptions');
        const sortedPrices = response.result.filter(price => price !== null).sort((a, b) => a - b);

        sortedPrices.forEach(price => {
            const option = document.createElement('option');
            option.value = price;
            pricesDatalist.appendChild(option);
        });
    }

    async getUniqueBrandOptions() {
        const response = await this.api.fetchAPI("get_fields", { field: "brand" });
        const brandsDatalist = document.getElementById('brandOptions');
        const uniqueBrands = response.result.filter(brand => brand !== null);

        uniqueBrands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            brandsDatalist.appendChild(option);
        });
    }

    addOption(selectElement, value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        selectElement.appendChild(option);
    }

    async filter() {
        this.loader.show();
        const priceValue = parseFloat(this.priceSelect.value);
        const brandValue = this.brandSelect.value;
        const params = {
            price: priceValue || undefined,
            brand: brandValue || undefined
        }
     
        try {
            const response = await this.api.fetchAPI("filter", params);
            const productIds = response.result;
            const products = await this.api.getProduct(productIds);

            this.clearHTML()
            this.renderHtml(products);
        } catch (error) {
            console.error("Error while filtering products:", error);
        }
        this.loader.hide();
    }
}
export default UI;