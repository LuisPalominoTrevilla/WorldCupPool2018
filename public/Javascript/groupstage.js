$(document).ready(function(){

    // Get group stage matches and bets for the user
    /* $.getJSON('/api/matches/1', function(data){
        console.log(data);
    }); */

    var groupTemplate = new Vue({
        el: "#matches_bets",
        data: {
            predicted_result: null
        },
        methods: {
            add: function(group){
                //this.groups.push(group);
            }
        }
    })
});