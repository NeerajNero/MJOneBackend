const Address = require('../models/address.model')

const addAddress = async(req,res) => {
    try{
        const {street,building,landmark,state,city,pincode} = req.body
        if(!street || !building || !state || !city || !pincode){
            return res.status(400).json({message: "all fields are required"})
        }
        const addNewAddress = new Address({street,building,landmark,state,city,pincode})
        await addNewAddress.save()
        const findAddress = await Address.find()
        res.status(201).json({message: 'address added successfully', address: findAddress[findAddress.length-1]})
    }catch(error)
    {
        res.status(500).json({message: "unable to add address", error: error.message})
    }
}
const updateAddress = async(req,res) => {
    try{
        const {street,building,landmark,state,city,pincode,productId} = req.body
        if(!street || !building || !state || !city || !pincode){
            return res.status(400).json({message: "all fields are required"})
        }
        const findAddress = await Address.findByIdAndUpdate(productId, {street,building,landmark,state,city,pincode}, {new:true})
        if (!findAddress) {
            return res.status(404).json({ message: 'Address not found' });
          }
        res.status(200).json({message: "address updated succesfully", address: findAddress})
    }catch(error){
        res.status(500).json({message: "unable to update address", error: error.message})
    }
}
const getAddress = async(req,res) => {
    try{
        const getAddress = await Address.find()
        if(getAddress.length === 0){
            return res.status(404).json({message: "address not found"})
        }
        res.status(200).json({mesage: "address found", address: getAddress})
    }catch(error){
        res.status(500).json({message: "unable to get address", error: error.message})
    }
}
const deleteAddress = async(req,res) => {
    try{
        const {addressId} = req.params
        const findAddress = await Address.findByIdAndDelete(addressId)
        if(!findAddress){
            return res.status(404).json({message: "address not found"})
        } 
        res.status(200).json({message: "address deleted successfully", addressId})
    }catch(error){
        res.status(500).json({message: "unable to delete address", error: error.message})
    }
}
module.exports = {addAddress,updateAddress,getAddress,deleteAddress}