const express = require('express')
const router = express.Router()
const {getUser, addUser} = require('../controllers/userController')

router.post('/addUser', addUser)
router.get('/getUser', getUser)

module.exports = router