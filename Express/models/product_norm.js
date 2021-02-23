const connection = require("../utility/database")


module.exports = class Product {
    constructor(name, price, description, categoryId, imageUrl) {
        this.name = name
        this.price = price
        this.description = description
        this.categoryId = categoryId
        this.imageUrl = imageUrl
    }

    saveProduct() {
        return connection.execute("insert into products(name, price, imageUrl, description, categoryId) values (?, ?, ?, ?, ?)", [this.name, this.price, this.imageUrl, this.description, this.categoryId])
    }

    static getProducts() {
        return connection.execute("select * from products")
    }

    static getById(id) {
        return connection.execute("select * from products where id=?", [id])
    }

    static Update(product) {
        return connection.execute("update products set products.name=?, products.price=?, products.imageUrl=?, products.description=?, products.categoryId=? where products.id=?", [product.name, product.price, product.imageUrl, product.description, product.categoryId, product.id])
    }

    static deleteById(id) {
        return connection.execute("delete from products where id=?", [id])
    }

    static getProductsByCategoryId(categoryId) {
        return connection.execute("select * from products where categoryId=?", [categoryId])
    }
}