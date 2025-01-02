const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        trim: true
      },
      building: {
        type: String,
        required: true,
        trim: true
      },
      landmark: {
        type: String,
        trim: true, 
      },
      state: {
        type: String,
        required: true,
        trim: true
      },
      city: {
        type: String,
        required: true,
        trim: true
      },
      pincode: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{6}$/, 'Please provide a valid 6-digit pincode']
      }
})

const Address = mongoose.model('Address', addressSchema, 'majorProjectOneAddress')
module.exports = Address