const Category = require('../models/category');
const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    const products = Product.getProducts()
    const categories = Category.getAllCategories()
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    res.render("shop/index", { title: "Home Page", data: products, path: '/', categories: categories })
}

exports.getProducts = (req, res, next) => {
    const products = Product.getProducts()
    const categories = Category.getAllCategories()
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    res.render("shop/products", { title: "Products", data: products, path: '/products', categories: categories })
}

exports.getProduct = (req, res, next) => {
    const product = Product.getById(req.params.id)
    res.render("shop/product-detail", { title: product.name, product: product, path: '/products' })
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    // res.render("shop/products", { title: "Products", data: products, path: '/products' })
}

exports.getProductsByCategories = (req, res, next) => {
    const categoryId = req.params.id
    const products = Product.getProductsByCategoryId(categoryId)
    const categories = Category.getAllCategories()
    res.render("shop/products", { title: "Products", data: products, path: '/products', selectedCategory: categoryId, categories: categories })
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    // res.render("shop/products", { title: "Products", data: products, path: '/products' })
}

exports.getProductDetails = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    res.render("shop/details", { title: "Product Details", data: products, path: '/details' })
}

exports.getCart = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    res.render("shop/cart", { title: "Cart", data: products, path: '/cart' })
}

exports.getOrders = (req, res, next) => {
    const products = Product.getProducts()
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    res.render("shop/orders", { title: "Orders", data: products, path: '/orders' })
}