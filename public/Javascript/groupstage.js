$(document).ready(function(){

    // Get group stage matches and bets for the user
    $.getJSON('/api/matches/1', function(data){
        console.log(data);
    });
});