var data;
function join(id) {
    $.getJSON('activities.json', function(d) {
        console.log("own point");
        data = d.activities;
    })
    for (var i = 0; i < data.length; i++) {
        if (data[i].id = id) {
            data[i].users.push("luca");
            var j = JSON.stringify(data);
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/activities",
                data: j,
                contentType: 'application/json',
                success: function(data) {
                    console.log("wat: " + data);
                }
            });
        }
    }
}
