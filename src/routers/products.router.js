import { Router } from 'express';
import ProductManager from '../services/ProductManager/ProductManager.js';

const router = Router();

const pm = new ProductManager("./src/services/ProductManager/products.json")

router.get('/', async (req, res) => {
    const products = await pm.getProducts()
    if(req.query.limit)
        res.send(products.slice(0, req.query.limit))
    else
    res.send(products)
})

router.get('/:pid', async (req, res) => {
    const product = await pm.getProductById(req.params.pid)
    product ? res.send(product) : res.send("Producto no encontrado")
})

router.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !status || !stock || !category) return res.status(400).json({ message: 'Some fields are missing' });
    await pm.addProduct( title, description, code, price, status, stock, category, thumbnails)
    res.status(201).json({ message: 'Product added successfully' });
})

router.put('/:pid', async (req, res) => {
    const newData = req.body;
    const successfully = await pm.updateProduct(req.params.pid, newData)
    successfully ? res.status(200).json({ message: 'Product updated successfully' }) : res.status(400).json({ message: 'Product not found' })
})

router.delete('/:pid', async (req, res) => {
    const successfully = await pm.deleteProduct(req.params.pid)
    successfully ? res.status(200).json({ message: 'Product deleted successfully' }) : res.status(400).json({ message: 'Product not found' })
})


export default router;