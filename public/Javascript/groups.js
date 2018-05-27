$(document).ready(function(){
    $('#group-stage').removeClass('active');
    $('#worldcup-groups').addClass('active');

    var groupTemplate = new Vue({
        el: "#groups-tables",
        data: {
            groups: [

            ]
        },
        methods: {
            add: function(group){
                this.groups.push(group);
            }
        }
    })

    $.getJSON('/api/groups', function(data) {
        var prev_group = "A";
        var tmp = [];
        $.when(data.forEach(function(obj){
            
            if(obj.group_name === prev_group){
                tmp.push(obj);
            }else{
                groupTemplate.add(tmp);
                prev_group = obj.group_name;
                tmp = [];
                tmp.push(obj);
            }

        })).then(function(){
            // Add the last group to vue
            groupTemplate.add(tmp);
            tmp = [];
        });
    });

});