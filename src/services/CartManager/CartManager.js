import fs from 'fs';

export default class CartManager{
    #path
    #format
    constructor(path){
        this.#path = path
        this.#format = "utf-8"
    }

    newCart = async() => {
        const carts = await this.getCarts()
        carts.push({cid: carts.length+1, products: []})
        await this.updateJSON(carts)
        return carts.length
    }

    addToCart = async(cid, pid, quantity) => {
        const cIndex = await this.findCart(cid)
        if (cIndex==-1) return console.log("Error: Carrito no encontrado")
        const pIndex = await this.findProduct(cid,pid)
        await this.addProduct(cIndex, pIndex, pid, quantity)
        return true
    }

    addProduct = async(cIndex, pIndex, pid, quantity) => {
        const carts = await this.getCarts()
        if (pIndex != -1) carts[cIndex].products[pIndex].quantity += quantity
        else carts[cIndex].products.push({pid: pid, quantity: quantity})
        await this.updateJSON(carts)
    }


    getCarts = async() =>{
        return JSON.parse(await fs.promises.readFile(this.#path, this.#format))
    }

    getCartById = async(cid) => {
        const carts = await this.getCarts()
        return carts.find(cart => cart.cid == cid)
    }


    deleteCart = async(cid) => {
        const carts = await this.getCarts()
        const index = await this.findCart(cid)
        if (index != -1){
            carts.splice(index,1)
            await this.updateJSON(carts)
            return true
        }
        else return console.log("Error: Carrito no encontrado")
    }

    findCart = async(cid) => {
        const carts = await this.getCarts()
        return carts.findIndex(cart => cart.cid == cid)
    }

    findProduct = async(cid,pid) => {
        const cart = await this.getCartById(cid)
        return cart.products.findIndex(product => product.pid == pid)
    }

    updateJSON = async(carts) => {
        return await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, "\t"))
    }

}