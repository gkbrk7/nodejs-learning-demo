const express = require("express")
const router = express.Router()
const path = require('path');

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
    console.log("middleware 2 runned")
    res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    // next()
})

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
    console.log(req.body)
    res.redirect("/")
})

module.exports = router