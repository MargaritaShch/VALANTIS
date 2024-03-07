import './style.scss';
import ManagerProducts from "./Modules/ManagerProducts.js";
import UI from "./Modules/UI.js";


document.addEventListener("DOMContentLoaded", function () {
    const ui = new UI()
    ui.init()
    const managerProducts = new ManagerProducts(".products-container", "Valantis"); 
    managerProducts.renderProducts("get_items", []); 
}) 







