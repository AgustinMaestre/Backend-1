const socketClient = io()

const form = document.getElementById("addForm");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputStatus = document.getElementById("status");
const inputPrice = document.getElementById("price");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");
const inputCategory = document.getElementById("category");

const titleT = document.getElementById("titleT");
const descriptionT = document.getElementById("descriptionT");
const statusT = document.getElementById("statusT");
const priceT = document.getElementById("priceT");
const codeT = document.getElementById("codeT");
const stockT = document.getElementById("stockT");
const categoryT = document.getElementById("categoryT");

form.onsubmit = (e) => {
    e.preventDefault()
    
    const title = inputTitle.value;
    const description = inputDescription.value;
    const status = inputStatus.value;
    const price = inputPrice.value;
    const code = inputCode;
    const stock = inputStock.value;
    const category = inputCategory.value;

    socketClient.emit('addProduct', {title, description, status, price, code, stock, category})


}

socketClient.on("productUdate", (products) => {
    listProductsUpdate(products)
})

const listProductsUpdate = (products) => {
    let divListProducts = document.getElementById("divListProducts")

    let html = "";

    products.forEach(product => {
        html += `<p> ${product.title}</p>
        <br></br>`

        divListProducts.innerHTML = html
    });
}