import { promises } from 'fs';

class ProductManager {
    products;
    constructor(file) {
        this.products = file
    }

    async getId() {
        let count = 0
        const getProduct = await this.getProducts();
        getProduct.forEach(product => {
            if (product.id > count) {
                count = product.id
            }
        });
        return count + 1;
    }

    async addProduct(product) {
        try {
            const getProduct = await this.getProducts();
            getProduct.push({ ...product, id: await this.getId() })
            await promises.writeFile(this.products, JSON.stringify(getProduct))
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
            await promises.writeFile(this.products, JSON.stringify(listProducts))
        } catch (error) {
            return error
        }
    }

    async getProducts() {
        try {
            const productsfile = await promises.readFile(this.products, 'utf-8')
            return JSON.parse(productsfile)
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
        await promises.writeFile(this.products, JSON.stringify(newArrayProducts))
    }

}

export default ProductManager;
