const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const app = express.Router();
const propertyPageController = require('../controller/PropertyPageController');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Serve the public folder
app.use(express.static('public'));
//Serve the static css files
app.use(express.static(path.join(__dirname, '/views/css')));
//Serve the static js files
app.use(express.static(path.join(__dirname, '/views/js')));
app.use(cookieParser())

app.get('/:id',async (req,res)=>{
    let propName = req.params['id'];
    let queryCheckin = req.query['checkin'];
    let queryCheckout = req.query['checkout'];
    let queryGuests = req.query['guests'];
    let response = await propertyPageController.fetchPropertyDetails(propName,queryCheckin,queryCheckout,queryGuests);
    response['token'] = req.cookies['accessToken']
    if (response['token']){
        const result = jwt.verify(req.cookies['accessToken'],process.env.JWT_SECRET_KEY);
        response['name'] = result.name;
    }
    res.render('Propertypage',response);
})


module.exports = app;