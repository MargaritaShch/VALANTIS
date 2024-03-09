import API from "../api/api.js";
import UI from "../Modules/UI.js"

class ManagerProducts{
    constructor(container){
        this.api = new API()
        this.UI = new UI()
        this.container = document.querySelector(container)

    }

    async renderProducts() {
        try {
            const responseIds = await this.api.getIDS();
            const responseProducts = await this.api.getProduct(responseIds);
            this.UI.renderHtml(responseProducts);
        } catch (error) {
            console.error("Error while retrieving data:", error)
        }
    }
}

export default ManagerProducts;
