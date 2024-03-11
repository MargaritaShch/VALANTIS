import Model from "./Model.js";
import View from "./View.js";

export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.setupEventListeners();
        this.initialize();
    }

    async initialize() {
        await this.model.initialize();
        await this.fetchAndDisplayProducts();
        await this.updateFilterOptions();
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

    async fetchAndDisplayProducts(offset = 0, limit = 50) {
        this.view.showLoader();
        await this.model.fetchProducts(offset, limit);
        this.view.renderProducts(this.model.products);
        this.view.hideLoader();
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
        const price = this.view.priceOptions.value;
        const brand = this.view.brandOptions.value;
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


