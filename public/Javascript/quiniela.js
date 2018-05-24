$("#monto").keyup(checkInput);

$("#evento").click(checkInput);


$.getJSON("/api/events", function(data){
    let options ="";
    $.each(data, function(key,value){
        $('#evento').append($('<option>', {
            value: value.event_id,
            text: value.event_name
        }));
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