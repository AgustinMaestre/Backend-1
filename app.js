class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.existCode(code)){
            console.log('Producto existente');
        }
        else {
            if (title && description && price && thumbnail && code && stock){
                let producto = {
                    id: !this.products.length
                        ? 1
                        : this.products[this.products.length - 1].id + 1,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }
                this.products.push(producto)
            }
            else {
                console.log('Completar los datos faltantes')
            }
        }
    }

    getProducts() {
        return this.products
    }

    getProductsById(id) {
        let productId = this.findProduct(id)
        if (!this.findProduct(id)) {
            productId = "No se encuentra el dato solicitado"
        }
        return productId;
    }

//funciones auxiliares

    existCode(code) {
        let exist = this.products.some(product => product.code == code)
        return exist;
    }

    findProduct(id) {
        let searchProduct = this.products.find(product => product.id == id)
        return searchProduct;
    }
}

// Repetimos en modo de ejemplo un mismo producto para corroborar que no se agregue dos veces

const productManager = new ProductManager()
productManager.addProduct("Alimento", "Arroz", 250, "imagen", "123abc", 60);
productManager.addProduct("Mueble", "Armario", 25000, "imagen", "123abc", 90);
productManager.addProduct("Mueble", "Armario", 25000, "imagen", "123abd", 85);
console.log(productManager.getProducts())


//Con las teclas Ctrl+Alt+N puede correr el codigo