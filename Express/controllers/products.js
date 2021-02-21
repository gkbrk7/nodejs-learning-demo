const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    res.render("index", { title: "Home Page", data: products, path: '/' })
}

exports.getAddProduct = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    res.render("add-product", { title: "Add New Product", data: products, path: '/admin/add-product' })
    // next()
}

exports.postAddProduct = (req, res, next) => {
    const data = req.body
    const product = new Product(data.name, data.price, data.description, data.imageUrl)

    product.saveProduct()
    res.redirect("/")
}