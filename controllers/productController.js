const Products = require('../models/products.model')
const addProduct = async(req,res) => {
    try{
        const addProduct = new Products(req.body)
        await addProduct.save()
        if(!addProduct){
           return res.status(401).json({message: 'unable to add Product'})
        }
        res.status(201).json({message: 'product added successfully', product: addProduct})
    }catch(error){
        res.status(500).json({message: "error occured while adding product"})
    }
}

const getProducts = async(req,res) => {
    try{
        const fetchProducts = await Products.find()
        if(!fetchProducts){
            return res.status(404).json({message: "no products found"})
        }
        res.status(200).json({message: "products fetched successfully", products: fetchProducts})
    }catch(error){
        res.status(500).json({message: 'unable to fetch products'})
    }
}

module.exports = {addProduct, getProducts}