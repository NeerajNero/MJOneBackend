const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    product : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
})

const Cart = mongoose.model('Cart', cartSchema, 'majorProjectOneCart')
module.exports = Cart