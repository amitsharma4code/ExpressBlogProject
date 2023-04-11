const mongoose = require('mongoose')


const connectDB=()=>{
    return mongoose.connect('mongodb://0.0.0.0:27017/BlogWebsite')

    .then(()=>{
        console.log('Connection succesfull')
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=connectDB