const Product = require("../models/product")
const Category = require('../models/category')

exports.getProducts = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    res.render("admin/products", { title: "Admin Products", data: products, path: '/admin/products', action: req.query.action })
    // next()
}

exports.getAddProduct = (req, res, next) => {
    const products = Product.getProducts()
    const categories = Category.getAllCategories()
    // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    res.render("admin/add-product", { title: "Add New Product", data: products, categories: categories, path: '/admin/add-product' })
    // next()
}

exports.postAddProduct = (req, res, next) => {
    const data = req.body
    const product = new Product(data.name, data.price, data.description, data.categoryId, data.imageUrl)

    product.saveProduct()
    res.redirect("/")
}

exports.getEditProduct = (req, res, next) => {
    const product = Product.getById(req.params.id)
    const categories = Category.getAllCategories()
    // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    res.render("admin/edit-product", { title: "Edit Product", data: product, categories: categories, path: '/admin/products' })
    // next()
}

exports.postEditProduct = (req, res, next) => {
    const product = Product.getById(req.body.id)
    product.name = req.body.name
    product.price = req.body.price
    product.description = req.body.description
    product.imageUrl = req.body.imageUrl
    product.categoryId = req.body.categoryId > 0 ? req.body.categoryId : 1
    Product.Update(product)
    res.redirect("/admin/products?action=edit")
}

exports.postDeleteProduct = (req, res, next) => {
    Product.deleteById(req.body.id)
    res.redirect("/admin/products?action=delete")
}