$(document).ready(function(){
    $('#group-stage').removeClass('active');
    $('#knockout-stage').addClass('active');


    // Get knockout stage matches and bets for the user
    

    var round16matches = new Vue({
        el: "#round16",
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

    var quartermatches = new Vue({
        el: "#quarter",
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

    var semimatches = new Vue({
        el: "#semi",
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

    var finalmatch = new Vue({
        el: "#final",
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

    $.getJSON('/api/matches/2', function(data){
        $.when(data.forEach(function(obj) {
            round16matches.add(obj);
        })).then(() => {location.href='#'+$('#anchor-match').html()});
    });

    $.getJSON('/api/matches/3', function(data){
        $.when(data.forEach(function(obj) {
            quartermatches.add(obj);
        })).then(() => {location.href='#'+$('#anchor-match').html()});
    });

    $.getJSON('/api/matches/4', function(data){
        $.when(data.forEach(function(obj) {
            semimatches.add(obj);
        })).then(() => {location.href='#'+$('#anchor-match').html()});
    });

    $.getJSON('/api/matches/5', function(data){
        $.when(data.forEach(function(obj) {
            finalmatch.add(obj);
        })).then(() => {location.href='#'+$('#anchor-match').html()});
    });
});

// Place or replace bet
function placeBet(bet, match, active){
    // Only if match is accessible
    if(active){
        $.post("/api/placebet", {match: match, bet: bet}, function(response) {
            if(response){
                window.location.href = "/quiniela/knockout?match="+match;
            }
        });
    }    
}