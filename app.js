var map = L.map('map').setView([50.7790, 6.06028], 15);
var activities = L.layerGroup();
var data;

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//own point
L.marker([50.7790, 6.06028], {
    icon: headIcon
}).addTo(map);

$.getJSON('activities.json', function(d) {
    data = d.activities;
    dataToMap();
})

var dataToMap = function() {
    for (var i = 0; i < data.length; i++) {
        activities.addLayer(createPoint(data[i]));
    }
    activities.addTo(map);
}



function createPoint(marker) {
    var marker_content = '<h4 class="center" style="margin:0;">' + marker.name + '</h4><br><b>' + marker.location + '</b><br>' + marker.description + "<br><p>";
    marker_content += '<span class="uppercase white-text badge">';
    for (var tag_count = 0; tag_count < marker.tag.length; tag_count++) {
        marker_content += marker.tag[tag_count];
        /*
        marker_content += '<span class="uppercase white-text badge ' + get_color(marker.category) + '">';
        marker_content += marker.tag[tag_count] + "</span>";
    */
    }
    marker_content += "</span>";

    marker_content += '</p><br><br><i class="material-icons tiny" style="vertical-align: middle;">group</i> ' + marker.maxusers;
    for (var usr_count = 0; usr_count < marker.users.length; usr_count++) {
        marker_content += '<span class="users" ' + marker.users[i];
    }
    /*if (marker.typ === "event") {
        var point = L.marker(marker.coordinates, { icon: greenIcon }).bindPopup(marker_content);
    } else {
        var point = L.marker(marker.coordinates, { icon: redIcon }).bindPopup(marker_content);
    }*/

    return point;
}

// $.getJSON('marker.json', function (data) {
//     for (var i = 0; i < data.marker.length; i++) {
//         var marker_content = '<h4 class="center" style="margin:0;">' + data.marker[i].name + '</h4><br><b>' + data.marker[i].opening + ' &bull; ' + data.marker[i].address + '</b><br>' + data.marker[i].description + "<br><p>";
//         for (var tag_count = 0; tag_count < data.marker[i].tags.length; tag_count++) {
//             marker_content += '<span class="uppercase white-text badge ' + get_color(data.marker[i].tags[tag_count]) + '">';
//             marker_content += data.marker[i].tags[tag_count] + "</span>";
//         }
//         marker_content += '</p><hr style="margin-top:40px;visibility:hidden;"><i class="material-icons tiny" style="vertical-align: middle;">phone</i> ' + data.marker[i].phone + '<br><i class="material-icons tiny"  style="vertical-align: middle;">public</i> ' + data.marker[i].url + '<br><i class="material-icons tiny"  style="vertical-align: middle;">mail</i> ' + data.marker[i].email;
//         if (data.marker[i].typ === "event") {
//             var point = L.marker(data.marker[i].coordinates, { icon: greenIcon }).bindPopup(marker_content);
//         } else {
//             var point = L.marker(data.marker[i].coordinates, { icon: redIcon }).bindPopup(marker_content);
//         }

//         all_points.addLayer(point);
//     }

//     all_points.addTo(map);
// });

function get_color(cat) {
    switch (cat) {
        case 'sport':
            return 'seagreen';
        case 'learning':
            return 'maroon';
        case 'programming':
            return 'royalblue';
        case 'freetime activity':
            return 'orange';
        case 'gaming':
            return 'silver';
        case 'eating':
            return 'palevioletred';
        default:
            return 'black';
    }
}
$('#brand').fadeIn(300);
setTimeout(function() {
    $('#loader').fadeOut(500);
}, 1500);






var save = function() {
    console.log("TODO: save");

    var d = {
        id: 0,
        name: "",
        date: "",
        coord: [],
        description: "",
        location: "",
        tags: [],
        category: "",
        maxusers: 0,
        users: [],
        creator: ""
    }

    var name = $('#input_title').val();
    var date = $('#input_date').val();
    var date_tbd = $('#input_date_tbd').val();
    var location = $('#input_location').val();
    var description = $('#input_description').val();
    var category = $('#input_category').val();
    var tags = $('#input_tags').val();
    var spots = $('#input_spots').val();
    var spots_limited = $('#input_spots_limited').val();

    console.log(name);
    console.log(date);
    console.log(date_tbd);
    console.log(location);
    console.log(description);
    console.log(category);
    console.log(tags);
    console.log(spots);
    console.log(spots_limited);

    if (name === "") {
        console.log("No name provided");
        return;
    } else {
        d.name = name;
    }

    if (date === "" && !date_tbd) {
        console.log("No date provided");
        return;
    } else if (date_tbd) {
        d.date = "TBD";
    } else {
        d.date = date;
    }

    if (location === "") {
        console.log("No location provided");
        return;
    } else {
        d.location = location;
    }


    if (description === "") {
        console.log("No description provided");
        return;
    } else {
        d.description = description;
    }

    if (category === "") {
        console.log("No category provided");
        return;
    } else {
        d.category = category;
    }

    if (tags === []) {
        console.log("No tags provided");
        return;
    } else {
        d.tags = tags;
    }

    if (spots === "" && spots_limited) {
        console.log("No spots provided");
        return;
    } else if (!spots_limited) {
        d.maxusers = 9999;
    } else {
        var pattern = /^\d+$/;
        if (!pattern.test(spots)) {
            console.log("No spots provided");
            return;
        } else {
          d.maxusers = spots;
        }
    }

    console.log(d);

}

var abort = function() {
    console.log("TODO: abort");
}
