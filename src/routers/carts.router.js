import { Router } from "express";
import CartManager from "../services/CartManager/CartManager.js";

const router = Router();

const cm = new CartManager("./src/services/CartManager/carts.json")

router.get('/', async (req, res) => {
    const carts = await cm.getCarts()
    res.send(carts)
})

router.post('/', async (req, res) => {
    const cartId = await cm.newCart()
    res.status(201).json({ message: 'Cart created successfully', cartId: cartId });
})

router.get('/:cid', async (req, res) => {
    const cart = await cm.getCartById(req.params.cid)
    cart ? res.send(cart) : res.send("Carrito no encontrado")
})

router.post('/:cid/products/:pid', async (req, res) => {
    const { quantity } = req.body;
    if (!quantity) return res.status(400).json({ message: 'Some fields are missing' });
    const successfully = await cm.addToCart(req.params.cid, req.params.pid, quantity)
    successfully ? res.status(200).json({ message: 'Product added successfully' }) : res.status(400).json({ message: 'Product not found' })
})

router.delete('/:cid', async (req, res) => {
    const successfully = await cm.deleteCart(req.params.cid)
    successfully ? res.status(200).json({ message: 'Cart deleted successfully' }) : res.status(400).json({ message: 'Cart not found' })
})

export default router;