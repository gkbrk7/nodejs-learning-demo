const getDb = require("../utility/database").getdb
const mongodb = require('mongodb')

class User {
    constructor(id, name, email, cart) {
        this._id = id
        this.name = name
        this.cart = cart ? cart : {}
        this.cart.items = cart ? cart.items : []
        this.email = email
    }

    save() {
        const db = getDb()
        return db.collection('users').insertOne(this)
    }

    getCart() {

    }

    addToCart(product) {

    }

    static findById(id) {
        const db = getDb()
        return db.collection('users').findOne({ _id: new mongodb.ObjectID(id) }).then(user => user).catch(err => console.log(err))
    }

    static findByUserName(userName) {
        const db = getDb()
        return db.collection('users').findOne({ name: userName }).then(user => user).catch(err => console.log(err))
    }
}

module.exports = User