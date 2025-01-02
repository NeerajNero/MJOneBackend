const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    description: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Men', 'Women']
    }
})

const Products = new mongoose.model('Products', productSchema, 'majorProjectOneProducts')
module.exports = Products