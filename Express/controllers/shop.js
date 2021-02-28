const Category = require('../models/category');
const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.findAll().then(products => {
        Category.findAll().then(categories => {
            res.render("shop/index", { title: "Home Page", data: products, categories: categories, path: '/' })
        })
    }).catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        Category.findAll().then(categories => {
            res.render("shop/products", { title: "Products", data: products, categories: categories, path: '/products' })
        })
    }).catch(err => console.log(err))

}

exports.getProduct = (req, res, next) => {
    Product.findById(req.params.id).then(product => {
        res.render("shop/product-detail", { title: product.name, product: product, path: '/products' })
    }).catch(err => console.log(err))
}

exports.getProductsByCategories = (req, res, next) => {
    const categoryId = req.params.id
    const model = []

    Category.findAll().then(categories => {
        model.categories = categories
        return Product.findByCategoryId(categoryId)
    }).then(products => {
        res.render("shop/products", { title: "Products", data: products, path: '/products', selectedCategory: categoryId, categories: model.categories })
    })
}

exports.getProductDetails = (req, res, next) => {
    Product.getProducts().then(products => {
        res.render("shop/details", { title: "Product Details", data: products[0], path: '/details' })
    }).catch(err => console.log(err))
}


exports.getCart = (req, res, next) => {
    req.user.getCart().then(products => {
        res.render("shop/cart", { title: "Cart", data: products, path: '/cart' })
    }).catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
    const productId = req.body.id
    Product.findById(productId).then(product => {
        return req.user.addToCart(product)
    }).then(() => {
        res.redirect("/cart")
    }).catch(err => console.log(err))
}

exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.id
    req.user.getCart().then(cart => {
        return cart.getProducts({ where: { id: productId } })
    }).then(products => {
        const product = products[0]
        return product.cartItem.destroy()
    }).then(result => {
        res.redirect("/cart")
    })
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders({ include: ["products"] }).then(orders => {
        res.render("shop/orders", { title: "Orders", orders: orders, path: '/orders' })
    }).catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
    let userCart
    req.user.getCart().then(cart => {
        userCart = cart
        return cart.getProducts()
    }).then(products => {
        return req.user.createOrder().then(order => {
            order.addProducts(products.map(product => {
                product.orderItem = {
                    quantity: product.cartItem.quantity,
                    price: product.price
                }
                return product
            }))
        }).catch(err => console.log(err))
    }).then(() => {
        userCart.setProducts(null)
    }).then(() => {
        res.redirect("/orders")
    }).catch(err => console.log(err))
}