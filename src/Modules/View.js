export default class View {
    constructor() {
        this.container = document.querySelector(".products-container");
        this.loader = document.querySelector('.wrapper-loader'); 
        this.filterSection = document.querySelector(".filter"); 
        this.productsContainer = document.querySelector(".products-container"); 
        this.paginationContainer = document.querySelector(".pagination");
        this.error = document.querySelector(".error");
        this.priceOptions = document.getElementById('priceOptions');
        this.brandOptions = document.getElementById('brandOptions');
        this.priceInput = document.querySelector('.productPrice'); 
        this.brandInput = document.querySelector('.productBrand'); 
        this.applyFiltersButton = document.querySelector('.search-btn');
        this.resetFiltersButton = document.querySelector('.delete-btn');
        this.nameInput = document.querySelector('.productName');
        this.searchNameButton = document.querySelector('.search-name-btn');
        this.filterSelect = document.getElementById('filterSelect');
    }
    setupFilter() {
        this.filterSelect.addEventListener('change', () => {

            this.priceOptions.parentElement.style.display = 'none';
            this.brandOptions.parentElement.style.display = 'none';
            this.applyFiltersButton.style.display = 'none';
            this.resetFiltersButton.style.display = 'none';

       
            if (this.filterSelect.value === 'price') {
                this.priceOptions.parentElement.style.display = 'block';
            } else if (this.filterSelect.value === 'brand') {
                this.brandOptions.parentElement.style.display = 'block';
            }
           
            if (this.filterSelect.value) {
                this.applyFiltersButton.style.display = 'inline-block';
                this.resetFiltersButton.style.display = 'inline-block';
            }
        });
    }

    showLoader() {
        this.loader.style.display = "flex"; 
        this.filterSection.style.display = "none"; 
        this.productsContainer.style.display = "none"; 
        this.paginationContainer.style.display = "none"; 
    }

    hideLoader() {
        this.loader.style.display = "none"; 
        this.filterSection.style.display = "grid"; 
        this.productsContainer.style.display = "flex"; 
        this.paginationContainer.style.display = "flex"; 
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

    updatePagination(totalItems, itemsPerPage, currentPage, onPageChange) {
        this.paginationContainer.innerHTML = '';
    
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 3);
    
        //button prev page
        if (currentPage > 0) {
            const prevButton = document.createElement('button');
            prevButton.textContent = '←';
            prevButton.addEventListener('click', () => onPageChange(currentPage - 1));
            this.paginationContainer.appendChild(prevButton);
        }
    
        //first page "..."
        if (startPage > 1) {
            const firstPageButton = document.createElement('button');
            firstPageButton.textContent = '1';
            firstPageButton.addEventListener('click', () => onPageChange(0));
            this.paginationContainer.appendChild(firstPageButton);
    
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                this.paginationContainer.appendChild(dots);
            }
        }
    
        //namper ppages
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.className = currentPage === i - 1 ? 'active' : '';
            pageButton.disabled = currentPage === i - 1;
            pageButton.addEventListener('click', () => onPageChange(i - 1));
            this.paginationContainer.appendChild(pageButton);
        }
    
        //"..." and button last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                this.paginationContainer.appendChild(dots);
            }
    
            const lastPageButton = document.createElement('button');
            lastPageButton.textContent = totalPages;
            lastPageButton.addEventListener('click', () => onPageChange(totalPages - 1));
            this.paginationContainer.appendChild(lastPageButton);
        }
    
        //button next page
        if (currentPage < totalPages - 1) {
            const nextButton = document.createElement('button');
            nextButton.textContent = '→';
            nextButton.addEventListener('click', () => onPageChange(currentPage + 1));
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