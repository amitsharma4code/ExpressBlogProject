const mongoose = require('mongoose')


const connectDB=()=>{
    return mongoose.connect('mongodb+srv://radhakirshan:ramram@liveprojects.yzrt8sy.mongodb.net/Blog')

    .then(()=>{
        console.log('Connection succesfull')
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=connectDB