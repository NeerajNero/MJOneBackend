const User = require('../models/user.model')

const addUser = async(req,res) => {
    try{
        const {userName,fullName,email,phone} = req.body
        const newUser = new User({userName,fullName,email,phone})
        await newUser.save()
        res.status(201).json({message: "User Added"})
    }catch(error){
        res.status(500).json({message: "error while adding user"})
    }
}
const getUser = async(req,res) => {
    try{
        const getUser = await User.find()
        res.status(200).json({message: "user data fetched successfully", user: getUser})
    }catch(error){
        res.status(500).json({message: "unable to get user data"})
    }
}

module.exports = {addUser, getUser}