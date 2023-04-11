const mongoose=require('mongoose')

//define schema
const CategorySchema=new mongoose.Schema({
    catname:{
        type:String,
        require:true
    }
    
},{timestamps:true})
//create collection

                                   // coll     //Schema  
const CategoryModel=mongoose.model('category',CategorySchema);

module.exports=CategoryModel;