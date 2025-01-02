const express = require('express')
const router = express.Router()
const {addProduct, getProducts} = require('../controllers/productController')

router.post('/addProduct', addProduct)
router.get('/products', getProducts)

module.exports = router