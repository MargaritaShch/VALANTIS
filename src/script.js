import { getProduct } from "./api/api.js"
//get item


async function createProduct(){
    try {
        const response = await getProduct("get_ids", { offset:3, limit: 10 }, "Valantis");
        if (response.result) {
            const productsId = response.result.map(product => product.id);
            console.log("PRODUCTS ID:",  productsId)//[undefined, undefined, undefined]
            const responseProduct = await getProduct("get_items", { ids: productsId }, "Valantis");
            console.log("Response PRODUCTS:",  responseProduct )//Array(0)
            if (responseProduct .result){
                const containerProducts = document.querySelector(".products-container");
                const elems = response.result;
                console.log("ELEMS",elems)//['18e4e3bd-5e60-4348-8c92-4f61c676be1f', '711837ec-57f6-4145-b17f-c74c2896bafe', '6c972a4a-5b91-4a98-9780-3a19a7f41560']
                elems.forEach(product => {
                    const productElem = document.createElement("div");
                    productElem.classList.add("product");
            
                    const nameProduct = document.createElement("p");
                    nameProduct.textContent = product.product;
                    productElem.appendChild(nameProduct);
                    console.log("Name product:",nameProduct);//<p></p>
            
                    const priceProduct = document.createElement("p");
                    priceProduct.textContent = product.price;
                    productElem.appendChild(priceProduct);
                    console.log("Price:",priceProduct);//<p></p>
            
                    
            
                    containerProducts.appendChild(productElem);
                });
            } else {
                console.error("Error: No products data received");
            }
            }
           
    } catch (error) {
        console.error("Error while retrieving data:", error);
    }  
}

createProduct()