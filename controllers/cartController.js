const Cart = require('../models/cart.model')
const Wishlist = require('../models/wishlist.model')
const addToCart = async(req,res) => {
    try{
        const {product,quantity} = req.body
        if(!product || !quantity){
            return res.status(500).json({message: "product and quantity is required"})
        }
        const findProduct = await Cart.findOne({product})
        if(!findProduct){
            const saveToCart = new Cart({product, quantity})
            await saveToCart.save()
            const findCart = await Cart.find().populate('product')
            return res.status(201).json({message: "Item added to cart successfully", cart: findCart[findCart.length-1]})
        }
        findProduct.quantity+= quantity
        await findProduct.save()
        const findCart = await Cart.find().populate('product')
        const findindex = findCart.findIndex((cartProduct) => cartProduct.product._id.toString() === product.toString())
        res.status(201).json({message: "product quantity updated", cart: findCart[findindex]})
    }catch(error){
        res.status(500).json({message: "error occured while adding to cart", error: error.message})
    }
}
const getCart = async(req,res) => {
    try{
        const getCart = await Cart.find().populate('product')
        if(!getCart){
           return res.status(404).json({message: "cart data not found"})
        }
        res.status(200).json({message: "cart data fetched successfully", cart: getCart})
    }catch(error){
        res.status(500).json({message: "error occured while fetching cart data"})
    }
}
const removeFromCart = async(req,res) => {
    try{
        const {id} = req.params
        const deleteItem = await Cart.findByIdAndDelete(id)
        if(!deleteItem){
            return res.status(500).json({message: "unable to delete item"})
        }
        res.status(200).json({message:"item deleted successfully", id})
    }catch(error){
        res.status(500).json({message: "error while deleting item"})
    }
} 
const increaseQuantity = async(req,res) => {
    try{
        const {productId} = req.body
        const findProduct = await Cart.findByIdAndUpdate(productId, {$inc: {quantity: 1}}, {new: true})
        if(!findProduct){
           return res.status(404).json({message: "product not found"})
        }

        res.status(200).json({message: "product found and updated its quantity", product: findProduct})
    }catch(error){
        res.status(500).json({message: "error occured while increasing quantity"})
    }
}
const decreaseQuantity = async(req,res) => {
    try{
        const {productId} = req.body
        const findProduct = await Cart.findById(productId)
        if(!findProduct){
            return res.status(404).json({message: "product not found"})
        }
        if(findProduct.quantity > 1){
            findProduct.quantity = findProduct.quantity - 1
            await findProduct.save()
            return res.status(200).json({message: "product quantity decreased successfully", product: findProduct})
        }
        await Cart.findByIdAndDelete(productId)
        res.status(200).json({ message: "Product deleted successfully", product: findProduct});
    }catch(error){
        res.status(500).json({message: "error occured while decreasing quantity"})
    }
}
const moveToWishList = async(req,res) => {
    try{
        const {productIdofProduct, productIdofCartItem} = req.body
        if(!productIdofProduct || !productIdofCartItem) {
            return res.status(400).json({message: "both id's are required"})
        }
        const findProduct = await Wishlist.findOne({product: productIdofProduct})
        if(!findProduct){
            const addProduct = new Wishlist({product: productIdofProduct})
            await addProduct.save()
        }
        const findNewProduct = await Cart.findOne({product: productIdofProduct}).populate('product')
        await Cart.findByIdAndDelete(productIdofCartItem)
        res.status(200).json({message: "Item moved to wishlist successfully", product: findNewProduct})
    }catch(error){
        res.status(500).json({message: "unable to move item to wishlist", error: error.message})
    }
}
module.exports = {addToCart,getCart,removeFromCart,increaseQuantity,decreaseQuantity,moveToWishList}