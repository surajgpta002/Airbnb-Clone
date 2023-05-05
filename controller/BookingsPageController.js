const model = require('../model/Model');

exports.fetchBookingsDetails = async (propId,checkin,checkout,guests)=>{
    
    let result = await model.getProperty({_id:propId});
    let res = {
        response: result,
        checkinDate: checkin,
        checkoutDate: checkout,
        guestDetails: guests
    }
    return res;
}