const mongoose = require('mongoose')
const connectDB=()=>{
    return mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log('Connection succesfull')
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=connectDB