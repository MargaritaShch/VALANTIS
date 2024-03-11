import Model from "./Model.js";
import View from "./View.js";

export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentPage = 0;
        this.itemsPerPage = 50;

        this.setupEventListeners();
        this.initialize();
        this.view.setupFilter();
    }

    async initialize() {
        await this.model.initialize();
        await this.fetchAndDisplayProducts();
        await this.updateFilterOptions();
        this.updatePagination();
    }

    
    async updateFilterOptions() {
        const prices = await this.model.getUniquePriceOptions();
        this.view.updatePriceOptions(prices); 
    
        const brands = await this.model.getUniqueBrandOptions();
        this.view.updateBrandOptions(brands);
    }

    setupEventListeners() {
        this.view.applyFiltersButton.addEventListener('click', () => this.applyFilters());
        this.view.resetFiltersButton.addEventListener('click', () => this.resetFilters());
        this.view.searchNameButton.addEventListener('click', () => this.searchByName());
    }

    async fetchAndDisplayProducts(page = this.currentPage) {
        this.view.showLoader();
        this.currentPage = page;
        const offset = this.currentPage * this.itemsPerPage;
        await this.model.fetchProducts(offset, this.itemsPerPage);
        this.view.renderProducts(this.model.products);
        this.updatePagination();
        this.view.hideLoader();
    }

    updatePagination() {
        this.view.updatePagination(this.model.totalItems, this.itemsPerPage, this.currentPage, (page) => this.fetchAndDisplayProducts(page));
    }

    async searchByName() {
        const name = this.view.nameInput.value.trim();
        if (name !== "") {
            this.view.showLoader();
            await this.model.searchByName(name);
            this.model.products.length > 0 ? this.view.renderProducts(this.model.products) : this.view.showError("Нет товаров с таким именем");
            this.view.hideLoader();
        } else {
            this.view.showError("Введите название продукта");
        }
    }

    async applyFilters() {
        const price = parseFloat(this.view.priceInput.value);
        const brand = this.view.brandInput.value;

        this.view.showLoader();
        await this.model.applyFilters(price, brand);
        this.view.renderProducts(this.model.products);
        this.view.hideLoader();
    }

    async resetFilters() {
        this.view.showLoader();
        await this.fetchAndDisplayProducts();
        this.view.hideLoader();
    }
}


