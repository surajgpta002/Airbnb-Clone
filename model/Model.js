const {MongoClient,Decimal128} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
var client = new MongoClient(process.env.MONGODB_URI);

exports.fetchProperties = async ()=>{
    try {
        await client.connect();
        let output = await client.db('sample_airbnb').collection('listingsAndReviews').find().limit(20).toArray();
       return output;
    } catch (error) {
        console.log(error);
    }finally{
        await client.close()
    }

    return null;
}

exports.fetchSearchedResult = async (location,guestCount,havingpets)=>{
    try {
        await client.connect();
        let output;
        if (havingpets){
            output = await client.db('sample_airbnb').collection('listingsAndReviews').find({"address.country":location,accommodates:{$gte:parseInt(guestCount)},house_rules:{$not:{$regex:'.*No Pets.*'}}}).limit(20).toArray();
        }else{
            output = await client.db('sample_airbnb').collection('listingsAndReviews').find({"address.country":location,accommodates:{$gte:parseInt(guestCount)}}).limit(20).toArray();
        }
        return output;
    } catch (error) {
        console.log(error);
    }finally{
        
    }
}

exports.authenticateUserDB = async(reqemail,reqphone)=>{
    let output;
    try {
        await client.connect();
        if (reqemail!=''){
            output = await client.db('sample_airbnb').collection('users').find({email:reqemail}).toArray();
        }else if (reqphone!=''){
            let json = {phone:reqphone};
            output = await client.db('sample_airbnb').collection('users').find({phone:reqphone}).toArray();
        }
        return output;
    } catch (error) {
        console.log(error);
    }finally{
        
    }
}

exports.insertUser = async (request)=>{
    let output;
    try {
        await client.connect();
        output = await client.db("sample_airbnb").collection("users").insertOne(request);
        return output
    } catch (error) {
        console.log(error);
    }finally{
       
    }
}

exports.addProperty = async(request)=>{
    let output;
    try {
        await client.connect();
        request.price = Decimal128.fromString(request.price);
        output = await client.db('sample_airbnb').collection('listingsAndReviews').insertOne(request);
        return output;
    } catch (error) {
        console.log(error);
    }finally{
        
    }
}

exports.updateProperty = async(filter,request)=>{
    let output;
    try {
        await client.connect();
        request.price = Decimal128.fromString(request.price);
        output = await client.db('sample_airbnb').collection('listingsAndReviews').updateOne(filter,{$set:request})
        return output;
    } catch (error) {
        console.log(error);
    }finally{
        
    }
}

exports.getProperty = async (filter)=>{
    let output;
    try {
        await client.connect();
        output = await client.db('sample_airbnb').collection('listingsAndReviews').findOne(filter);
        return output;
    } catch (error) {
        console.log(error);
    }finally{
        
    }
}

exports.deleteProperty = async(filter)=>{
    let output;
    try {
        await client.connect();
        output = await client.db('sample_airbnb').collection('listingsAndReviews').deleteOne(filter);
        return output;
    } catch (error) {
        console.log(error);
    }finally{
        
    }
}
exports.getUsers = async()=>{
    let output;
    try {
        await client.connect();
        output = await client.db('sample_airbnb').collection('users').find().project({firstname:1,lastname:1,email:1,dob:1,phone:1,country:1}).limit(20).toArray();
        return output;
    } catch (error) {
        console.log(error);
    }finally{
        
    }
}
exports.addUserToDB = async(request)=>{
    let output;
    try {
        await client.connect();
        output = await client.db('sample_airbnb').collection('users').insertOne(request);
        return output;
    } catch (error) {
        console.log(error);
    }finally{
        
    }
}

exports.deleteUser = async (filter)=>{
    let output;
    try {
        await client.connect();
        output = await client.db('sample_airbnb').collection('users').deleteOne(filter);
        return output;
    } catch (error) {
        console.log(error);
    }finally{
        
    }
}

exports.getHostProperties = async(filter)=>{
    let output;
    try {
        await client.connect();
        output = await client.db('sample_airbnb').collection('users').findOne(filter,{projection:{password:0}});
        return output;
    } catch (error) {
        console.log(error);
    }finally{
        
    }
}