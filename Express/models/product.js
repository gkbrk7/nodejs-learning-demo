const uuid = require("uuid")
const products = [
    { id: uuid.v4(), name: "Samsung S6", price: 6000, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", imageUrl: "1.jpg" },
    { id: uuid.v4(), name: "IPhone 8 Plus", price: 8250, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", imageUrl: "2.jpg" },
    { id: uuid.v4(), name: "Huawei Mate Pro", price: 7500, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", imageUrl: "3.jpg" },
    { id: uuid.v4(), name: "IPhone X", price: 11500, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", imageUrl: "4.jpg" },
]

module.exports = class Product {
    constructor(name, price, description, imageUrl) {
        this.id = uuid.v4()
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

    static getById(id) {
        return products.find(x => x.id === id)
    }
}
