const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');
const app = express.Router();
const bookingsPageController = require('../controller/BookingsPageController');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Serve the public folder
app.use(express.static('public'));
//Serve the static css files
app.use(express.static(path.join(__dirname, '/views/css')));
//Serve the static js files
app.use(express.static(path.join(__dirname, '/views/js')));

app.get('/:id',async (req,res)=>{
    let propID = req.params['id'];
    let checkinDate = req.query['checkin'];
    let checkoutDate = req.query['checkout'];
    let guestCount = req.query['guests'];

    let response = await bookingsPageController.fetchBookingsDetails(propID,checkinDate,checkoutDate,guestCount);
    response['token'] = req.cookies["accessToken"] === undefined?"": req.cookies["accessToken"];
    res.render('Bookingspage',response);
})


module.exports = app;