const BlogModel = require("../models/Blog");
const AdminModel = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary=require('cloudinary')
class FrontController {
  static home = async (req, res) => {
    // res.send("hello home");
    // const image=req.files;
    // const uploadimg= await cloudinary.uploader.upload(req.tempFilePath,{
    //   floder:"api image ",
    //   width:150,
    
    // })
    const data = await BlogModel.find().limit(6).sort({ _id: -1 });
    // console.log(data);
    res.render("home", { d: data });
  };
  static about = (req, res) => {
    // res.send("hello about")
    res.render("about");
  };
  static footer = (req, res) => {
    res.send("hello from footer");
  };
  static contact = (req, res) => {
    res.render("contact", { message: req.flash("success") });
  };
  static blog = async (req, res) => {
    const bloglist = await BlogModel.find().sort({ _id: -1 });
    res.render("blog", { bl: bloglist });
  };

  static adminregister = async (req, res) => {
    res.render("register", { message: req.flash("error") });
  };
  static admininsert = async (req, res) => {
    try {
      // console.log(req.body)
      const { name, email, password, cpassword } = req.body;
      const admin = await AdminModel.findOne({ email: email });
      // console.log(admin);
      if (admin) {
        req.flash("error", "email already exists");
        res.redirect("/register");
      } else {
        if (name && email && password && cpassword) {
          if (password == cpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new AdminModel({
              name: name,
              email: email,
              password: hashpassword,
            });
            await result.save();
            req.flash("success", "login successful please login");
            res.redirect("/login");
          } else {
            req.flash("error", "password and cpassword are not match");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "all field are required");
          res.redirect("/register");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  //login
  static login = (req, res) => {
    res.render("login", {
      message: req.flash("success"),
      message1: req.flash("error"),
    });
  };

  //verigylogin
  static verifylogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      // console.log(email,password)
      if (email && password) {
        const admin = await AdminModel.findOne({ email: email });
        // console.log(admin)
        if (admin != null) {
          const ismatched = await bcrypt.compare(password, admin.password);
          // console.log(ismatched)
          if (ismatched) {
            //token generated
            const token = jwt.sign({ id: admin._id }, "amitdigital");
            // console.log(token)
            res.cookie("token", token);
            res.redirect("/admin/dashboard");
          } else {
            req.flash("error", "email or password doesn't matched");
            res.redirect("/login");
          }
        } else {
          req.flash("error", "you are not registered");
          res.redirect("/login");
        }
      } else {
        req.flash("error", "Email and Password both filds are required");
        res.redirect("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/login");
    } catch (err) {
      console.log(err);
    }
  };
}
module.exports = FrontController;
