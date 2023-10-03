import { Router } from "express";
import { CartManager } from "../../CartManager.js"

const cartRouter = Router();
const cartManager = new CartManager()

cartRouter.post('/', async (req, res) => {
    const newCart = await cartManager.addCart();
    res.status(201).json({ message: 'Carrito creado', cart: newCart })
})

cartRouter.get('/:cid', async (req, res) => {
    const { id } = req.params;
    const cartId = await cartManager.getCartById(+id);
    if (!cartId) {
        res.status(404).json({message: 'ID del producto no encontrado'})
    } else {
        res.status(200).json({ message: 'Productos en el carrito', products: cartId.products })
    }
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    
    await cartManager.addProductsToCart(+pid, +cid, quantity);

    res.status(200).json({ message: 'Producto agregado al carrito con exito' })
});

export default cartRouter;
