import { Router } from "express";
import ProductManager from "../../ProductManager.js";

const manager = new ProductManager('./products.json');
const productsRouter = Router();

const product1 = {
    title: 'Product1',
    description: 'Description1',
    price: 1000,
    thumbnail: 'Image1',
    code: 1234,
    stock: 10,
    status: true
}

productsRouter.get('/', async (req, res) => {
    const { limit } = req.query;
    const products = await manager.getProducts()
    if (limit == undefined) {
        res.send(products)
    } else {
        res.send(products.slice(0, limit))
    }
})

productsRouter.get('/:pId', async (req, res) => {
    const pid = req.params.pId;
    const productId = await manager.getProductsById(pid);
    if (!productId) {
        res.status(404)('Id not found')
    } else {
        res.send(productId)
    }
})

productsRouter.post('/add', async (req, res) => {
    await manager.addProduct(product1);
    res.send('Added product')
})

productsRouter.put ('/:pid', async (req, res) => {
    const id = req.params.pid;
    const update = req.body;
    const idNum = parseInt(id);

    await manager.updateProducts(idNum, update)
    res.send('Update product')
})

productsRouter.delete('/:pid', async (req, res) => {
    const id = req.params.pid;
    const idNum = parseInt(id);

    await manager.delectProduct(idNum)
    res.send('Deleted product')
})

export default productsRouter