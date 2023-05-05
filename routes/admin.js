const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express.Router();
const {formValidationRules,validateForm,userFormValidation,validateUserDetails} = require('../middleware/validator');
const homePageController = require('../controller/HomePageController');
const adminPageController = require('../controller/AdminPageController');
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
        res.render('../public/Error',{error:{message:"Either login as admin or you don't have access to admin page"}});
    }
})
let updateFilter = "";
app.get('/', async (req, res) => {
    if ((req.cookies['accessToken']!==""||req.cookies['accessToken']!==undefined) && req['userBlock'].role== "admin"){
        let result = await homePageController.get();
        result['userType'] = "admin";
        result['token'] = req.cookies['accessToken']
        res.render('Adminpage', result);
    }
    
})


app.get('/getProperty', async (req, res) => {
    updateFilter = req.query.name;
    let result = await adminPageController.getProperty({ name: updateFilter });
    res.json(result);
})
app.post('/addProperty',formValidationRules(),validateForm,async (req, res) => {
    let jsonResponse = await adminPageController.insertProperty(req.body);
    res.json(jsonResponse);
})

app.put('/updateProperty', formValidationRules(),validateForm,async (req, res) => {
    let jsonResponse = await adminPageController.updateProperty({ name: updateFilter }, req.body);
    res.json(jsonResponse)
})

app.delete('/deleteProperty', async (req, res) => {
    updateFilter = req.query.name;
    let result = await adminPageController.deleteProperty({ name: updateFilter });
    res.json(result);
})

app.get('/users', async (req, res) => {
    if ((req.cookies['accessToken']!==""||req.cookies['accessToken']!==undefined) && req['userBlock'].role== "admin"){
    let response = await adminPageController.getUsers();
    response['token'] = req.cookies['accessToken']
    res.render('Adminpage', response);
    }
})

app.post('/users/addUser', userFormValidation(),validateUserDetails,async (req, res) => {
    let response = await adminPageController.addUser(req.body);
    res.json(response);
})

app.delete('/users/deleteUser', async (req, res) => {
    updateFilter = req.query.firstname;
    let result = await adminPageController.deleteUser({ firstname: updateFilter, email: req.query.email});
    res.json(result);
})
module.exports = app;