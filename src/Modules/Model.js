import API from "../api/api.js";

export default class Model {
    constructor() {
        this.api = new API();
        this.totalItems = 0;
        this.products = [];
    }

    async initialize() {
        await this.fetchTotalItemsCount();
    }

    async fetchTotalItemsCount() {
        this.totalItems = await this.api.getTotalItemsCount();
    }

    async fetchProducts(offset = 0, limit = 50) {
        const responseIds = await this.api.getIDS(offset, limit);
        const responseProducts = await this.api.getProduct(responseIds);
        this.products = responseProducts;
    }

    async searchByName(name) {
        const response = await this.api.fetchAPI("filter", { product: name });
        this.products = await this.api.getProduct(response.result);
    }

    async applyFilters(price, brand) {
        const params = {
            price: price || undefined,
            brand: brand || undefined
        };
        const response = await this.api.fetchAPI("filter", params);
        this.products = await this.api.getProduct(response.result);
    }

    async getUniquePriceOptions() {
        const response = await this.api.fetchAPI("get_fields", { field: "price" });
        if (response && response.result) {
            const prices = response.result.filter(price => price !== null);
            const uniquePrices = [...new Set(prices)].sort((a, b) => a - b);
            return uniquePrices;
        }
        return [];
    }
    
    async getUniqueBrandOptions() {
        const response = await this.api.fetchAPI("get_fields", { field: "brand" });
        if (response && response.result) {
            const uniqueBrands = [...new Set(response.result.filter(brand => brand !== null))];
            return uniqueBrands;
        }
        return []
    }
}