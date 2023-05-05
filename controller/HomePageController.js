const homePageModel = require('../model/Model');
function isCharacter(char){
    return new RegExp("[a-zA-Z]").test(char);
}
module.exports = {
    get: async ()=>{
        const result =  {
            "response": await homePageModel.fetchProperties(),
            "type":"properties"
        }
        return result;
    },
    getQuery: async (parameters)=>{
        // let queryLocation = ;
        let queryGuests = parameters.guests.split(',');
        let adultCount = queryGuests[0];
        let havingPets = queryGuests[2]==null?false:true;
        const result = {
            response: await homePageModel.fetchSearchedResult(parameters.location,adultCount.charAt(0),havingPets),
            type: "properties"
        }

        return result;
        
    },
    authenticateUser: async(request)=>{
        let requestPhone = request.phoneNumber;
        let requestCountryCode = request.countryCode; 
        let requestEmail = request.email;
        let onlyCode = "+";
        
        for (let i=0;i< requestCountryCode.length;i++){
            if (!isCharacter(requestCountryCode.charAt(i))){
                onlyCode+=requestCountryCode.charAt(i);
            }
        }
        let phoneNumber = requestPhone == ''?'' :onlyCode +" "+ requestPhone;
        
        let result = await homePageModel.authenticateUserDB(requestEmail,phoneNumber);
       
        return result;
    },
    addUser: async(request)=>{
       let result = await homePageModel.insertUser(request);
       
       return result
    }         
}