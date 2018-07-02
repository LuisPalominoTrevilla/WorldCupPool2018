$(document).ready(function(){

    // Get group stage matches and bets for the user
    

    var matchTemplate = new Vue({
        el: "#matches_bets",
        data: {
            matches: [

            ]
        },
        methods: {
            add: function(match){
                this.matches.push(match);
            },
            selectBet: function(bet, match, active){
                placeBet(bet, match, active);
            }
        }
    })

    $.getJSON('/api/matches/1', function(data){
        $.when(data.forEach(function(obj) {
            matchTemplate.add(obj);
        })).then(() => {location.href='#'+$('#anchor-match').html()});
    });
});

// Place or replace bet
function placeBet(bet, match, active){
    // Only if match is accessible
    if(active){
        $.post("/api/placebet", {match: match, bet: bet}, function(response) {
            if(response){
                window.location.href = "/quiniela?match="+match;
            }
        });
    }    
}