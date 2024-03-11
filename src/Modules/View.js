export default class View {
    constructor() {
        this.container = document.querySelector(".products-container");
        this.loader = document.querySelector('.loader');
        this.paginationContainer = document.querySelector('.pagination');
        this.error = document.querySelector(".error");
        this.loader = document.querySelector('.loader');
        this.priceOptions = document.getElementById('priceOptions');
        this.brandOptions = document.getElementById('brandOptions');
        this.applyFiltersButton = document.querySelector('.search-btn');
        this.resetFiltersButton = document.querySelector('.delete-btn');
        this.nameInput = document.querySelector('.productName');
        this.searchNameButton = document.querySelector('.search-name-btn');
    }

    showLoader() {
        this.loader.style.display = "block";
    }

    hideLoader() {
        this.loader.style.display = "none";
    }
    renderProducts(products) {
        this.clearHTML();
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
        });
    }

    showError(message) {
        this.error.textContent = message;
        this.error.style.display = "block";
    }

    hideError() {
        this.error.style.display = "none";
    }

    clearHTML() {
        this.container.innerHTML = '';
    }

    updatePagination(totalItems, itemsPerPage, currentPage, onPageChangeCallback) {
        this.paginationContainer.innerHTML = ''; 
    
        const totalPages = Math.ceil(totalItems / itemsPerPage);
    
        const createPageButton = (pageNumber) => {
            const button = document.createElement('button');
            button.textContent = pageNumber + 1; 
            button.disabled = pageNumber === currentPage;
            button.addEventListener('click', () => onPageChangeCallback(pageNumber));
            return button;
        };
    
        //prev page
        if (currentPage > 0) {
            const prevButton = createPageButton(currentPage - 1);
            prevButton.textContent = '←';
            this.paginationContainer.appendChild(prevButton);
        }
    
        //number pages
        for (let i = 0; i < totalPages; i++) {
            const pageButton = createPageButton(i);
            this.paginationContainer.appendChild(pageButton);
        }
    
        //next page
        if (currentPage < totalPages - 1) {
            const nextButton = createPageButton(currentPage + 1);
            nextButton.textContent = '→';
            this.paginationContainer.appendChild(nextButton);
        }
    }

    updateFilterOptions(priceOptions, brandOptions) {
        this.priceOptions.innerHTML = '';
        this.brandOptions.innerHTML = '';
    
        priceOptions.forEach(price => {
            const option = document.createElement('option');
            option.value = price;
            option.textContent = price + ' ₽';
            this.priceOptions.appendChild(option);
        });
    
        brandOptions.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            this.brandOptions.appendChild(option);
        });
    }

    updatePriceOptions(prices) {
        const pricesDatalist = this.priceOptions;
        pricesDatalist.innerHTML = '';
    
        const uniquePrices = [...new Set(prices)];
    
        uniquePrices.forEach(price => {
            const option = document.createElement('option');
            option.value = price;
            pricesDatalist.appendChild(option);
        });
    }
    
    updateBrandOptions(brands) {
        const brandsDatalist = this.brandOptions;
        brandsDatalist.innerHTML = ''; 
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            brandsDatalist.appendChild(option);
        });
            
    }
}
