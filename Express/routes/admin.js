const express = require("express")
const router = express.Router()

const adminController = require("../controllers/admin")

router.get("/products", adminController.getProducts)

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct)

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct)

router.get("/categories", adminController.getCategories)

// /admin/categories/1 => GET
router.get("/categories/:id", adminController.getEditCategory)

// /admin/categories => POST
router.post("/categories", adminController.postEditCategory)

// /admin/add-category => GET
router.get("/add-category", adminController.getAddCategory)

// /admin/add-category => POST
router.post("/add-category", adminController.postAddCategory)

router.post("/delete-category", adminController.postDeleteCategory)

// /admin/products/1 => GET
router.get("/products/:id", adminController.getEditProduct)

// /admin/products => POST
router.post("/products", adminController.postEditProduct)

router.post("/delete-product", adminController.postDeleteProduct)

module.exports = router