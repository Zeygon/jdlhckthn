var data;
function join(ide) {
    $.getJSON('activities.json', function(d) {
        console.log("own point");
        data = d.activities;
    })
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === ide) {
            data[i].users.push("luca");

            var j = JSON.stringify(data[i]);
            $.ajax({
              type: "PUT",
              url: "http://localhost:3000/activities/" + data[i].id,
              data: j,
              contentType: 'application/json',
              success: function(data) {
                console.log("wat: " + data);
                 Materialize.toast('Hooray! You joined ' + data.name, 4000)
              }
            });
            console.log("---");
        }
    }
}
