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

    var uid = $('.user_id_hidden').html();
    var url = '/api/partmatches/' + uid;

    $.getJSON(url, function(data){
        data.forEach(function(obj) {
            matchTemplate.add(obj);
        });
    });

    
});