$("#monto").keyup(checkInput);

$("#evento").click(checkInput);

$.getJSON('/api/events', function(data){
    console.log(data);
    $.each(data, function(key,value){
        $('#evento').append($('<option>', {
            value: value.event_id,
            text: value.event_name
        }));
    });
});

$("#button").click(function(event){
    if(!checkInput()){
        event.preventDefault();
    }
});

function checkInput(){
    var monto = $("#monto").val();
    var evento = $("#evento").val();
    if( (!isNaN(monto) && monto!="")  && evento!="Evento"){
        $("#button").removeAttr
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
