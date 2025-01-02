const express = require('express')
const router = express.Router()
const {addAddress, updateAddress, getAddress, deleteAddress} = require('../controllers/addressController')

router.post('/addAddress', addAddress)
router.put('/updateAddress', updateAddress)
router.get('/getAddress', getAddress)
router.delete('/deleteAddress/:addressId', deleteAddress)

module.exports = router