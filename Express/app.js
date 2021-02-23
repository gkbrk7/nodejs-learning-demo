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

// Product.hasOne(Category)
// Product.belongsTo(Category, {
//     foreignKey: {
//         allowNull: false
//     }
// })
// Category.hasMany(Product)

// sequelize.sync({ force: true }).then(result => {
//     console.log(result)
// }).catch(err => console.log(err))

// sequelize.sync().then(() => {
//     Category.count().then(count => {
//         if (count === 0) {
//             Category.bulkCreate([
//                 { name: "Phone", description: "Phone Staff" },
//                 { name: "Computer", description: "Computer Staff" },
//                 { name: "Television", description: "Television Staff" },
//             ])
//         }
//     })

// })

app.listen(3000, () => {
    console.log("listening on port 3000..")
})
