const emptyFieldMessage = "This field couldn't be empty";
const emailNotValid = "Email format is not valid";
const phoneNotValid = "Phone number is not valid";

function perfomValidation(fieldConfig, fieldValue) {

    function emailValidation (email) {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    function phoneValidation (phoneNumber) {
        const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return regex.test(phoneNumber);
    }

    if (fieldConfig.required){
            /********************************************************************** */
        if(fieldConfig.type==='email'){
            if(fieldValue===""){
                return({valid: false, message: emptyFieldMessage})
            } else if (emailValidation(fieldValue)){
                return ({valid: true, message: ""})
            } else {
                return ({valid: false, message: emailNotValid})
            }
            /********************************************************************** */
        } else if (fieldConfig.type==='phone') {
            if(fieldValue===""){
                return ({valid: false, message: emptyFieldMessage})
            } else if (phoneValidation(fieldValue)){
                return ({valid: true, message: ""})
            } else {
                return ({valid: false, message: phoneNotValid})
            }

            /********************************************************************** */
        } else {
            if(fieldValue===""){
                return ({valid: false, message: emptyFieldMessage})
            } else {
                return ({valid: true, message: ""})
            }
        }
    }

    return ({valid: true, message: ""})

}

export default perfomValidation
