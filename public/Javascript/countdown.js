//14 de junio de 2018 10:00AM
//formato: 00:00:00

var countdownSec = 0;
var countdownMin = 0;
var countdownHr = 10;
var countdownDay = 14;
var countdownMonth = 6;


var timeformatted;
/*
var countdownSec = 0;
var countdownMin = 39;
var countdownHr = 19;
var countdownDay = 30;
var countdownMonth = 5;
*/

var sec = 0;
var min = 0;
var hr = 0;
var day = 0;
var month = 0;

var secleft = 0;
var minleft = 0;
var hrleft = 0;

$(document).ready(function(){
    $.getJSON('https://api.ipdata.co', function(data) {
        $.getJSON('http://api.timezonedb.com/v2/get-time-zone?key=XXE38FR5X9JK&format=json&by=position&lat=20.7167&lng=-103.4',function(hour){
            console.log(hour);
            timeformatted = hour.formatted;
            month = parseInt(timeformatted[5] + timeformatted[6]); 
            day = parseInt(timeformatted[8] + timeformatted[9]);
            hr = parseInt(timeformatted[11] + timeformatted[12]);
            min = parseInt(timeformatted[14] + timeformatted[15]);
            sec = parseInt(timeformatted[17] + timeformatted[18]);

            setInterval(updateCountdown,1000);
            //console.log(timeformatted);
            //console.log(hrleft);
            //console.log(minleft);
            //console.log(secleft);
        });
    });
});

function updateCountdown(){
    sec++;
    if(sec >= 60){
        sec = (sec % 60) + 1;
        min++;
    }
    if(min >= 60){
        min = (min % 60) + 1;
        hr++;
    }
    
    hrleft = (countdownMonth - month) * 30 * 24;
    hrleft += (countdownDay - day) * 24;
    hrleft += (countdownHr - hr);
    
    minleft = (60 + (countdownMin - min) -1);
    
    secleft = (60 + (countdownSec - sec));
    
    if(minleft < 10){
        minleft = "0" + minleft;
    }
    
    if(secleft < 10){
        secleft = "0" + secleft;
    }
    if(hrleft < 10){
        hrleft = "0" + hrleft;
    }
    
    $('#time').html(hrleft + ":" + minleft + ":" + secleft);
    //console.log(hrleft + ":" + minleft + ":" + secleft);
            
}
