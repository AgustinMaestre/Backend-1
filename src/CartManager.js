import { existsSync, promises } from 'fs';
import { ProductManager } from './ProductManager.js'

const productManager = new ProductManager();

class CartManager {
    constructor(){
        this.path = "carts.json"
    }

    async getId() {
        let count = 0
        const getCart = await this.getCarts();
        getCart.forEach(cart => {
            if (cart.id > count) {
                count = cart.id
            }
        });
        return count + 1;
    }

    async getCarts() {
        try {
            if (existsSync(this.path)){
                const cartsFile = await promises.readFile(this.path, 'utf-8')
                return JSON.parse(cartsFile)
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

    async addCart() {
        try {
            const carts = await this.getCarts();
            let id;
            if (!carts.length) {
                id = 1;
            } else {
                id = carts[carts.length -1].id + 1
            }
            const newCarts = [...carts, { id: id, products: []}]
            await promises.writeFile(this.path, JSON.stringify(newCarts))
        } catch (error) {
            return error
        }

    }

    async getCartById(id) {
        const carts = await this.getCarts()
        const findCart = carts.find((c) => c.id === id)
        if (!findCart) {
            return "No se encuentra el dato solicitado"
        } else {
            return findCart
        }
    }

    async addProductsToCart(idCart, idProduct) {

        const carts = await this.getCartById(idCart);
        if (!carts) {
            throw new Error('No existe ningun carrito con ese ID')
        }
        const product = await productManager.getProductById(idProduct);
        if (!product) {
            throw new Error('No existe ningun producto con ese ID')
        }
        const productIndex = carts.products.findIndex((p)=>p.product === idProduct)

        if (productIndex === -1) {
            const newProduct = { product: idProduct, quantity: 1}
            carts.products.push(newProduct)
        } else {
            carts.products[productIndex].quantity++
        }
    }

}

export { CartManager };