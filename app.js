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
    marker_content += '<br><br>';
    marker_content += '<center>'+'<button class="button arrow"><hjoin style="color:#ffffff">Join in!</hjoin>'+'</button>'+'</center>';
    marker_content += '</span>';
    //farbe
    if(marker.users.length<marker.maxusers){
      console.log("lala");
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
          var point = L.marker(marker.coordinates, { icon: violetIcon }).bindPopup(marker_content);
          break;
        case 'gaming' :
          var point = L.marker(marker.coordinates, { icon: orangeIcon }).bindPopup(marker_content);
          break;
        default :
          var point = L.marker(marker.coordinates, { icon: blackIcon }).bindPopup(marker_content);
      }
    }else {
      var point = L.marker(marker.coordinates, { icon: redIcon }).bindPopup(marker_content);
    }

    return point;
}

$('#brand').fadeIn(300);
setTimeout(function() {
    $('#loader').fadeOut(500);
}, 2000);
