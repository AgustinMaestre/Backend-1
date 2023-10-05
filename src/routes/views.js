import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const productManager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts()
    res.render("home", {
        products: products
    })
})

router.get("/listProducts", async(req, res) => {
    const products = await productManager.getProducts()
    res.render("listProducts", {
        products: products
    })
})
export default router