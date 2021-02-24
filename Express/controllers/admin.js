const Product = require("../models/product")

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render("admin/products", { title: "Admin Products", data: products, path: '/admin/products', action: req.query.action })
    }).catch(err => console.log(err))
}

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", { title: "Add New Product", path: '/admin/add-product' })
}

exports.postAddProduct = (req, res, next) => {
    const { id, name, price, imageUrl, description } = req.body

    const product = new Product(id, name, price, description, imageUrl)
    product.save().then(() => {
        res.redirect("/admin/products")
    }).catch(err => console.log(err))

}

exports.getEditProduct = (req, res, next) => {
    Product.findById(req.params.id).then(product => {
        res.render("admin/edit-product", { title: "Edit Product", data: product, path: '/admin/products' })
    }).catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
    const { id, name, price, description, imageUrl, categoryId } = req.body

    const product = new Product(id, name, price, description, imageUrl)
    product.save().then(result => {
        res.redirect("/admin/products?action=edit")
    }).catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    Product.deleteById(req.body.id).then(() => {
        res.redirect("/admin/products?action=delete")
    }).catch(err => console.log(err))
}