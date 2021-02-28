const getDb = require("../utility/database").getdb
const mongodb = require('mongodb')

class Product {
    constructor(id, name, price, description, imageUrl, categories, userId) {
        this._id = id ? new mongodb.ObjectID(id) : null
        this.name = name
        this.price = price
        this.description = description
        this.userId = userId
        this.categories = (categories && Array.isArray(categories)) ? categories : Array.of(categories)
        this.imageUrl = imageUrl
    }

    save() {
        let db = getDb()
        if (this._id) {
            db = db.collection('products').updateOne({ _id: this._id }, { $set: this })
        } else {
            db = db.collection('products').insertOne(this)
        }
        return db.then(result => console.log(result)).catch(err => console.log(err))
    }

    static findAll() {
        const db = getDb()
        // return db.collection('products').find({}).project({ name: 1, price: 1, imageUrl: 1 }).toArray().then(products => {
        return db.collection('products').find({}).project({ description: 0 }).toArray().then(products => {
            return products
        }).catch(err => console.log(err))
    }

    static findById(id) {
        const db = getDb()
        return db.collection('products').findOne({ _id: new mongodb.ObjectID(id) }).then(product => {
            return product
        }).catch(err => console.log(err))
    }

    static deleteById(id) {
        const db = getDb()
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectID(id) }).then(result => console.log(result)).catch(err => console.log(err))
    }

    static findByCategoryId(id) {
        const db = getDb()
        // return db.collection('products').find({ categories: id })
        return db.collection('products').find({ categories: id }).toArray().then(products => products).catch(err => console.log(err))
    }
}

module.exports = Product