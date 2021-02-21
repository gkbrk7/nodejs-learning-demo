const products = []

module.exports = class Product {
    constructor(name, price, description, imageUrl) {
        this.name = name
        this.price = price
        this.description = description
        this.imageUrl = imageUrl
    }

    saveProduct() {
        products.push(this)
    }

    static getProducts() {
        return products
    }
}
