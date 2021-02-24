const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://localhost/node-app')
        // MongoClient.connect("mongodb+srv://sa:YiCpr4iBqgBwK3A9@cluster0.r4tum.mongodb.net/node-app?retryWrites=true&w=majority")
        .then(client => {
            console.log('Connected successfully')
            _db = client.db()
            callback(client)
        }).catch(err => {
            console.log(err)
            throw err
        })
}

const getdb = () => {
    if (_db) return _db
    throw 'No Database Instance'
}
module.exports = mongoConnect
module.exports = getdb