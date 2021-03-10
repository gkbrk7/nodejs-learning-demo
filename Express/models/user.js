const Product = require("./product")
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
                    ref: 'Product',
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

userSchema.methods.addToCart = function (product) {
    const index = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString()
    })

    const updatedCartITems = [...this.cart.items]
    let itemQuantity = 1

    if (index >= 0) {
        itemQuantity = this.cart.items[index].quantity + 1
        updatedCartITems[index].quantity = itemQuantity
    } else {
        updatedCartITems.push({
            productId: product._id,
            quantity: itemQuantity
        })
    }

    this.cart = {
        items: updatedCartITems
    }

    return this.save()
}

userSchema.methods.getCart = function () {
    const ids = this.cart.items.map(i => {
        return i.productId
    })

    return Product.find({
        _id: {
            $in: ids
        }
    }).select('name price imageUrl').then(products => {
        return products.map(p => {
            return {
                name: p.name,
                price: p.price,
                imageUrl: p.imageUrl,
                quantity: this.cart.items.find(i => {
                    return i.productId.toString() === p._id.toString()
                }).quantity
            }
        })
    })
}

userSchema.methods.deleteCartItem = function (productId) {
    const cardItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString()
    })
    this.cart.items = cardItems
    return this.save()
}

module.exports = mongoose.model('User', userSchema)