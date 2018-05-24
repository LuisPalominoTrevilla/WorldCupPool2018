$("#monto").keyup(function(){
    var monto = $("#monto").val();
    if(monto!=""){
        $("#button").removeClass("disabled");
        $("#button").addClass("enabled");
    }
    else{
        $("#button").addClass("disabled");
        $("#button").removeClass("enabled");
    }
    console.log(monto);
});

$.getJSON("/api/events", function(data){
    console.log(data);
});