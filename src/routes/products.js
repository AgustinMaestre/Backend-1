import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const productsRouter = Router();
const productmanager = new ProductManager();

productsRouter.get("/", async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productmanager.getProducts()
        if (limit){
            const prodLimit = products.slice(0, +limit)
            res.status(200).json({ message: 'Producto econtrado', prodLimit})
        } else {
            res.status(200).json({ message: 'Productos econtrado', products})
        }
    } catch (error) {
        return error
    }

})

productsRouter.get('/:pId', async (req, res) => {
    const { pid } = req.params;
    const productId = await productmanager.getProductsById(+pid);
    if (!productId) {
        return res.status(404).json({ message: 'No se encontro producto con ese ID'})
    } else {
        res.status(200).json({ message: 'Producto encontrado', productId})
    }
})

productsRouter.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body
    try {
        const response = await productmanager.addProduct(req.body);
        res.status(200).json({ message: 'Producto añadido correctamente', product: response})
    } catch (error) {
        return error
    }

})

productsRouter.put ('/:pid', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await productmanager.updateProducts(+id, req.body)
        if (!response) {
            return res.status(404).json({ message: 'Producto no existente'})
        }
        res.status(200).json({ message: 'Producto añadido correctamente'})
    } catch (error) {
        return error
    }

})

productsRouter.delete('/:pid', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await productmanager.delectProduct(+id)
        if (!response) {
            return res.status(404).json({ message: 'Producto no existente'})
        }
        res.status(200).json({ message: 'Producto eliminado correctamente'})
    } catch (error) {
        return error
    }

})

export default productsRouter