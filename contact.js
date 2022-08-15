const fields = ["username", "email", "message", "phone", "occupation", "company", "address"];
const errors = {
    Mandatory: "Field is Mandatory. Cannot be Empty.",
    Alphabet: "Username can only contain alphanumeric characters and a space",
    FullName: "Username must have both a first and last name.",
    Email: "Email must a valid email.",
    Phone: "If entered, phone number must be in the correct format. (xxx) xxx-xxxx"
};
/*
const setSuccess()
const setError()

const onFieldChange(field, input)

0: Invalid Field
1: Valid Field
2: Empty Not Required
const isNameValid(name) //ret 0,1,2
const isEmailValid(email) //ret 0,1,2
const isPhoneValid(phone) //ret 0,1,2
//For Message, Occupation, Company, Address
const isValidSimple(str, optional) //ret 0,1,2

const validateFields() //ret bool

*/
const setError = (id, error) => {
    const field = document.querySelector(`#${id}`);
    const inputControl = field.parentElement;
    const errorField = inputControl.querySelector('.error');

    errorField.innerText = error;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = (id) => {
    const field = document.querySelector(`#${id}`);
    const inputControl = field.parentElement;
    const errorField = inputControl.querySelector('.error');

    errorField.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const setNeutral = (id) => {
    const field = document.querySelector(`#${id}`);
    const inputControl = field.parentElement;
    const errorField = inputControl.querySelector('.error');

    errorField.innerText = '';
    inputControl.classList.remove('error');
    inputControl.classList.remove('success');
}

const isNameValid = (id, name) => {
    name = name.trim();
    var re = /^[a-z]+ [ a-z]+$/.test(name.toLowerCase()) // /^[a-z]+ [ a-z]+$/.test(name.toLowerCase())
    if (re) {
        setSuccess(id);
        return 1;
    }
    //Handle Errors
    else {
        //Field is Mandatory. Cannot Be Empty.
        if(name.length == 0)
            setError(id, errors.Mandatory);
        //Username can only contain alphanumeric characters and a space 
        else if(!/^[a-z ]+$/.test(name.toLowerCase())) {  // Try [a-z]
            setError(id, errors.Alphabet);
        }
        //Username must have both a first and last name
        // old: /^[a-z]$/.test(name.toLowerCase()) || /^([a-z]+ ){2,}[a-z]+$/.test(name.toLowerCase()))/ 
        else if(!/^[a-z][ ][a-z]/.test(name.toLowerCase())){
            setError(id, errors.FullName);
        }
        return 0;
    }
};

const isValidEmail = (id, email) => {
    email = email.trim();
    var re = /^[a-z\.0-9]+@[a-z0-9]+\.[a-z]+$/.test(email.toLowerCase());
    
    // If the value of ret is true i.e., there was a match with the test method call setSuccess(id)
    // to change colour and return 1 for success
    if (re) {
        setSuccess(id);
        return 1;
    }
    //Handle Errors
    else {
        if(email.length == 0)
            setError(id, errors.Mandatory)
        else
            setError(id, errors.Email);
        return 0;
    }
};

//For non-required fields, if user enters whitespace, still will allow form submission.
//Message, Occupation, Company, 
const isValidSimple = (id, msg, optional) => {
    msgTrim = msg.trim()
    if(optional && msgTrim.length == 0) {
        setNeutral(id);
        return 2;
    }
    
    ret = msgTrim.trim().length != 0;
    if (ret){
        setSuccess(id);
        return 1;
    } 
    //Handle Errors
    else {
        if(!optional) {
            setError(id, errors.Mandatory);
        }
    }
}

const isPhoneValid = (id, phone) => {
    phone = phone.trim()
    if (phone.length == 0) return 2;

    
    // Ensures the format is: (999) 999-9999
    re = /^\([0-9]{3}\) [0-9]{3}\-[0-9]{4}$/.test(phone);
    
    if (re) {
        setSuccess(id);
        return 1;
    }
    //Handle Errors
    else {
        setError(id, errors.Phone);
        return 0;
    }
}

const validateField = (fieldName) => {
    const field = document.querySelector(`#${fieldName}`);
    let value = field.value;
    const inputControl = field.parentElement;
    const optional = inputControl.classList.contains("optional");

    //0: invalid, 1: valid, 2: empty optional
    let isValid = 0;
    switch(fieldName){
        case "username":
            isValid = isNameValid(fieldName, value);
            break;
        case "email":
            isValid = isValidEmail(fieldName, value);
            break;
        case "message":
            isValid = isValidSimple(fieldName, value, optional);
            break;
        case "phone":
            isValid = isPhoneValid(fieldName, value);
            break;
        case "occupation":
            isValid = isValidSimple(fieldName, value, optional);
            break;
        case "company":
            isValid = isValidSimple(fieldName, value, optional);
            break;
        case "address":
            isValid = isValidSimple(fieldName, value, optional);
            break;
        default:
            break;
    }
    return isValid;
}

const validateFields = () => {
    
    let validRet;
    let isValid = true;
    fields.forEach(field =>{
        validRet = validateField(field);
        if (validRet === 0) isValid = false;
    })

   
    // for(var i = 0; i < fields.length; i++) {
    //     validRet = validateField(fields[i]);
    //     if(validRet == 0) isValid = false;
    // }
    return isValid;
}