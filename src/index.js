import express, { urlencoded, json } from 'express'
import cartRouter from './routes/carts.js'
import productsRouter from './routes/products.js'

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter)

const server = app.listen(8080, () => console.log('Escuchando el puerto en 8080'))
server.on('error', error => console.log(error));

