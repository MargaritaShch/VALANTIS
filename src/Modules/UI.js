import API from "../api/api";

class UI{
    constructor(){
        this.container = document.querySelector(".products-container");
        this.api = new API();
        this.nameInput = document.querySelector('.productName');
        this.searchNameButton = document.querySelector('.search-name-btn');
        this.priceSelect = document.querySelector('.productPrice');
        this.brandSelect = document.querySelector('.productBrand');
        this.applyFiltersButton = document.querySelector('.search-btn');
        this.deleteFilterButton = document.querySelector('.delete-btn')
        this.currentPage = 0;
        this.limit = 50;
        this.nextPageButton = document.querySelector('.next-page');
        this.prevPageButton = document.querySelector('.back-page');
        this.nextPageButton.addEventListener('click', this.getNextPage.bind(this));
        this.prevPageButton.addEventListener('click', this.getPrevPage.bind(this));
        this.applyFiltersButton.addEventListener('click', this.filter.bind(this));
        this.deleteFilterButton.addEventListener('click', this.resetFilters.bind(this));
        this.searchNameButton.addEventListener('click', this.searchByName.bind(this));
        this.loader = document.querySelector('.loader');
        this.hideLoader();
    }

    showLoader(){
        this.loader.style.display = "block";
    }

    hideLoader(){
        this.loader.style.display = "none";
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
        this.showLoader()
        try {
            await this.renderPage(this.currentPage, this.limit);
            await this.getUniqPriceSelect();
            await this.getUniqBrandSelect();
        } catch (error) {
            console.error("Error while retrieving data:", error);
        }
        this.hideLoader()
    }

    async renderPage(page,limit){
        this.showLoader()
        try{
            const offset = page * limit;
            const responseIds = await this.api.getIDS(offset,limit)
            const responseProducts = await this.api.getProduct(responseIds);
            console.log("RENDER PAGE PRODUCTS:",responseProducts)
            this.renderHtml(responseProducts);
            
        } catch(error){
            console.error("Error while retrieving data:", error);
        }
        this.hideLoader()
    }

    async getNextPage() {
        this.showLoader()
        this.clearHTML()
        try {
            this.currentPage++;
            const responseIds = await this.api.getIDS();
            await this.renderPage(this.currentPage, this.limit, responseIds);
            this.scrollTop();
            
            if (this.currentPage > 0) {
                this.prevPageButton.style.display = "block";
            } 
        } catch (error) {
            console.error("Error while getting next page:", error);
        }
        this.hideLoader()
    }

    async getPrevPage() {
        this.showLoader()
        this.clearHTML()
        if (this.currentPage > 0) {
            try {
                this.currentPage--;
                await this.renderPage(this.currentPage, this.limit);
                this.scrollTop();
            } catch (error) {
                console.error("Error while getting previous page:", error);
            }
        }
        if (this.currentPage === 0) {
            this.prevPageButton.style.display = "none";
        }
        this.hideLoader
    }
    async searchByName() {
        const name = this.nameInput.value.trim(); 
        if (name !== "") {
            try {
                const response = await this.api.fetchAPI("filter", { product: name });
                const productIds = response.result;
                const products = await this.api.getProduct(productIds);
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
        
        this.getUniqPriceSelect();
        this.getUniqBrandSelect();
        this.filter();
    }

    clearHTML() {
        this.container.innerHTML = '';
    }

    scrollTop() {
        this.container.scrollIntoView({ behavior: 'smooth' });
    }

    async getUniqPriceSelect(){
        try {
            const response = await this.api.fetchAPI("get_fields", { field: "price" });
            const uniquePrices = new Set();

            response.result.forEach(price => {
                uniquePrices.add(price);
            });

            const prices = Array.from(uniquePrices).sort((a, b) => a - b);
            
            this.addOption(this.priceSelect, "", "Цена");
            prices.forEach(price => {
                this.addOption(this.priceSelect, price, price);
        });
        } catch (error) {
            console.error("Error while populating price select:", error);
        }
    }

    async getUniqBrandSelect(){
        try {
            const response = await this.api.fetchAPI("get_fields", { field: "brand" });
            console.log("БРЕНД Response :", response);
            const uniqueBrands = new Set();
            
            response.result.forEach(brand => {
                if (brand && brand !== "~") {
                    uniqueBrands.add(brand);
                }
            });
            this.addOption(this.brandSelect, "", "Бренд");
            uniqueBrands.forEach(brand => {
                this.addOption(this.brandSelect, brand, brand);
        });
        } catch (error) {
            console.error("Error while populating brand select:", error);
        }
    }

    addOption(selectElement, value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        selectElement.appendChild(option);
    }

    async filter() {
        const priceValue = parseFloat(this.priceSelect.value);
        const brandValue = this.brandSelect.value;
        const params = {};

        if (priceValue && brandValue) {
            params.price = priceValue;
            params.brand = brandValue;
        } 

        else if (!priceValue && brandValue) {
            params.brand = brandValue;
        }
    
        else if (priceValue && !brandValue) {
            params.price = priceValue;
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
        await this.renderPage(this.currentPage, this.limit);
    }
}
export default UI;