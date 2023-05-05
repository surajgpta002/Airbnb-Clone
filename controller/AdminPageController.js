const model = require('../model/Model');

module.exports = {
    
    insertProperty: async (req)=>{
        let response = await model.addProperty(req);
        return response;
    },
    updateProperty: async (filter,req)=>{
        let response = await model.updateProperty(filter,req);
        return response;
    },
    getProperty: async (filter)=>{
        let response = await model.getProperty(filter);
        return response;
    },
    deleteProperty: async(filter)=>{
        let response = await model.deleteProperty(filter);
        return response;
    },
    getUsers: async()=>{
        let resultResponse = await model.getUsers();
        let result = {
            response: resultResponse,
            type:"users",
            userType:"admin"
        }
        return result;
    },
    addUser: async(request)=>{
        let result = await model.addUserToDB(request);
        return result;
    },
    deleteUser: async(filter)=>{
        let result = await model.deleteUser(filter);
        return result;
    }
}