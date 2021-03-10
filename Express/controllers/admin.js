const Product = require("../models/product")
const Category = require("../models/category")
const product = require("../models/product")

exports.getProducts = (req, res, next) => {
    Product
        .find()
        .populate('userId', 'name -_id')
        .select('name price imageUrl userId')
        // .find({name : "Iphone 6", price : 3500}).limit(10).sort({ name: -1 }).select({ name: 1, price: 1 })
        .then(products => {
            res.render("admin/products", { title: "Admin Products", data: products, path: '/admin/products', action: req.query.action })
        }).catch(err => console.log(err))
}

exports.getAddProduct = (req, res, next) => {
    Category.find().then(categories => {
        res.render("admin/add-product", { title: "Add New Product", categories: categories, path: '/admin/add-product' })
    })
}

exports.postAddProduct = (req, res, next) => {
    const { name, price, description, imageUrl, categoryIds: categories } = req.body
    const userId = req.user

    const product = new Product({ name, price, description, imageUrl, userId, categories })
    product.save().then(() => {
        res.redirect("/admin/products")
    }).catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    Product.findById(req.params.id)
        // .populate('categories', 'name')
        .then(product => {
            return product
        }).then(product => {
            Category.find().then(categories => {
                categories = categories.map(category => {
                    if (product.categories) {
                        product.categories.find(item => {
                            if (item.toString() === category._id.toString()) {
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
    // query first
    const { id, name, price, description, imageUrl, categoryIds } = req.body
    // Product.findById(id).then(product => {
    //     product.name = name
    //     product.price = price
    //     product.imageUrl = imageUrl
    //     product.description = description
    //     return product.save()
    // }).then(() => {
    //     res.redirect("/admin/products?action=edit")
    // }).catch(err => console.log(err))
    // update first
    Product.updateOne({ _id: id }, {
        $set: {
            name: name,
            price: price,
            imageUrl: imageUrl,
            description: description,
            categories: categoryIds
        }
    }).then(() => {
        res.redirect("/admin/products?action=edit")
    }).catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.body.id }).then(() => {
        res.redirect("/admin/products?action=delete")
    }).catch(err => console.log(err))
}

exports.getCategories = (req, res, next) => {
    Category.find().then(categories => {
        res.render("admin/categories", { title: "Categories", data: categories, path: "/admin/categories", action: req.query.action })
    }).catch(err => console.log(err))
}

exports.getAddCategory = (req, res, next) => {
    res.render("admin/add-category", { title: "New Category", path: "/admin/add-category" })
}

exports.postAddCategory = (req, res, next) => {
    const { name, description } = req.body
    const category = new Category({ name, description })
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
    Category.updateOne({ _id: id }, {
        $set: {
            name: name,
            description: description
        }
    }).then(() => {
        res.redirect("/admin/categories?action=edit")
    }).catch(err => console.log(err))
}

exports.postDeleteCategory = (req, res, next) => {
    Category.findByIdAndDelete(req.body.id).then(() => {
        res.redirect("/admin/categories?action=delete")
    }).catch(err => console.log(err))
}