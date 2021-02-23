const Product = require("../models/product")
const Category = require('../models/category')

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render("admin/products", { title: "Admin Products", data: products, path: '/admin/products', action: req.query.action })
    }).catch(err => console.log(err))
}

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", { title: "Add New Product", path: '/admin/add-product' })
}

exports.postAddProduct = (req, res, next) => {
    const { name, price, imageUrl, description } = req.body
    // Product.create({ name, price, imageUrl, description }).then(result => {
    //     console.log(result)
    //     res.redirect("/")
    // }).catch(err => console.log(err))

    const product = Product.build({ name, price, imageUrl, description })
    product.save().then(result => {
        console.log(result)
        res.redirect("/")
    }).catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    Product.findByPk(req.params.id)
        .then(product => {
            Category.findAll().then(categories => {
                res.render("admin/edit-product", { title: "Edit Product", data: product, categories: categories, path: '/admin/products' })
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))

    
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