const Product = require("../models/product")
const Category = require('../models/category')

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render("admin/products", { title: "Admin Products", data: products, path: '/admin/products', action: req.query.action })
    }).catch(err => console.log(err))
}

exports.getAddProduct = (req, res, next) => {
    Category.findAll().then(categories => {
        res.render("admin/add-product", { title: "Add New Product", categories: categories, path: '/admin/add-product' })
    }).catch(err => console.log(err))
}

exports.postAddProduct = (req, res, next) => {
    const { name, price, imageUrl, description, categoryId } = req.body
    Product.create({ name, price, imageUrl, description }).then(result => {
        console.log(result)
        res.redirect("/")
    }).catch(err => console.log(err))

    // const product = Product.build({ name, price, imageUrl, description, categoryId })
    // product.save().then(result => {
    //     res.redirect("/")
    // }).catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    Product.findByPk(req.params.id)
        .then(product => {
            if (!product) return res.redirect("/")
            Category.findAll().then(categories => {
                res.render("admin/edit-product", { title: "Edit Product", data: product, categories: categories, path: '/admin/products' })
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
    const { id, name, price, description, imageUrl, categoryId } = req.body
    Product.update({ id, name, price, description, imageUrl, categoryId }, {
        where: {
            id: id
        }
    }).then(result => {
        res.redirect("/admin/products?action=edit")
    })

    // Product.findByPk(id).then((product) => {
    //     product.name = name
    //     product.price = price
    //     product.description = description
    //     product.imageUrl = imageUrl
    //     // product.categoryId = categoryId
    //     return product.save()
    // }).then(result => {
    //     res.redirect("/admin/products?action=edit")
    // }).catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    Product.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.redirect("/admin/products?action=delete")
    }).catch(err => console.log(err))
}