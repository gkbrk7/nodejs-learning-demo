const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectID,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})

module.exports = mongoose.model('User', userSchema)
// class User {
//     constructor(id, name, email, cart) {
//         this._id = id
//         this.name = name
//         this.cart = cart ? cart : {}
//         this.cart.items = cart ? cart.items : []
//         this.email = email
//     }

//     save() {
//         const db = getDb()
//         return db.collection('users').insertOne(this)
//     }

//     getCart() {
//         const ids = this.cart.items.map(i => {
//             return i.id
//         })

//         const db = getDb()
//         return db.collection('products').find({
//             _id: {
//                 $in: ids
//             }
//         }).toArray().then(products => {
//             return products.map(p => {
//                 return {
//                     ...p,
//                     quantity: this.cart.items.find(i => {
//                         return i.id.toString() === p._id.toString()
//                     }).quantity
//                 }
//             })
//         })
//     }

//     addToCart(product) {
//         const index = this.cart.items.findIndex(cp => {
//             return cp.id.toString() === product._id.toString()
//         })

//         const updatedCartITems = [...this.cart.items]
//         let itemQuantity = 1

//         if (index >= 0) {
//             itemQuantity = this.cart.items[index].quantity + 1
//             updatedCartITems[index].quantity = itemQuantity
//         } else {
//             updatedCartITems.push({
//                 id: new mongodb.ObjectID(product._id),
//                 quantity: itemQuantity
//             })
//         }

//         const db = getDb()
//         return db.collection('users').updateOne({ _id: new mongodb.ObjectID(this._id) }, {
//             $set: {
//                 cart: {
//                     items: updatedCartITems
//                 }
//             }
//         })
//     }

//     static findById(id) {
//         const db = getDb()
//         return db.collection('users').findOne({ _id: new mongodb.ObjectID(id) }).then(user => user).catch(err => console.log(err))
//     }

//     static findByUserName(userName) {
//         const db = getDb()
//         return db.collection('users').findOne({ name: userName }).then(user => user).catch(err => console.log(err))
//     }

//     deleteCartItem(productId) {
//         const cardItems = this.cart.items.filter(item => {
//             return item.id.toString() !== productId.toString()
//         })

//         const db = getDb()
//         return db.collection('users').updateOne({ _id: new mongodb.ObjectID(this._id) }, {
//             $set: {
//                 cart: {
//                     items: cardItems
//                 }
//             }
//         })
//     }

//     addOrder() {
//         const db = getDb()
//         return this.getCart().then(products => {
//             const order = {
//                 items: products.map(item => {
//                     return {
//                         _id: item._id,
//                         name: item.name,
//                         price: item.price,
//                         imageUrl: item.imageUrl,
//                         userId: item.userId,
//                         quantity: item.quantity
//                     }
//                 }),
//                 user: {
//                     _id: mongodb.ObjectID(this._id),
//                     name: this.name,
//                     email: this.email
//                 },
//                 date: new Date().toLocaleString()
//             }
//             return db.collection('orders').insertOne(order)
//         }).then(() => {
//             this.cart = { items: [] }
//             return db.collection('users').updateOne({ _id: new mongodb.ObjectID(this._id) }, {
//                 $set: {
//                     cart: {
//                         items: []
//                     }
//                 }
//             })
//         })
//     }

//     getOrders() {
//         const db = getDb()
//         return db.collection('orders').find({ 'user._id': new mongodb.ObjectID(this._id) }).toArray()
//     }
// }

// module.exports = User