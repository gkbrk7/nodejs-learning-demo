const express = require('express');
const bodyParser = require("body-parser")
const errorController = require('./controllers/errors');
const path = require('path');
const connection = require("./utility/database")

const app = express()

app.set("view engine", "pug")
app.set("views", "./views")

const adminRoutes = require("./routes/admin")
const userRoutes = require("./routes/shop")



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


// connection.execute("select name,price from products")
//     .then((result) => {
//         console.log(result[0])
//     }).catch((err) => {
//         console.error(err.sqlMessage)
//     })

// app.set("title", "My Site")
// console.log(app.get("title"))

app.use(errorController.get404Page)

app.listen(3000, () => {
    console.log("listening on port 3000..")
})
