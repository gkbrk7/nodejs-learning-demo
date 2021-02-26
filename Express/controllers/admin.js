const Product = require("../models/product")
const Category = require("../models/category")

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

    const product = new Product(id, name, price, description, imageUrl, req.user._id)
    product.save().then(() => {
        res.redirect("/admin/products")
    }).catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    Product.findById(req.params.id).then(product => {
        Category.findAll().then(categories => {
            categories = categories.map(category => {
                if (product.categories) {
                    product.categories.find(item => {
                        if (item == category._id) {
                            category.selected = true
                        }
                    })
                }
                return category
            })
            res.render("admin/edit-product", { title: "Edit Product", data: product, categories: categories, path: '/admin/products' })
        })
    }).catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
    const { id, name, price, description, imageUrl, categoryIds } = req.body
    const product = new Product(id, name, price, description, imageUrl, categoryIds)
    product.save().then(() => {
        res.redirect("/admin/products?action=edit")
    }).catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    Product.deleteById(req.body.id).then(() => {
        res.redirect("/admin/products?action=delete")
    }).catch(err => console.log(err))
}

exports.getCategories = (req, res, next) => {
    Category.findAll().then(categories => {
        res.render("admin/categories", { title: "Categories", data: categories, path: "/admin/categories", action: req.query.action })
    }).catch(err => console.log(err))
}

exports.getAddCategory = (req, res, next) => {
    res.render("admin/add-category", { title: "New Category", path: "/admin/add-category" })
}

exports.postAddCategory = (req, res, next) => {
    const { id, name, description } = req.body
    const category = new Category(id, name, description)
    category.save().then(result => {
        console.log(result)
        res.redirect("/admin/categories?action=create")
    }).catch(err => console.log(err))
}

exports.getEditCategory = (req, res, next) => {
    Category.findById(req.params.id).then(category => {
        res.render("admin/edit-category", { title: "Edit Category", data: category, path: '/admin/categories' })
    }).catch(err => console.log(err))
}

exports.postEditCategory = (req, res, next) => {
    const { id, name, description } = req.body
    const category = new Category(id, name, description)
    category.save().then(() => {
        res.redirect("/admin/categories?action=edit")
    }).catch(err => console.log(err))
}

exports.postDeleteCategory = (req, res, next) => {
    Category.deleteById(req.body.id).then(() => {
        res.redirect("/admin/categories?action=delete")
    }).catch(err => console.log(err))
}