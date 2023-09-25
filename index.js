import express, { urlencoded } from 'express'
import ProductManager from './app.js'

const app = express()
const manager = new ProductManager('products.json')

app.use(urlencoded({ extended: true }))

const server = app.listen(8080, () => console.log('Escuchando el puerto en 8080'))
server.on('error', error => console.log(error));

app.get('/', async (req, res) => {
    res.send('Ruta Raiz')
})

app.get('/products', async (req, res) => {
    let { limit } = req.query;
    let products = await manager.getProducts()
    if (limit == undefined) {
        res.send(products)
    } else {
        res.send(products.slice(0, limit))
    }
})

app.get('/products/:pId', async (req, res) => {
    let products = await manager.getProducts();
    let pId = req.params.pId;
    let idSelected = await products.find(product => product.id == pId)
    if (idSelected !== undefined) {
        res.send(idSelected)
    } else {
        res.send('Id no encontrado')
    }
})

 const main = async () => {
     let product1 = {
         title: "Cocina",
         description: "Sal",
         price: 200,
         thumbnail: "imagen",
         code: "123",
         stock: 30,
     };
     let product2 = {
         title: "Cocina",
         description: "Harina",
         price: 300,
         thumbnail: "imagen",
         code: "456",
         stock: 20,
     };
     let product3 = {
         title: "Cocina",
         description: "Aceite",
         price: 350,
         thumbnail: "imagen",
         code: "789",
         stock: 20,
     };
     let product4 = {
         title: "Cocina",
         description: "Leche",
         price: 400,
         thumbnail: "imagen",
         code: "101",
         stock: 15,
     };

     await manager.addProduct(product1)
     await manager.addProduct(product2)
     await manager.addProduct(product3)
     await manager.addProduct(product4)
     console.log(await manager.getProducts())
 };

 main()