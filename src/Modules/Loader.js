class Loader {
    constructor() {
        this.loader = document.querySelector('.loader');
    }

    show() {
        this.loader.style.display = "block";
        document.querySelector(".filter").style.display = "none";
        document.querySelector(".products-container").style.display = "none";
        document.querySelector(".pagination").style.display = "none";
    }

    hide() {
        this.loader.style.display = "none";
        document.querySelector(".filter").style.display = "grid";
        document.querySelector(".products-container").style.display = "flex";
        document.querySelector(".pagination").style.display = "flex";
    }
}

export default Loader;