const express = require('express');
const bodyParser = require("body-parser")
const path = require('path');
const app = express()

app.set("view engine", "pug")
app.set("views", "./views")

const admin = require("./routes/admin")
const userRoutes = require("./routes/user")



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

app.use("/admin", admin.routes)

app.use(userRoutes)

// app.set("title", "My Site")
// console.log(app.get("title"))

app.use((req, res) => {
    // res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
    res.status(404).render("404", { title: "404 Not Found" })
})

app.listen(3000, () => {
    console.log("listening on port 3000..")
})
