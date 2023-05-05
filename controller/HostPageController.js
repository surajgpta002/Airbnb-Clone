const model = require('../model/Model');
module.exports = {

    getHostProperties:async (reqEmail,reqPhone)=>{
        let dbResponse;
        if (reqEmail == 'undefined'){
            dbResponse = await model.getHostProperties({phone:reqPhone});
        }else if (reqPhone == 'undefined'){
            dbResponse = await model.getHostProperties({email:reqEmail});
        }
        let res = {
            response: (dbResponse.properties == null || dbResponse.properties == undefined?[]:dbResponse.properties),
            type: "properties",
            userType: (dbResponse.type == "user" ? "host":dbResponse.type) 
        }

        return res;
    }
}