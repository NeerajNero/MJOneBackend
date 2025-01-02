const express = require('express')
const router = express.Router()
const {getWishlist, addToWishlist, removeFromWishlist, moveToCart} = require('../controllers/wishlistController')

router.get('/wishlist', getWishlist)
router.post('/addToWishlist', addToWishlist)
router.delete('/deleteFromWishlist/:productId', removeFromWishlist)
router.post('/moveToCart', moveToCart)

module.exports = router