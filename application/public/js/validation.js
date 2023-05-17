function validateUsername(){ //Validates Username
    let username = document.getElementById('username').value;

    if(username.length >=3 && // Longer than 3 Characters
        (username.charAt(0).toUpperCase() != username.charAt(0).toLowerCase())){ // First character is a letter
        return "valid";
    }else if(username.length != 0){
        return "invalid";

    }else{
        return "empty";
    }
}

function validatePassword(){ //Validates Password
    let password = document.getElementById('password').value;

    if(password.length >=8 && // Longer than 8 Characters
        /[A-Z]/.test(password) && // Has a capital Letter
        /[!@#$%&+/~\*\^\[\]\-]/.test(password)){ //Has Special Character
        return "valid";
    }else if(password.length != 0){
        return "invalid";

    }else{
        return "empty";
    }
}

function confirmPassword(){ //Validates Confirm Password
    let confirmPass = document.getElementById('confirmPassword').value;
    let password = document.getElementById('password').value;

    if(confirmPass.length == 0){
        return "empty";
    }else if(password == confirmPass && validatePassword() == "valid"){
        return "valid";
    }else{
        return "invalid";
    }
}

// Change color of Username Box
document.getElementById('username').addEventListener('input', function(ev){
    let userInput = ev.currentTarget;
    
    if(validateUsername() == "valid"){
        userInput.setAttribute("class", `${userInput.getAttribute('class')}
        valid-text`) ;
        userInput.classList.remove("invalid-text");
    }else if(validateUsername() == "invalid"){
        userInput.setAttribute("class", `${userInput.getAttribute('class')}
        invalid-text`) ;
        userInput.classList.remove("valid-text");
    }else{
        userInput.setAttribute("class", `${userInput.getAttribute('class')}`)
        userInput.classList.remove("valid-text");
        userInput.classList.remove("invalid-text");
    }
});

// Change color of Password Box (and situationally confirm password)
document.getElementById('password').addEventListener('input', function(ev){
    let userInput = ev.currentTarget;
    let confirmPass = document.getElementById('confirmPassword');

    if(validatePassword() == "valid"){
        userInput.setAttribute("class", `${userInput.getAttribute('class')}
        valid-text`) ;
        userInput.classList.remove("invalid-text");
    }else if(validatePassword() == "invalid"){
        userInput.setAttribute("class", `${userInput.getAttribute('class')}
        invalid-text`) ;
        userInput.classList.remove("valid-text");
        confirmPass.setAttribute("class", `${userInput.getAttribute('class')}
        invalid-text`) ;
        confirmPass.classList.remove("valid-text");
    }else{
        userInput.setAttribute("class", `${userInput.getAttribute('class')}`)
        userInput.classList.remove("valid-text");
        userInput.classList.remove("invalid-text");
        confirmPass.setAttribute("class", `${userInput.getAttribute('class')}
        invalid-text`) ;
        confirmPass.classList.remove("valid-text");
    }
});

// Change Color of Confirm Password Box
document.getElementById('confirmPassword').addEventListener('input', function(ev){
    let userInput = ev.currentTarget;
    
    if(confirmPassword() == "valid"){
        userInput.setAttribute("class", `${userInput.getAttribute('class')}
        valid-text`) ;
        userInput.classList.remove("invalid-text");
    }else if(confirmPassword() == "invalid"){
        userInput.setAttribute("class", `${userInput.getAttribute('class')}
        invalid-text`) ;
        userInput.classList.remove("valid-text");
    }else{
        userInput.setAttribute("class", `${userInput.getAttribute('class')}`)
        userInput.classList.remove("valid-text");
        userInput.classList.remove("invalid-text");
    }
});

// Submit Form
document.getElementById('reg-form').addEventListener('submit', function (ev){
    ev.preventDefault();
    //Determine if form is good or bad on time of submit
    if(validateUsername() == "valid" &&
        validatePassword() == "valid" &&
        confirmPassword() == "valid"){
        ev.currentTarget.submit;
    }
});