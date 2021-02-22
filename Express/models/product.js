const connection = require("../utility/database")


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
    }

    static getProducts() {
        return connection.execute("select * from products")
    }

    static getById(id) {
    }

    static Update(product) {
    }

    static deleteById(id) {
    }

    static getProductsByCategoryId(categoryId) {
    }
}