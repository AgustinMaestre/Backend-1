import { Router } from "express";
import CartManager from "../../CartManager.js";

const cartRouter = Router();
const manager = new CartManager(".carts.json");
const products = new CartManager("./product.json");

const newCart = { id:0, products: [] };

cartRouter.post('/add', async (req, res) => {
    await manager.addCart(newCart);
    res.send('Added cart successfuly')
})

cartRouter.get('/:cid', async (req, res) => {
    const id = req.params.cid;
    const cartId = await manager.getCartById(id);
    if (!cartId) {
        res.status(404).json({message: 'ID product not found'})
    } else {
        res.send(cartId.products)
    }
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const totalProducts = JSON.parse(await products.getProducts()); // Traemos todos los productos de products.json
    const productId = totalProducts.find((prod) => prod.id == id); // Identificamos un producto en particular por el pId
    const newProduct = { id: productId.id, quantity: 1}; // El producto que añadimos al carrito
    
    await manager.addProductsToCart(pid, cid, newProduct);

    res.send('Product added to cart')
});

export default cartRouter;
