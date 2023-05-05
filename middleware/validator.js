const { body, validationResult, check } = require('express-validator')
const moment = require('moment');
const userValidationRules = () => {
  return [

    //Firstname validation
    check('firstname').not().isEmpty().withMessage("First name cannot be empty"),
    //Lastname validation
    check('lastname')
    .not().isEmpty().withMessage("Last name cannot be empty"),
    // Email validation
    check('email')
    .not().isEmpty().withMessage("Email cannot be empty")
    .isEmail().withMessage('Invalid Email'),
    // password validation
    check('password')
    .not().isEmpty().withMessage("Password cannot be empty")
    .isLength({ min: 5 }).withMessage('Password must be atleast 5 characters long')
    .isAlphanumeric().withMessage('Password must be alphanumeric'),
    
    //Date of birth validation
    check('dob')
    .not().isEmpty().withMessage("Date of birth cannot be empty")
    .custom((value)=>{
      return isValidDate(value)
    }).withMessage("Invalid Date of birth")
    .custom((value)=>{
        const age = validateDOB(value);
        return age > 18;
    }).withMessage("Age cannot be less than 18 years"),
    
    check('checkType')
    .custom((value,requestbody)=>{
     return requestbody.req.body.type == undefined? false:true;
    }).withMessage("Enter the type of user"),
    
    check('phone')
    .not().isEmpty().withMessage("Phone cannot be Empty")
    .not().isMobilePhone().withMessage("Enter a valid phone number"),
    
    check('country')
    .not().isEmpty().withMessage("Enter the country")
    .not().isNumeric().withMessage("Enter correct Country name")
    
  ]
}

const formValidationRules = ()=>{
  return [
    check('name')
    .not().isEmpty().withMessage("Property name is required")
    .not().isNumeric().withMessage("Enter valid property name"),

    check('address.market')
    .not().isEmpty().withMessage("Nearest area or suburb name is required"),

    check('address.country')
    .not().isEmpty().withMessage("Country name is required"),

    check('accommodates')
    .not().isEmpty().withMessage("Accomodation limit is required")
    .isNumeric().withMessage("Only Numeric value allowed for accomodation"),

    check('images.picture_url')
    .not().isEmpty().withMessage("Image location cannot be empty")
    .isURL().withMessage("Please enter a image URL"),

    check('price')
    .not().isEmpty().withMessage("Price is required")
    .isNumeric().withMessage("Only Numeric value allowed for price"),

  ]
}

const userFormValidation = ()=>{
  return [
     //Firstname validation
     check('firstname').not().isEmpty().withMessage("First name cannot be empty"),
     //Lastname validation
     check('lastname')
     .not().isEmpty().withMessage("Last name cannot be empty"),
     // Email validation
     check('email')
     .not().isEmpty().withMessage("Email cannot be empty")
     .isEmail().withMessage('Invalid Email'),
     // password validation
     check('password')
     .not().isEmpty().withMessage("Password cannot be empty")
     .isLength({ min: 5 }).withMessage('Password must be atleast 5 characters long')
     .isAlphanumeric().withMessage('Password must be alphanumeric'),
     
     //Date of birth validation
     check('dob')
     .not().isEmpty().withMessage("Date of birth cannot be empty")
     .custom((value)=>{
       return isValidDate(value)
     }).withMessage("Invalid Date of birth")
     .custom((value)=>{
         const age = validateDOB(value);
         return age > 18;
     }).withMessage("Age cannot be less than 18 years"),
     
     check('phone')
     .not().isEmpty().withMessage("Phone cannot be Empty")
     .not().isMobilePhone().withMessage("Enter a valid phone number"),
     
     check('country')
     .not().isEmpty().withMessage("Enter the country")
     .not().isNumeric().withMessage("Enter correct Country name"),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors,
  })
}

const validateForm = (req,res,next)=>{
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors,
  })
}

const validateUserDetails = (req,res,next)=>{
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors,
  })
}
const validateDOB = (dob)=>{
  let date1 = new Date(new Date().toLocaleString())
  let date2 = new Date(dob);
  return Math.round((date1 - date2)/(1000*60*60*24*365));
}

const isValidDate = (dob)=>{
  let date = new Date(dob)
  if (isNaN(date.getTime())){
    return false
  }else{
    return true
  }
}

const isValidLogin = (req,res,next)=>{

  let errorCount = 0;
  if (req.body.password!=="" && (req.body.email =="" && req.body.phoneNumber=="")){
    errorCount+=1;
  }else if (req.body.email== "" && req.body.phoneNumber == "" && req.body.password == ""){
    errorCount+=1; 
  }else if (req.body.password == ""){
    errorCount+=1;
  }
  

  if (errorCount > 0){
      return res.status(400).json({
        errors:{status:400,
        message: "Please enter all the inputs"}
    });
  }else{
    return next();
  }
}
module.exports = {
  userValidationRules,
  validate,
  formValidationRules,
  validateForm,
  userFormValidation,
  validateUserDetails,
  isValidLogin
}