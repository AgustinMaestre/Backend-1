import { existsSync, promises } from 'fs';


class ProductManager {
    constructor() {
        this.path = 'products.json'
    }

    /*     async getId() {
            let count = 0
            const getProduct = await this.getProducts();
            getProduct.forEach(product => {
                if (product.id > count) {
                    count = product.id
                }
            });
            return count + 1;
        } */

    async addProduct(product) {
        try {
            const { title, description, price, thumbnail, code, stock, status, category } = product
            if (!title || !description || !price || !code || !stock || !status || !category) {
                return console.log('Campos incompletos')
            }
            const products = await this.getProducts();
            let id;
            if (!products.length) {
                id = 1;
            } else {
                id = products[products.lengh - 1].id + 1
            }
            const newProduct = { ...product, id }
            products.push(newProduct)
            await promises.writeFile(this.path, JSON.stringify(products))
            return newProduct
        } catch (error) {
            return error
        }

    }

    async updateProducts(id, product) {
        try {
            const listProducts = await this.getProducts()
            const findId = listProducts.findIndex(productId => productId.id === id)
            product.id = id
            listProducts.splice(findId, 1, product)
            await promises.writeFile(this.path, JSON.stringify(listProducts))
        } catch (error) {
            return error
        }
    }

    async getProducts() {
        try {
            if (existsSync(this.path)) {
                const productsFile = await promises.readFile(this.path, 'utf-8')
                return JSON.parse(productsFile)
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsById(id) {
        const prod = await this.getProducts()
        const findProduct = prod.find(p => p.id === id)
        if (!findProduct) {
            return "No se encuentra el dato solicitado"
        } else {
            return findProduct
        }
    }

    async delectProduct(id) {
        const products = await this.getProducts()
        const newArrayProducts = products.filter(p => p.id !== id)
        await promises.writeFile(this.path, JSON.stringify(newArrayProducts))
    }

}

export { ProductManager };



/* //test:
async function test() {
    const manager = new ProductManager()
    await manager.addProduct({
        title: "producto1",
        description: "testeando",
        price: 300,
        thumbnail: "imagen",
        code: "abc123",
        status: true,
        category: "producto1",
        stock: 20
    });
    await manager.addProduct({

        title: "producto2",
        description: "testeando",
        price: 300,
        thumbnail: "imagen",
        code: "abc124",
        stock: 20
    })
    console.log(await manager.getProducts())
} */

/* //GET PRODUCT BY ID
    console.log(await manager.getProductById(1)) */


/* //DELETE PRODUCT BY ID 
     await manager.deleteProductById(2)
     console.log( await manager.getProducts()) */


/* //UPDATE PRODUCT 
 await manager.updateProduct(1,{        
        title: "Producto1",
        description: "Producto",        
        code: "art123"              
    })
    console.log( await manager.getProducts()) */


/* test() */