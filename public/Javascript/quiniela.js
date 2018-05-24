$("#monto").keyup(checkInput);

$("#evento").click(checkInput);


$.getJSON("/api/events", function(data){
    let options ="";
    $.each(data, function(key,value){
        options += "<option>" +value.event_name+ "</option>";
        $("#evento").append(options);
    });
});

function checkInput(){
    var monto = $("#monto").val();
    var evento = $("#evento").val();
    console.log(evento);
    if( !isNaN(monto) && evento!="Evento"){
        $("#button").removeClass("disabled");
        $("#button").addClass("enabled");
    }
    else{
        $("#button").addClass("disabled");
        $("#button").removeClass("enabled");
    }
}