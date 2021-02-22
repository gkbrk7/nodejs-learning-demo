const express = require("express")
const router = express.Router()

const shopController = require("../controllers/shop")

router.get("/", shopController.getIndex)

router.get("/products", shopController.getProducts)

router.get("/products/:id", shopController.getProduct)

router.get("/categories/:id", shopController.getProductsByCategories)

router.get("/details", shopController.getProductDetails)

router.get("/cart", shopController.getCart)

router.get("/orders", shopController.getOrders)


module.exports = router