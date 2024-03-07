import API from "../api/api";

class UI{
    constructor(){
        this.container = document.querySelector(".products-container");
        this.api = new API();
        this.nameInput = document.querySelector('.productName');
        this.priceSelect = document.querySelector('.productPrice');
        this.brandSelect = document.querySelector('.productBrand');
        this.applyFiltersButton = document.querySelector('.search-btn');
        this.currentPage = 0;
        this.limit = 5;
        this.nextPageButton = document.querySelector('.next-page');
        this.prevPageButton = document.querySelector('.back-page');
        this.nextPageButton.addEventListener('click', this.getNextPage.bind(this));
        this.prevPageButton.addEventListener('click', this.getPrevPage.bind(this));
        this.applyFiltersButton.addEventListener('click', this.filter.bind(this));
    }

    renderHtml(products){
            if(products && products.length > 0){
                products.forEach(product => {
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
                })
               
        } 
         else {
            console.error("Error: No products data received");
        }
    }

    async init() {
        try {
            const responseIds = await this.api.getIDS();
            const responseProducts = await this.api.getProduct(responseIds);
            this.renderHtml(responseProducts);

            await this.getUniqPriceSelect();
            await this.getUniqBrandSelect();
        } catch (error) {
            console.error("Error while retrieving data:", error);
        }
    }

    async getUniqPriceSelect(){
        try {
            const response = await this.api.fetchAPI("get_fields", { field: "price" });
            const uniquePrices = new Set();

            response.result.forEach(price => {
                uniquePrices.add(price);
            });

            const prices = Array.from(uniquePrices).sort((a, b) => a - b);

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
            const uniqueBrands = new Set();

            response.result.forEach(brand => {
                if (brand && brand !== "Нет информации") {
                    uniqueBrands.add(brand);
                }
            });

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

    filter() {
        const priceValue = this.priceSelect.value;
        const brandValue = this.brandSelect.value;

        const params = {
            price: priceValue,
            brand: brandValue
        };

        const products = this.api.getProductsList(params);
        this.renderHtml(products);
    }
    
    async getNextPage() {
        try {
            this.currentPage++;
            const responseIds = await this.api.getIDS(this.currentPage);
            const responseProducts = await this.api.getProduct(responseIds);
            this.clearHTML()
            this.renderHtml(responseProducts);
            this.scrollTop();
            if (this.currentPage > 0) {
                this.prevPageButton.style.display = "block";
            } 
        } catch (error) {
            console.error("Error while getting next page:", error);
        }
    }

    async getPrevPage() {
        if (this.currentPage > 0) {
            try {
                this.currentPage--;
                const responseIds = await this.api.getIDS(this.currentPage);
                const responseProducts = await this.api.getProduct(responseIds);
                this.renderHtml(responseProducts);
                this.scrollTop();
            } catch (error) {
                console.error("Error while getting previous page:", error);
            }
        }
        if (this.currentPage === 0) {
            this.prevPageButton.style.display = "none";
        }
    }
    //
    clearHTML() {
        this.container.innerHTML = '';
    }

    scrollTop() {
        this.container.scrollIntoView({ behavior: 'smooth' });
    }
}

export default UI;