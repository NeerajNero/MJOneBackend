const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
        unique: true
    }
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema, 'majorProjectOneWishlist')
module.exports = Wishlist