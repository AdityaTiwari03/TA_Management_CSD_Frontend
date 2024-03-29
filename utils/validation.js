//==Mandatory Field Validation
let isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true;
}
//**********************************************************************//


//==Email Validation
let isValidEmail = function (email) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
}
//**********************************************************************//

//==Mobile Number Validation
let isValidContact = function (number) {
    let mobileRegex = /^\d{10}$/;
    return mobileRegex.test(number);
}
//**********************************************************************//

//==Name Validation
let isValidName=function(name){
let nameRegex=/^[A-Za-z\s]{1,}[A-Za-z\s]{0,}$/;
return nameRegex.test(name);
}
//**********************************************************************//

//==Password Validation
let isValidPassword=function(password){
    let regexPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
    return regexPassword.test(password);
}
//**********************************************************************//

//==Date Validation
let isValidDate = function(value) {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    return regEx.test(value);
  }
//**********************************************************************//

//==Mobile Number Validation
let isValidIdNumber = function (number) {
  let mobileRegex = /^\d{8}$/;
  return mobileRegex.test(number);
}
//**********************************************************************//

export { isValidDate, isValid, isValidEmail, isValidContact, isValidName, isValidPassword, isValidIdNumber }

//**********************************************************************//