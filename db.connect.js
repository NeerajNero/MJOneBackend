const mongoose = require('mongoose')

const initializeDatabase = async() =>{
    const connect = await mongoose.connect("mongodb+srv://nero:nero@neog.ghizv.mongodb.net/?retryWrites=true&w=majority&appName=neoG")
    if(!connect){
        console.log("error occured while connecting to database")
    }
    console.log("connection to database was successfull")
}
module.exports = initializeDatabase