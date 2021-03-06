const express = require("express")
const router = express.Router()

const shopController = require("../controllers/shop")

router.get("/", shopController.getIndex)

router.get("/products", shopController.getProducts)

router.get("/products/:id", shopController.getProduct)

router.get("/categories/:id", shopController.getProductsByCategories)

router.get("/details", shopController.getProductDetails)

router.get("/cart", shopController.getCart)

router.post("/cart", shopController.postCart)

router.post("/delete-cartitem", shopController.deleteCartItem)

router.get("/orders", shopController.getOrders)

router.post("/create-order", shopController.postOrder)

module.exports = router