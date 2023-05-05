const model = require('../model/Model');

module.exports = {

    fetchPropertyDetails: async(inputId,queryCheckin,queryCheckout,queryGuests)=>{
        let result = await model.getProperty({_id:inputId});
        let res = {
            response: result,
            checkinDate: queryCheckin,
            checkoutDate: queryCheckout,
            guestDisplay: queryGuests
        }
        return res;
    }
}