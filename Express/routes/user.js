const express = require("express")
const router = express.Router()

const admin = require("./admin")

router.get("/", (req, res, next) => {
    // res.sendFile(path.join(__dirname, "../", "views", "index.html"))
    res.render("index", { title: "Home Page", data: admin.products })
})

module.exports = router