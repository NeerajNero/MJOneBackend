const Wishlist = require('../models/wishlist.model')
const Cart = require('../models/cart.model')

const addToWishlist = async(req,res) => {
    try{
        const {productId} = req.body
        const findProduct = await Wishlist.findOne({product: productId})
        if(!findProduct){
            const newProduct = {
                product: productId
            }
            const addProduct = new Wishlist(newProduct)
            await addProduct.save()
            const findWishlist = await Wishlist.find().populate('product')
            return res.status(201).json({message: "item added to wishlist", wishlist: findWishlist[findWishlist.length-1]})
        }
        res.status(409).json({message: "item already exists in wihslist"})

    }catch(error){
        res.status(500).json({message: "unable to add item to wishlist"})
    }
}
const getWishlist = async(req, res) => {
    try{
        const getWishlist = await Wishlist.find().populate('product')
        if(getWishlist.length === 0){
            return res.status(404).json({message: "no wishlist data available"})
        }
        res.status(200).json({message: "wishlist data fetched successfully", wishlist: getWishlist})
    }catch(error){
        res.status(500).json({message: "unable to get wishlist data"})
    }
}
const removeFromWishlist = async(req,res) => {
    try{
        const { productId } = req.params;
    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    const findProduct = await Wishlist.findById(productId);
    if (!findProduct) {
        return res.status(404).json({ message: "Item not found in wishlist" });
    }
    await Wishlist.findByIdAndDelete(productId);

    res.status(200).json({ message: "Item removed from wishlist successfully", productId});
    }catch(error){
        res.status(500).json({message: "error occured while deleting item from wishlist"})
    }
}
const moveToCart = async(req,res) => {
    try{
        const {productIdofProduct,productIdofWishlistItem} = req.body

        if (!productIdofProduct || !productIdofWishlistItem) {
            return res.status(400).json({ message: "Invalid product or wishlist item ID" });
          }
        const findProduct = await Cart.findOne({product:productIdofProduct})
        if(!findProduct){
            const newProduct = {
                product: productIdofProduct,
                quantity: 1
            }
            const addProduct = new Cart(newProduct);
            await addProduct.save()
        }else{
            findProduct.quantity = findProduct.quantity + 1;
            await findProduct.save()
        }
        await Wishlist.findByIdAndDelete(productIdofWishlistItem)
        const findNewProduct = await Cart.findOne({product:productIdofProduct}).populate('product')
        res.status(200).json({message: "product moved to cart successfully", product: findNewProduct})
    }catch(error){
        res.status(500).json({ message: "Unable to move item to cart", error: error.message })
    }
}
module.exports = {addToWishlist, getWishlist, removeFromWishlist, moveToCart}