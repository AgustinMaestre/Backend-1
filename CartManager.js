import { promises } from 'fs';

class CartManager {
    carts;
    products;
    constructor(file) {
        this.carts = file;
        this.products = file;
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
            const cartsFile = await promises.readFile(this.carts, 'utf-8')
            return JSON.parse(cartsFile)
        } catch (error) {
            console.log(error);
        }
    }

    async addCart(cart) {
        try {
            const getCart = await this.getCarts();
            getCarts.push({ ...cart, id: await this.getId() })
            await promises.writeFile(this.carts, JSON.stringify(getCart))
        } catch (error) {
            return error
        }

    }

    async getCartById(id) {
        const prod = await this.getCarts()
        const findCart = prod.find(c => c.id === id)
        if (!findCart) {
            return "No se encuentra el dato solicitado"
        } else {
            return findCart
        }
    }

    async getProducts() {
        const products = await promises.readFile(this.products, 'utf-8')
        return products
    }

    async addProductsToCart(pId, cId, product) {
        // Llamamos a todos los carritos
        const carts = await this.getProducts();
        carts = JSON.parse(carts); 

        // Devuelve el cart seleccionado por id
        const cartValues = Object.values(carts[cId - 1]);

        // Array de productos de un carrito determinado. [1] identifica el array de productos de un carrito
        const cartProducts = cartValues[1];

        // Ubica el producto por el pId. Si no lo encuentra es undefined
        const isInCart = cartProducts.find((prod) => prod.id == pId)

        if (isInCart) {
            isInCart.quantity++
        } else {
            cartProducts.push(product)
        }

        await promises.writeFile(this.carts, JSON.stringify(carts))
    }

}

export default CartManager;