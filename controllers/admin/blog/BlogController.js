const { findById } = require("../../../models/Blog");
const BlogModel = require("../../../models/Blog");
const ContactModel=require("../../../models/contact")
const CategoryModel=require("../../../models/Categoary")
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwzcdo3uq",
  api_key: "537226856975565",
  api_secret: "PuGZrlmHthL8yOa9ntjrNsKoawE",
  secure: true,
});

class BlogController {
  static blogdisplay = async (req, res) => {
    const data = await BlogModel.find()
    // console.log(data)
    res.render("./admin/blog/blogdisplay", { bd: data });
  };

  static bloginsert = async (req, res) => {
    // console.log("hello data", req.body);
    // console.log("Image", req.files);
    const imagefile = req.files.blog_img;
    // console.log(imagefile);
    const uploadimg = await cloudinary.uploader.upload(
      imagefile.tempFilePath,
      {
        folder: "blog_Image",
      }
    );
    console.log(uploadimg);
    try {
      const result = new BlogModel({
        title: req.body.title,
        description: req.body.description,
        image: {
          public_id: uploadimg.public_id,
          url: uploadimg.secure_url,
        },
      });
      await result.save();
      res.redirect("/admin/blogdisplay");
    } catch (err) {
      console.log(err);
    }
  };
  static blogview = async (req, res) => {
    // console.log(req.params.id)
    try {
      const result = await BlogModel.findById(req.params.id);
      //    console.log(result);
      res.render("admin/blog/blogview", { b: result });
    } catch (err) {
      console.log(err);
    }
  };
  static blogedit = async (req, res) => {
    // console.log(req.params.id)
    try {
      const result = await BlogModel.findById(req.params.id);
      // console.log(result);
      res.render("admin/blog/blogedit", { b: result });
    } catch (err) {
      console.log(err);
    }
  };
  static blogupdate = async (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body)
    // const files=req.files.image;
    // console.log("files",files); 
    try{
    // image deletion
     const blogdata= await BlogModel.findById(req.params.id)
    //  console.log(blogdata);
     const imageid=blogdata.image.public_id;
    //  console.log(imageid);
    await cloudinary.uploader.destroy(imageid)
   
    //image update
    const file=req.files.image
    // console.log("file",file)
    const  myimage=await cloudinary.uploader.upload(file.tempFilePath,{
      folder: "blog_Image",
    })
    const result= await BlogModel.findByIdAndUpdate(req.params.id,{
      title:req.body.title,
      description:req.body.description,
      image:{
        public_id:myimage.public_id,
        url:myimage.secure_url
      },
    });
    await result.save();
    res.redirect('/admin/blogdisplay');
  }catch(err){

  }

  };
  static blogdelete = async (req, res) => {
    try {
      //cloudanry image delete
      const blogdata= await BlogModel.findById(req.params.id)
    //  console.log(blogdata);
     const imageid=blogdata.image.public_id;
    //  console.log(imageid);
     await cloudinary.uploader.destroy(imageid)
      
      //  console.log(req.params.id)
      const result = BlogModel.findByIdAndDelete(req.params.id);
      await result.deleteOne();
      res.redirect("/admin/blogdisplay");
    } catch (err) {
      console.log(err);
    }
  };

  static detailblog=async(req,res)=>{
    // console.log(req.params.id);
    const recent=await BlogModel.find();
    const detail=await BlogModel.findById(req.params.id);
    res.render('admin/blog/detailblog',{d:detail,rec:recent})

  }
  
  static savecontact=async(req,res)=>{
    // console.log(req.body)
    const result= new ContactModel({
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      message:req.body.message
    })
    await result.save()
    req.flash('success',"Message Send Successfully,You canact as soon as possible")
    res.redirect('/contact')
  }
}
module.exports = BlogController;
