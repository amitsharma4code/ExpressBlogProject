const BlogModel=require('../../../models/Blog')
class CategoryController{
    static categorydisplay=async(req,res)=>{
        const category= await BlogModel.find()
        // console.log(category);
        res.render('./admin/blog/categorydisplay',{bc:category});
    }
}
 module.exports=CategoryController;