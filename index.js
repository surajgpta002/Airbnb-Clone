const express = require('express');
const path = require('path');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const admin = require('./routes/admin');
const property = require('./routes/property')
const booking = require('./routes/booking');
const host = require('./routes/host');
const app = express();
const PORT = process.env.PORT || 3000;
const homePageController = require('./controller/HomePageController');
const { userValidationRules, validate, isValidLogin } = require('./middleware/validator');
//Setting the routes
app.use('/admin',admin);
app.use('/rooms',property);
app.use('/book',booking);
app.use('/host',host);
app.use(cookieParser());
app.set('view engine','ejs');//Telling express that this engine will be used
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('views'));
//Serve the public folder
app.use(express.static('public'));
//Serve the static css files
app.use(express.static(path.join(__dirname,'/views/css')));
//Serve the static js files
app.use(express.static(path.join(__dirname,'/views/js')));
app.get('/',async (req,res)=>{
    let result = await homePageController.get();
    result['token'] = req.cookies["accessToken"]
    res.render('Homepage',result);
})

app.get('/search',async (req,res)=>{
    let result = await homePageController.getQuery(req.query);
    res.render('Homepage',result);
})

app.post('/auth', isValidLogin,async (req,res)=>{
    
    let jsonArrayRespose = await homePageController.authenticateUser(req.body);  
    if (jsonArrayRespose.length !=0){
        const token = jwt.sign({"role":jsonArrayRespose[0].type,"name":jsonArrayRespose[0].firstname},process.env.JWT_SECRET_KEY)
        if (jsonArrayRespose[0].password != req.body.password) {
            res.status(400).json({"errors":{
                status:400,
                message: "Invalid Password"
             }
            })
            return
        }else{
            res.cookie("accessToken",token,{httpOnly:true}).status(200)
            .json(jsonArrayRespose[0]);    
        }
    }else{
        res.status(404).json({"errors":{
            status:400,
            message: "User Not Found!"
        }

        })    
    }
})

app.post('/register',userValidationRules(),validate,async (req,res)=>{
    let jsonResponse = await homePageController.addUser(req.body);
    const token = jwt.sign({"role":req.body.type,"name":req.body.firstname},process.env.JWT_SECRET_KEY)
    res.cookie("accessToken",token,{httpOnly:true}).status(200).json(jsonResponse);
})

app.post('/logout',async(req,res)=>{
    res.clearCookie("accessToken").status(200)
    .json({
        message: "Logged Out Successfully"
    })
})

app.use((error,req,res,next)=>{
    res.send({
        success:false,
        message: "Something went wrong , please contact helpdesk",
        failureReason: error.message
    })

    next()
})

app.listen(PORT,()=>{
    console.log("The app is running at port: "+PORT);
});