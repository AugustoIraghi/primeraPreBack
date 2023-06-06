import fs from 'fs';

export default class ProductManager{
    #path
    #format
    constructor(path){
        this.#path = path
        this.#format = "utf-8"
    }

    addProduct = async(title, description, code, price, status, stock, category, thumbnails) => {
        const products = await this.getProducts()
        products.push({pid: products.length+1, title, description, code, price, status, stock, category, thumbnails})
        await this.updateJSON(products)
    }

    getProducts = async() =>{
        return JSON.parse(await fs.promises.readFile(this.#path, this.#format))
    }

    getProductById = async(pid) => {
        const products = await this.getProducts()
        const product = products.find(product => product.pid == pid)
        if (product) return product
        else return console.log("Error: Producto no encontrado")
    }


    updateProduct = async(pid, newData) => {
        const products = await this.getProducts()
        let product = await this.getProductById(pid)
        if (product){
            product = {...product, ...newData}
            products[await this.findProduct(pid)] = product
            await this.updateJSON(products)
            return true
        }
    }


    deleteProduct = async(pid) => {
        const products = await this.getProducts()
        const index = await this.findProduct(pid)
        if (index != -1){
            products.splice(index,1)
            await this.updateJSON(products)
            return true
        }
        else return console.log("Error: Producto no encontrado")
    }

    findProduct = async(pid) => {
        const products = await this.getProducts()
        return products.findIndex(product => product.pid == pid)
    }

    updateJSON = async(products) => {
        return await fs.promises.writeFile(this.#path, JSON.stringify(products, null, "\t"))
    }

}
