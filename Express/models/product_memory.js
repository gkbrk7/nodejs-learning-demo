const uuid = require("uuid")

const products = [
    { id: uuid.v4(), name: "Samsung S6", price: 6000, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", imageUrl: "3.jpg", categoryId: "1" },
    { id: uuid.v4(), name: "IPhone 8 Plus", price: 8250, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", imageUrl: "2.jpg", categoryId: "3" },
    { id: uuid.v4(), name: "Huawei Mate Pro", price: 7500, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", imageUrl: "4.jpg", categoryId: "2" },
    { id: uuid.v4(), name: "IPhone X", price: 11500, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", imageUrl: "1.jpg", categoryId: "1" },
]

module.exports = class Product {
    constructor(name, price, description, categoryId, imageUrl) {
        this.id = uuid.v4()
        this.name = name
        this.price = price
        this.description = description
        this.categoryId = categoryId
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

    static Update(product) {
        const index = products.findIndex(x => x.id === product.id)
        products[index].name = product.name
        products[index].price = product.price
        products[index].description = product.description
        products[index].imageUrl = product.imageUrl
        products[index].categoryId = product.categoryId
    }

    static deleteById(id) {
        const index = products.findIndex(i => i.id === id)
        products.splice(index, 1)
    }

    static getProductsByCategoryId(categoryId) {
        return products.filter(x => x.categoryId === categoryId)
    }
}
