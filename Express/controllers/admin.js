const Product = require("../models/product")
const Category = require('../models/category')

exports.getProducts = (req, res, next) => {
    Product.getProducts()
        .then(products => {
            res.render("admin/products", { title: "Admin Products", data: products[0], path: '/admin/products', action: req.query.action })
        }).catch(err => console.log(err))
}

exports.getAddProduct = (req, res, next) => {
    const products = Product.getProducts()
    Product.getProducts().then(products => {
        Category.getAllCategories().then(categories => {
            res.render("admin/add-product", { title: "Add New Product", data: products[0], categories: categories[0], path: '/admin/add-product' })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
    // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    // next()
}

exports.postAddProduct = (req, res, next) => {
    const data = req.body
    const product = new Product(data.name, data.price, data.description, data.categoryId, data.imageUrl)

    product.saveProduct().then(() => {
        res.redirect("/")
    }).catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    Product.getById(req.params.id)
        .then(product => {
            Category.getAllCategories().then(categories => {
                res.render("admin/edit-product", { title: "Edit Product", data: product[0][0], categories: categories[0], path: '/admin/products' })
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    // next()
}

exports.postEditProduct = (req, res, next) => {
    const product = new Product()
    product.id = req.body.id
    product.name = req.body.name
    product.price = req.body.price
    product.description = req.body.description
    product.imageUrl = req.body.imageUrl
    product.categoryId = req.body.categoryId > 0 ? req.body.categoryId : 1
    Product.Update(product).then(() => {
        res.redirect("/admin/products?action=edit")
    }).catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    Product.deleteById(req.body.id).then(() => {
        res.redirect("/admin/products?action=delete")
    }).catch(err => console.log(err))
}