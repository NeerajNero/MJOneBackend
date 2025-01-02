const express = require('express')
const app = express()
const cors = require('cors')
const initializeDatabase = require('./db.connect')
const productRoute = require('./routes/productRoute')
const cartRoute = require('./routes/cartRoutes')
const wishlistRoute = require('./routes/wishlistRoutes')
const userRoute = require('./routes/userRoutes')
const addressRoute = require('./routes/addressRoute')

initializeDatabase()

app.use(express.json())
app.use(cors({
    origin: '*'
}))
app.use('/product', productRoute)

app.use('/cart',cartRoute)

app.use('/wishlist', wishlistRoute)

app.use('/user', userRoute)

app.use('/address',addressRoute)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})