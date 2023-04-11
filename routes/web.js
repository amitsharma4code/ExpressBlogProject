const express=require('express')
const router=express.Router()
const AdminController = require('../controllers/admin/AdminController');
const AboutController = require('../controllers/admin/blog/AboutController');
const BlogController = require('../controllers/admin/blog/BlogController');
const CategoryController = require('../controllers/admin/blog/CategoryController');
const ContactController = require('../controllers/admin/blog/ContactController');
const FrontController= require('../controllers/FrontController')
const admin_auth=require('../middleware/auth')




// router.get('/',(req,res)=>{
//     res.send("hello");
// })
// router.get('/home',(req,res)=>{
//     res.send("home page");
// })
// router.get('/about',(req,res)=>{
//     res.send("about")
// })
// router.get('/about123',(req,res)=>{
//     res.send("about 123")
// })

//Front Controller
router.get('/',FrontController.home)
router.get('/about',FrontController.about)
router.get('/contact',FrontController.contact)
router.get('/blog',FrontController.blog)
router.get('/login',FrontController.login)
router.get('/register',FrontController.adminregister)
router.post('/admininsert',FrontController.admininsert)
router.post('/verify_login',FrontController.verifylogin)
router.get('/logout',FrontController.logout)

//admin controler routes
router.get('/admin/dashboard',admin_auth,AdminController.dashboard);
router.get('/admin/blogdisplay',admin_auth,BlogController.blogdisplay);
router.get('/admin/categorydisplay',admin_auth,CategoryController.categorydisplay);
router.get('/admin/contactdisplay',admin_auth,ContactController.contactdisplay);
router.get('/admin/aboutdisplay',admin_auth,AboutController.aboutdisplay);
router.post('/bloginsert',BlogController.bloginsert)
router.get('/admin/blogview/:id',BlogController.blogview)
router.get('/admin/blogedit/:id',BlogController.blogedit)
router.post('/blogupdate/:id',BlogController.blogupdate)
router.get('/admin/blogdelete/:id',BlogController.blogdelete)
router.get('/detailblog/:id',BlogController.detailblog)
router.post('/savecontact',BlogController.savecontact)



module.exports=router