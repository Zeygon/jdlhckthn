var map = L.map('map').setView([50.7790,6.06028], 15);
var activities = L.layerGroup();
var data;

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//own point
L.marker([50.7790,6.06028],{ icon: headIcon }).addTo(map);

$.getJSON('activities.json', function (d){
  data = d.activities;
  dataToMap();
})

var dataToMap = function(){
  for (var i = 0;i<data.length;i++){
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
    */}
    marker_content += "</span>";

    marker_content += '</p><br><br><i class="material-icons tiny" style="vertical-align: middle;">group</i> ' + marker.maxusers;
    for(var usr_count = 0; usr_count <marker.users.length; usr_count++){
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
setTimeout(function(){
  $('#loader').fadeOut(500);
},1500);
