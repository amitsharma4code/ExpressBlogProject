const express = require('express');
const connectDB=require('./db/connect_db')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload');
var cloudinary = require('cloudinary');
var session = require('express-session')
var flash = require('connect-flash');
const router=require('./routes/web')
const app=express()
const port=3001;

//get token
const cookieParser = require('cookie-parser')
app.use(cookieParser())


//mongoose db connection
connectDB()

//setup ejs

app.set('view engine','ejs')

// body parser
//app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))

//static files path
app.use(express.static('public')); 

//image upload
app.use(fileUpload({useTempFiles:true}));

//message upload
app.use(session({
   secret: 'secret',
   cookie: { maxAge: 60000 },
   resave: false,
   saveUninitialized: false,
   
 }));
 app.use(flash());
 

//router connect
app.use('/',router)


//server create

app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
  })
