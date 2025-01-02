const mongoose = require('mongoose')

const initializeDatabase = async() =>{
    const connect = await mongoose.connect("mongodb://localhost:27017/")
    if(!connect){
        console.log("error occured while connecting to database")
    }
    console.log("connection to database was successfull")
}
module.exports = initializeDatabase