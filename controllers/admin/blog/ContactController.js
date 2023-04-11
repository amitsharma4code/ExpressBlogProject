const ContactModel=require('../../../models/contact')
class ContactController{
    static contactdisplay=async(req,res)=>{
        const contact= await ContactModel.find()
        // console.log(contact);
        res.render('./admin/blog/contactdisplay',{bc:contact});
    }
}
 module.exports=ContactController;