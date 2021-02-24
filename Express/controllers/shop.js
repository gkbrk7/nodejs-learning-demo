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
    Product.findOne({
        where: {
            id: req.params.id
        }
    }).then(product => {
        Category.findOne({
            where: {
                id: product.categoryId
            }
        }).then(category => {
            res.render("shop/product-detail", { title: product.name, product: product, category: category, path: '/products' })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

exports.getProductsByCategories = (req, res, next) => {
    Product.findAll({
        where: {
            categoryId: req.params.id
        }
    }).then(products => {
        Category.findAll().then(categories => {
            res.render("shop/products", { title: "Products", data: products, path: '/products', selectedCategory: req.params.id, categories: categories })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

exports.getProductDetails = (req, res, next) => {
    Product.getProducts().then(products => {
        res.render("shop/details", { title: "Product Details", data: products[0], path: '/details' })
    }).catch(err => console.log(err))
}


exports.getCart = (req, res, next) => {
    req.user.getCart().then(cart => {
        return cart.getProducts().then(products => {
            let price = 0, quantity = 0
            products.forEach((product) => {
                price += product.price * product.cartItem.quantity
                quantity += product.cartItem.quantity
            })
            console.log(products)
            res.render("shop/cart", { title: "Cart", data: products, total: { price, quantity }, path: '/cart' })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
    const productId = req.body.id
    let quantity = 1
    let userCart
    req.user.getCart().then(cart => {
        userCart = cart
        return cart.getProducts({ where: { id: productId } })
    }).then(products => {
        let product;
        if (products.length > 0) product = products[0]
        if (product) {
            quantity += product.cartItem.quantity
            return product
        }
        return Product.findByPk(productId)
    }).then(product => {
        userCart.addProduct(product, {
            through: {
                quantity: quantity
            }
        }).then(() => res.redirect("/cart"))
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