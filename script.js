'use strict';

const submitButton = document.querySelector('#submit');
const fnameTextField = document.querySelector('#fname'); 
const lnameTextField = document.querySelector('#lname'); 
const frollTextField = document.querySelector('#froll'); 
const ageTextField = document.querySelector('#age'); 


submitButton.addEventListener('click', ()=>{
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;'
        },
        body: JSON.stringify({
            //TODO: Send the data in the form of json after collecting it from the input fields.
            'fname': fnameTextField.value,
            'lname': lnameTextField.value,
            'froll': frollTextField.value,
            'age': ageTextField.value
        })
    })
});