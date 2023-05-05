const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express.Router();
const {formValidationRules,validateForm } = require('../middleware/validator');
const homePageController = require('../controller/HomePageController');
const adminPageController = require('../controller/AdminPageController');
const hostPageController = require('../controller/HostPageController');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
//Serve the public folder
app.use(express.static('public'));
//Serve the static css files
app.use(express.static(path.join(__dirname, '/views/css')));
//Serve the static js files
app.use(express.static(path.join(__dirname, '/views/js')));

app.use((req,res,next)=>{
    const token = req.cookies['accessToken']
    if (token){
        const result = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req['userBlock'] = result; 
        next()
    }else{
        req['userBlock'] = "";
        res.render('../public/Error',{error:{message:"Either login as host or you don't have access to host page"}});
    }
})

app.get('/',async (req,res)=>{
    if ((req.cookies['accessToken']!==""||req.cookies['accessToken']!==undefined) && req['userBlock'].role== "host"){
    let result = await hostPageController.getHostProperties(req.query['email'],req.query['phone']);
    result['token'] = req.cookies['accessToken']
    res.render('Adminpage',result);
    }
})

app.post('/addProp',formValidationRules(),validateForm,(req,res)=>{
    res.status(201).json({
        success: true,
        message: "Property add request sent"
    })
})

app.put('/editProp',formValidationRules(),validateForm,(req,res)=>{
    res.status(200).json({
        success: true,
        message: "Property edit request sent"
    })
})

app.delete('/deleteProp',(req,res)=>{
    res.status(200).json({
        success: true,
        message: "Property delete request sent"
    })
})
module.exports = app;