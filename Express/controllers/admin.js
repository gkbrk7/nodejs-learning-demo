const Product = require("../models/product")

exports.getProducts = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    res.render("admin/products", { title: "Admin Products", data: products, path: '/admin/products', action: req.query.action })
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
    const product = Product.getById(req.params.id)
    // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    res.render("admin/edit-product", { title: "Edit Product", data: product, path: '/admin/products' })
    // next()
}

exports.postEditProduct = (req, res, next) => {
    const product = Product.getById(req.body.id)
    product.name = req.body.name
    product.price = req.body.price
    product.description = req.body.description
    product.imageUrl = req.body.imageUrl

    Product.Update(product)
    res.redirect("/admin/products?action=edit")
}

exports.postDeleteProduct = (req, res, next) => {
    Product.deleteById(req.body.id)
    res.redirect("/admin/products?action=delete")
}