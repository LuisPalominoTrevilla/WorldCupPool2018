var password, confirmPassword;
var firstTime = true;
var usernameValidation = false,
    passwordValidation = false,
    idQuinielaValidation = false;

//BUTTON CLICK
$("#button").click(function(event){
    if(!buttonValidation()){
        event.preventDefault();
    }
});

//BUTTON VALIDATION
function buttonValidation(){
    if(usernameValidation==true && passwordValidation==true && idQuinielaValidation==true){
        $("#button").removeClass("disabled");
        $("#button").addClass("enabled");
        return true;
    }
    else{
        $("#button").addClass("disabled");
        $("#button").removeClass("enabled");
        return false;
    }
}

//USERNAME VALIDATION
$("#username").focusout(function(){
    $.getJSON('/api/users', function(data){
        for(let object in data){
            if($("#username").val() === data[object].username){
               $("#usernameOnDatabase").html('<p class="text-muted" style="font-size:14px;">Ese nombre ya está siendo usado</p>');
                $("#username").css('border-color','red');
                usernameValidation=false;
                buttonValidation();
                return;
            }
        }
        $("#usernameOnDatabase").html('');
        $("#username").css('border-color','#ced4da');
        usernameValidation=true;
        buttonValidation();
    });
});

//--PASSWORD AND CONFIRM PASSWORD VALIDATIONS--------------/
$("#password").focusout(function(){
    if(!firstTime){
    checkPassword();    
    }
});

$("#confirm-password").focusout(function(){
    firstTime = false;
    checkPassword();
});
//-------------------------------------------//

//IDQUINIELA VALIDATION
$("#idQuiniela").focusout(function(){
    $.getJSON('/api/quinielas', function(data){
        for(let object in data){
            if($("#idQuiniela").val() == data[object].code){
                $("#idQuinielaHelp").html('');
                $("#idQuiniela").css('border-color','#ced4da');
                idQuinielaValidation=true;
                buttonValidation();
                return;
            }
        }
        $("#idQuinielaHelp").html('<p class="text-muted" style="font-size:14px;">Ese ID no existe </p>');
        $("#idQuiniela").css('border-color','red');
        idQuinielaValidation=false;
        buttonValidation();
    });
});

//CHECK PASSWORDS
function checkPassword(){ 
    password = $("#password").val();
    confirmPassword = $("#confirm-password").val();
    if(confirmPassword!=password){
        $("#passwordsDontMatch").html('<p class="text-muted" style="font-size:14px;">Las contraseñas no coinciden</p>');
        $("#password").css('border-color', 'red');
        $("#confirm-password").css('border-color', 'red');
        passwordValidation=false;
        buttonValidation();
    }else{
        $("#passwordsDontMatch").html('');
        $("#password").css('border-color', '#ced4da');
        $("#confirm-password").css('border-color', '#ced4da');
        passwordValidation=true;
        buttonValidation();
    }
}

