const getDb = require("../utility/database").getdb
const mongodb = require('mongodb')

class Category {
    constructor(id, name, description) {
        this._id = id ? new mongodb.ObjectID(id) : null
        this.name = name
        this.description = description
    }

    save() {
        let db = getDb()
        if (this._id) db = db.collection('categories').updateOne({ _id: this._id }, { $set: this })
        else db = db.collection('categories').insertOne(this).then(result => console.log(result)).catch(err => console.log(err))

        return db.then(result => console.log(result)).catch(err => console.log(err))
    }

    static findAll() {
        const db = getDb()
        return db.collection('categories').find().toArray().then(categories => categories).catch(err => console.log(err))
    }

    static findById(id) {
        const db = getDb()
        return db.collection('categories').findOne({ _id: new mongodb.ObjectID(id) }).then(category => category).catch(err => console.log(err))
    }

    static deleteById(id) {
        const db = getDb()
        return db.collection('categories').deleteOne({ _id: new mongodb.ObjectID(id) }).then(result => console.log(result)).catch(err => console.log(err))
    }
}

module.exports = Category