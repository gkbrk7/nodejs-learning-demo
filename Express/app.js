const express = require('express');
const bodyParser = require("body-parser")
const errorController = require('./controllers/errors');
const path = require('path');

const app = express()

app.set("view engine", "pug")
app.set("views", "./views")

const adminRoutes = require("./routes/admin")
const userRoutes = require("./routes/shop");
const sequelize = require('./utility/database');

const Category = require("./models/category")
const Product = require("./models/product")
const User = require("./models/user")
const Cart = require("./models/cart")
const CartItem = require("./models/cartItem")
const Order = require("./models/order")
const OrderItem = require("./models/orderItem")
// app.get("/", (req, res) => {
//     res.send("Hello World")
// })

// app.get("/api/products", (req, res) => {
//     res.send("Products listed")
// })

// app.use("/", (req, res, next) => {
//     console.log("logged all files")
//     next()
// })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "/public")))

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user
        next()
    }).catch(err => console.log(err))
})

app.use("/admin", adminRoutes)
app.use(userRoutes)

app.use(errorController.get404Page)

// connection.execute("select name,price from products")
//     .then((result) => {
//         console.log(result[0])
//     }).catch((err) => {
//         console.error(err.sqlMessage)
//     })

// app.set("title", "My Site")
// console.log(app.get("title"))

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log("connection successful")
//     }).catch(err => console.log(err))


// ----------------------------------------
// Database Relationship Configuration
// ----------------------------------------

// sequelize.sync({ force: true }).then(result => {
//     console.log(result)
// }).catch(err => console.log(err))


// Product.hasOne(Category)
Product.belongsTo(Category, {
    foreignKey: {
        allowNull: false
    }
})
Category.hasMany(Product)

Product.belongsTo(User)
User.hasMany(Product)

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Product, { through: OrderItem })
Product.belongsToMany(Order, { through: OrderItem })

let _user;
sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        User.findByPk(1).then(user => {
            if (!user) {
                return User.create({ name: "gokberk", email: "gokberk@gokberk.com" })
            }
            return user
        }).then((user) => {
            _user = user
            return user.getCart()
        }).then(cart => {
            if (!cart) {
                return _user.createCart()
            }
            return cart
        }).then(() => {
            Category.count().then(count => {
                if (count === 0) {
                    Category.bulkCreate([
                        { name: "Phone", description: "Phone Staff" },
                        { name: "Computer", description: "Computer Staff" },
                        { name: "Television", description: "Television Staff" },
                    ])
                }
            })
        })
    }).catch(err => console.log(err))

app.listen(3000, () => {
    console.log("listening on port 3000..")
})
