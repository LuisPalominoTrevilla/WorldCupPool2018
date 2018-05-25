var password, confirmPassword;
var firstTime = true;
var userNameInDB, idQuinielaInDB;

$(document).ready(function(){
    askDataToDatabase();
    if($("#username").val()!=""){
        if(isUsernameAvailable()){
            $("#usernameOnDatabase").html('');
            $("#username").css('border-color','#ced4da');
        }
        else{
            $("#usernameOnDatabase").html('<p class="text-muted" style="font-size:14px;">Ese nombre ya está siendo usado</p>');
            $("#username").css('border-color','red');
        }
    }
    if($("#idQuiniela").val()!=""){
        if(isIdQuinielaInDatabase()){
            $("#idQuinielaHelp").html('');
            $("#idQuiniela").css('border-color','#ced4da');       
        }
        else{
            $("#idQuinielaHelp").html('<p class="text-muted" style="font-size:14px;">Ese ID no existe </p>');
            $("#idQuiniela").css('border-color','red');
        }
    }
    buttonValidation();
});

//BUTTON CLICK
$("#button").click(function(event){
    askDataToDatabase();
    if(buttonValidation()){
       
    }
    else{
        event.preventDefault();
    }
});

//BUTTON VALIDATION
function buttonValidation(){
    if(isUsernameAvailable() && isIdQuinielaInDatabase() && checkPassword()){
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
$("#username").on("change keyup",function(){
    if(isUsernameAvailable()){
        $("#usernameOnDatabase").html('');
        $("#username").css('border-color','#ced4da');
        buttonValidation();
    }
    else{
        $("#usernameOnDatabase").html('<p class="text-muted" style="font-size:14px;">Ese nombre ya está siendo usado</p>');
        $("#username").css('border-color','red');
        buttonValidation();
    }
});

//--PASSWORD AND CONFIRM PASSWORD VALIDATIONS--------------/
$("#password").on("change keyup",function(){
    if(!firstTime){
        if(checkPassword()){
            $("#passwordsDontMatch").html('');
            $("#password").css('border-color', '#ced4da');
            $("#confirm-password").css('border-color', '#ced4da');
            buttonValidation();
        }else{
            $("#passwordsDontMatch").html('<p class="text-muted" style="font-size:14px;">Las contraseñas no coinciden</p>');
            $("#password").css('border-color', 'red');
            $("#confirm-password").css('border-color', 'red');
            buttonValidation();
        }
    }
});

$("#confirm-password").on("keyup change",function(){
    firstTime = false;
    if(checkPassword()){
            $("#passwordsDontMatch").html('');
            $("#password").css('border-color', '#ced4da');
            $("#confirm-password").css('border-color', '#ced4da');
        buttonValidation();
        }else{
            $("#passwordsDontMatch").html('<p class="text-muted" style="font-size:14px;">Las contraseñas no coinciden</p>');
            $("#password").css('border-color', 'red');
            $("#confirm-password").css('border-color', 'red');
            buttonValidation();
        }
});
//-------------------------------------------//

//IDQUINIELA VALIDATION
$("#idQuiniela").on("change keyup",function(event){
    console.log(event);
    if(isIdQuinielaInDatabase()){
        $("#idQuinielaHelp").html('');
        $("#idQuiniela").css('border-color','#ced4da');
        buttonValidation();       
    }
    else{
        $("#idQuinielaHelp").html('<p class="text-muted" style="font-size:14px;">Ese ID no existe </p>');
        $("#idQuiniela").css('border-color','red');
        buttonValidation();
    }
    
});

//CHECK PASSWORDS
function checkPassword(){ 
    password = $("#password").val();
    confirmPassword = $("#confirm-password").val();
    if(confirmPassword!=password || (confirmPassword=="" || password=="")){
        return false;
    }else{
        return true;
    }
}

function isIdQuinielaInDatabase(){
    for(let object in idQuinielaInDB){
        if($("#idQuiniela").val() == idQuinielaInDB[object].code && $("#idQuiniela").val() != ""){
            return true;
        }
    }
    return false;
}

function isUsernameAvailable(){
    for(let object in userNameInDB){
        if($("#username").val() === userNameInDB[object].username || $("#username").val() == ""){
            return false;
        }
    }    
    return true;
}

function askDataToDatabase(){
    $.getJSON('api/users', function(data){
        userNameInDB = data;
    });
    $.getJSON('/api/quinielas', function(data){
        idQuinielaInDB = data;
    });
}

