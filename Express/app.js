const express = require('express');
const bodyParser = require("body-parser")
const path = require('path');
const adminRoutes = require("./routes/admin")
const userRoutes = require("./routes/user")
const app = express()

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

app.use("/admin", adminRoutes)

app.use(userRoutes)

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})

app.listen(3000, () => {
    console.log("listening on port 3000..")
})
