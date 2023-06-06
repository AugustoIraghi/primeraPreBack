import express from 'express';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Estas en la ruta principal de la API'));

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

app.listen(8080, () => {console.log('Servidor web escuchando en el puerto 8080')});