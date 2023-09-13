const fs = require('fs')

const path = 'ProductsFije.json'

class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (this.existCode(code)) {
                console.log('Producto existente');
            }
            else {
                if (title && description && price && thumbnail && code && stock) {
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
                    this.products.push(producto);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                }
                else {
                    console.log('Completar los datos faltantes')
                }
            }
        } catch (error) {
            return error
        }

    }

    async updateProducts(id, title, description, price, thumbnail, code, stock) {
        try {
            const listProducts = await this.getProducts()
            const newListProducts = listProducts.map(e => {
                if (e.id === id) {
                    const updateProducts = {
                        ...e, title, description, price, thumbnail, code, stock
                    }
                    return updateProducts
                }
                else {
                    return e
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(newListProducts))
        } catch (error) {
            return error
        }
    }

    async getProducts() {

        if (fs.existsSync(this.path)) {
            const productsfile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(productsfile)
        } else {
            return []
        }
    }

    async getProductsById(id) {
        try {
            const prod = await this.getProducts()
            const findProduct = prod.find(p => p.id === id)
            if (!findProduct) {
                return "No se encuentra el dato solicitado"
            } else {
                return findProduct
            }
        } catch (error) {
            return error
        }
    }

    async delectProduct(id) {
        try {
            const products = await this.getProducts()
            const newArrayProducts = products.filter(p => p.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts))
        } catch (error) {
            return error
        }
    }

    //funciones auxiliares

    existCode(code) {
        let exist = this.products.some(product => product.code == code)
        return exist;
    }

}

// Repetimos en modo de ejemplo un mismo producto para corroborar que no se agregue dos veces

const productManager = new ProductManager('ProductsFile.json')
productManager.addProduct("Alimento", "Arroz", 250, "imagen", "123abc", 60);
productManager.addProduct("Mueble", "Armario", 25000, "imagen", "123abc", 90);
//productManager.addProduct("Mueble", "Armario", 25000, "imagen", "123abd", 85);
productManager.updateProducts(1, "Cocina", "Sal", 300, "imagen", "123abc", 80)
console.log(productManager.getProducts())


//Con las teclas Ctrl+Alt+N puede correr el codigo