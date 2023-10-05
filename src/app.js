import express, { urlencoded, json } from 'express';
import {engine}from 'express-handlebars';
import { __dirname } from './utils.js';
import viewsRouter from './routes/views.js'
import cartRouter from './routes/carts.js'
import productsRouter from './routes/products.js'
import { Server } from 'socket.io';

import { ProductManager } from './ProductManager.js';
const productManager = new ProductManager();

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

app.engine('handlebars', engine())
app.set('view engine','handlebars')
app.set('views',__dirname + '/views')

app.use('/api/views', viewsRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter)

const httpServer = app.listen(8080, () => console.log('Escuchando el puerto en 8080'))
server.on('error', error => console.log(error));

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    socket.on('addProduct', async(product) => {
        const producto = await productManager.addProduct(product)
        const prodActualized = await productManager.getProducts();
        socket.emit('productUpdate', prodActualized)
    })
})