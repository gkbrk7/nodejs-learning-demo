const Category = require('../models/category');
const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.findAll({
        attributes: ['id', 'name', 'price', 'imageUrl']
    }).then(products => {
        Category.findAll().then(categories => {
            res.render("shop/index", { title: "Home Page", data: products, path: '/', categories: categories })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    Product.findAll({
        attributes: ['id', 'name', 'price', 'imageUrl']
    }).then(products => {
        Category.findAll().then(categories => {
            res.render("shop/products", { title: "Products", data: products, path: '/products', categories: categories })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
    // Product.findByPk(req.params.id)
    //     .then(product => {
    //         // Category.findByPk(product.categoryId).then(category => {
    //         res.render("shop/product-detail", { title: product.name, product: product, path: '/products' })
    //         // }
    //         // ).catch(err => console.log(err))
    //     }).catch(err => console.log(err))

    Product.findAll({
        where: {
            id: req.params.id
        }
    }).then(products => {
        res.render("shop/product-detail", { title: products[0].name, product: products[0], path: '/products' })
    }).catch(err => console.log(err))
}

exports.getProductsByCategories = (req, res, next) => {
    const categoryId = req.params.id
    Product.getProductsByCategoryId(categoryId).then(products => {
        Category.getAllCategories().then(categories => {
            res.render("shop/products", { title: "Products", data: products[0], path: '/products', selectedCategory: categoryId, categories: categories[0] })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

exports.getProductDetails = (req, res, next) => {
    Product.getProducts().then(products => {
        res.render("shop/details", { title: "Product Details", data: products[0], path: '/details' })
    }).catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
    Product.getProducts().then(products => {
        res.render("shop/cart", { title: "Cart", data: products[0], path: '/cart' })
    }).catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
    Product.getProducts().then(products => {
        res.render("shop/orders", { title: "Orders", data: products, path: '/orders' })
    }).catch(err => console.log(err))
}