const express = require('express');
const bodyParser = require("body-parser")
const errorController = require('./controllers/errors');
const mongoConnect = require("./utility/database")
const path = require('path');

const app = express()

app.set("view engine", "pug")
app.set("views", "./views")

// const adminRoutes = require("./routes/admin")
// const userRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "/public")))

// app.use("/admin", adminRoutes)
// app.use(userRoutes)

app.use(errorController.get404Page)

mongoConnect((client) => {
    app.listen(3000)
    console.log(client)
})
