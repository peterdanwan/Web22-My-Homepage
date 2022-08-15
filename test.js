const fullName = document.querySelector('#fullName');
const password = document.querySelector('#password');
const form = document.querySelector('#signup');
const errorElement = document.querySelector('#error');

form.addEventListener('submit', (e) => {
    let messages =[];
    errorElement.innerText = '';

    if (fullName.value === ''|| fullName.value ==null){
        messages.push('Name is required');

    }

    if (password.value.length <= 6){
        messages.push('Password must be longer than 6 characters')
    }

    if(messages.length > 0){
        e.preventDefault();
        errorElement.innerText = messages.join(', ');
    }

 
})

function showErrors(messages) {
    document.getElementByID('errors').innerHTML += messages;
}  

function clearErrors() {
    document.getElementByID('errors').innerHTML = "";
}