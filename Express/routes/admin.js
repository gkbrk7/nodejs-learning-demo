const express = require("express")
const router = express.Router()

const products = [
    { name: "Samsung S8", price: 3000, image: "1.jpg", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { name: "Iphone 8 Plus", price: 6000, image: "2.jpg", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { name: "Iphone X", price: 8000, image: "3.jpg", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { name: "Huawei Mate Pro", price: 7500, image: "4.jpg", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
]

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
    console.log("middleware 2 runned")
    // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    res.render("add-product", { title: "Add New Product", data: products })
    // next()
})

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
    const { name, price, image, description } = req.body
    products.push({ name, price, image, description })
    console.log({ name, price, image, description })
    res.redirect("/")
})

exports.routes = router
exports.products = products