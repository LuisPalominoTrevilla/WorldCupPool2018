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
            }
        }
    })

    $.getJSON('/api/matches/2', function(data){
        data.forEach(function(obj) {
            round16matches.add(obj);
        });
    });

    $.getJSON('/api/matches/3', function(data){
        data.forEach(function(obj) {
            quartermatches.add(obj);
        });
    });

    $.getJSON('/api/matches/4', function(data){
        data.forEach(function(obj) {
            semimatches.add(obj);
        });
    });

    $.getJSON('/api/matches/5', function(data){
        data.forEach(function(obj) {
            finalmatch.add(obj);
        });
    });
});