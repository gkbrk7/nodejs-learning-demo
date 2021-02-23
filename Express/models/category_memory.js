
const categories = [
    { id: 1, name: "computer", description: "computer category products" },
    { id: 2, name: "phone", description: "phone category products" },
    { id: 3, name: "television", description: "television category products" },
]

module.exports = class Category {
    constructor(name, description) {
        this.id = categories.reverse()[0].id + 1
        this.name = name
        this.description = description
    }

    saveCategory() {
        categories.push(this)
    }

    static getAllCategories() {
        return categories
    }

    static getById(id) {
        return categories.find(x => x.id === id)
    }

    static update(category) {
        const index = categories.findIndex(x => x.id === category.id)
        categories[index].name = category.name
        categories[index].description = category.description
    }

    static deleteById(id) {
        const index = categories.findIndex(x => x.id === id)
        categories.splice(index, 1)
    }
}