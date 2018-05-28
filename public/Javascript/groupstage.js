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
            }
        }
    })

    $.getJSON('/api/matches/1', function(data){
        data.forEach(function(obj) {
            matchTemplate.add(obj);
        });
    });
});