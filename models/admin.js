const mongoose= require('mongoose')

const AdminSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    
},{timestamps:true})

//create connecton

const AdminModel=mongoose.model('admin',AdminSchema)

module.exports=AdminModel;