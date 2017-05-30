var map = L.map('map').setView([50.7790, 6.06028], 15);
var activities = L.layerGroup();
var data;

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



L.marker([50.7790,6.06028],{ icon: headIcon }).addTo(map);

$.getJSON('activities.json', function (d){
  console.log("own point");
  data = d.activities;
  dataToMap();
})
  console.log("own point");
var dataToMap = function(){
    console.log("datatomap");
  for (var i = 0;i<data.length;i++){
    activities.addLayer(createPoint(data[i]));
  }
  activities.addTo(map);
}



function createPoint(marker) {
    //name location und description
    var marker_content = '<h4 class="center" style="margin:0;">' + marker.name + '</h4><br><b>' + marker.location + '</b><br>' + marker.description + "<br><p>";

    //---------------category
    marker_content += '<span class="uppercase badge category">' + marker.category;
    //-------------tags
    marker_content += '<span class="uppercase badge tag">';
    for (var tag_count = 0; tag_count < marker.tags.length; tag_count++) {
      marker_content += marker.tags[tag_count] + ", ";
    }
    marker_content += "</span>";
    //user/maxuser
    marker_content += '</p><br><br><i class="material-icons tiny" style="vertical-align: middle;">group</i> ';
    marker_content += marker.users.length + "/" + marker.maxusers;
    for(var usr_count = 0; usr_count <marker.users.length; usr_count++){
      marker_content += '<span class="user" >' + " " + marker.users[usr_count] + ", " ;
    }
    marker_content += '</span>'
    //farbe
    switch (marker.category){
      case 'sport' :
        var point = L.marker(marker.coordinates, { icon: greyIcon }).bindPopup(marker_content);
        break;
      case 'learning' :
        var point = L.marker(marker.coordinates, { icon: greenIcon }).bindPopup(marker_content);
        break;
      case 'programming' :
        var point = L.marker(marker.coordinates, { icon: yellowIcon }).bindPopup(marker_content);
        break;
      case 'freetime activity' :
        var point = L.marker(marker.coordinates, { icon: redIcon }).bindPopup(marker_content);
        break;
      case 'gaming' :
        var point = L.marker(marker.coordinates, { icon: orangeIcon }).bindPopup(marker_content);
        break;
      default :
        var point = L.marker(marker.coordinates, { icon: blackIcon }).bindPopup(marker_content);
    }

    return point;
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
setTimeout(function(){
  $('#loader').fadeOut(500);
},2000);
