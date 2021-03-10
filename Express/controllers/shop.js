const Category = require('../models/category');
const Product = require('../models/product');
const user = require('../models/user');

exports.getIndex = (req, res, next) => {
    Product.find().then(products => {
        return products
    }).then(products => {
        Category.find().then(categories => {
            res.render("shop/index", { title: "Home Page", data: products, categories: categories, path: '/' })
        })
        // res.render("shop/index", { title: "Home Page", data: products, path: '/' })
    }).catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal)
    // lt (less than)
    // lte (less than or equal)
    // in 
    // nin (not in)
    Product
        .find()
        // .find({ price: { $eq: 2000 } })
        // .find({ price: { $ne: 2000 } })
        // .find({ price: { $gt: 2000 } })
        // .find({ price: { $gte: 2000 } })
        // .find({ price: { $lt: 2000 } })
        // .find({ price: { $in: [1000, 2000] } })
        // .find({ price: { $gte: 1000, $lt: 5000 } })
        // .find({ price: { $gt: 2000 }, name: "Samsung S6" })
        // .or([{ price: { $gt: 2000 }, name: "Samsung S6" }])

        // startswith
        // .find({ name: /^Samsung/ })

        // endswith
        // .find({ name: /Samsung$/ })

        // contains
        // .find({ name: /.*Samsung.*/ })
        .then(products => {
            return products
            // Category.findAll().then(categories => {
            //     res.render("shop/products", { title: "Products", data: products, categories: categories, path: '/products' })
            // })
        }).then(products => {
            Category.find().then(categories => {
                res.render("shop/products", { title: "Products", data: products, categories: categories, path: '/products' })
            })
        }).catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
    Product
        // .findOne({_id : req.params.id})
        .findById(req.params.id)
        .then(product => {
            res.render("shop/product-detail", { title: product.name, product: product, path: '/products' })
        }).catch(err => console.log(err))
}

exports.getProductsByCategories = (req, res, next) => {
    const categoryId = req.params.id
    const model = []

    Category.find().then(categories => {
        model.categories = categories
        return Product.find({
            categories: categoryId
        })
    }).then(products => {
        res.render("shop/products", { title: "Products", data: products, path: '/products', selectedCategory: categoryId, categories: model.categories })
    })
}

exports.getProductDetails = (req, res, next) => {
    Product.getProducts().then(products => {
        res.render("shop/details", { title: "Product Details", data: products[0], path: '/details' })
    }).catch(err => console.log(err))
}


exports.getCart = (req, res, next) => {
    req.user.populate('cart.items.productId').execPopulate().then(user => {
        let price = 0, quantity = 0
        user.cart.items.forEach(product => {
            price += product.productId.price * product.quantity
            quantity += product.quantity
        })
        console.log(user.cart.items)
        res.render("shop/cart", { title: "Cart", data: user.cart.items, total: { price, quantity }, path: '/cart' })
    }).catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
    const productId = req.body.id
    Product.findById(productId).then(product => {
        return req.user.addToCart(product)
    }).then(() => {
        res.redirect("/cart")
    }).catch(err => console.log(err))
}

exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.productId
    req.user.deleteCartItem(productId).then(() => {
        res.redirect("/cart")
    })
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders().then(orders => {
        res.render("shop/orders", { title: "Orders", orders: orders, path: '/orders' })
    }).catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
    req.user.addOrder().then(() => {
        res.redirect('/cart')
    }).catch(err => console.log(err))
}