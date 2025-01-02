const express = require('express')
const router = express.Router()
const {addToCart, getCart, removeFromCart, increaseQuantity, decreaseQuantity, moveToWishList} = require('../controllers/cartController')

router.post('/addToCart', addToCart)
router.get('/getCart', getCart)
router.delete('/delete/:id', removeFromCart)
router.put('/increaseQuantity', increaseQuantity)
router.put('/decreaseQuantity', decreaseQuantity)
router.post('/moveToWishlist', moveToWishList)

module.exports = router