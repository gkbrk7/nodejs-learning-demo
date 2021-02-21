const Product = require("../models/product")

exports.getProducts = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    res.render("admin/products", { title: "Admin Products", data: products, path: '/admin/products' })
    // next()
}

exports.getAddProduct = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    res.render("admin/add-product", { title: "Add New Product", data: products, path: '/admin/add-product' })
    // next()
}

exports.postAddProduct = (req, res, next) => {
    const data = req.body
    const product = new Product(data.name, data.price, data.description, data.imageUrl)

    product.saveProduct()
    res.redirect("/")
}

exports.getEditProduct = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    res.render("admin/edit-product", { title: "Edit Product", data: products, path: '/admin/edit-product' })
    // next()
}

exports.postEditProduct = (req, res, next) => {
    res.redirect("/")
}