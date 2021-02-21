const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    res.render("shop/index", { title: "Home Page", data: products, path: '/' })
}

exports.getProducts = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    res.render("shop/products", { title: "Products", data: products, path: '/products' })
}

exports.getProduct = (req, res, next) => {
    const product = Product.getById(req.params.id)
    res.render("shop/product-detail", { title: product.name, product: product, path: '/products' })
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    // res.render("shop/products", { title: "Products", data: products, path: '/products' })
}

exports.getProductDetails = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    res.render("shop/details", { title: "Product Details", data: products, path: '/details' })
}

exports.getCart = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    res.render("shop/cart", { title: "Cart", data: products, path: '/cart' })
}

exports.getOrders = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    res.render("shop/orders", { title: "Orders", data: products, path: '/orders' })
}