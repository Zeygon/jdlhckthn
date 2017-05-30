var data;
function join(ide) {
    $.getJSON('activities.json', function(d) {
        console.log("own point");
        data = d.activities;
    })
    for (var i = 0; i < data.length; i++) {
        if (data[i].id = ide) {
            data[i].users.push("luca");
            for(var k=0;k<data[i].users.length;k++){
              console.log(data[i].users[k]);
            }
            console.log("---");
            var j = JSON.stringify(data[i]);
            $.ajax({
                type: "INSERT",
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
