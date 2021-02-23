const connection = require('../utility/database');

module.exports = class Category {
    constructor(name, description) {
        this.name = name
        this.description = description
    }

    saveCategory() {
        return connection.execute("insert into categories (name, description) values (?,?)", [this.name, this.description])
    }

    static getAllCategories() {
        return connection.execute("select * from categories")
    }

    static getById(id) {
        return connection.execute("select * from categories where id=?", [id])
    }

    static update(category) {
        return connection.execute("update categories set categories.name=?, categories.description=? where id=?", [category.name, category.description, category.id])
    }

    static deleteById(id) {
        return connection.execute("delete from categories where id=?",[id])
    }
}