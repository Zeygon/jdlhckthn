var map = L.map('map').setView([50.7790, 6.06028], 15);
var activities = L.layerGroup();
var data;

var myact = [];
var myname = "luca";

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



L.marker([50.7790, 6.06028], {
    icon: headIcon
}).addTo(map);

$.getJSON('activities.json', function(d) {
    console.log("own point");
    data = d.activities;
    dataToMap();
})

console.log("own point");
var dataToMap = function() {
    console.log("datatomap");
    for (var i = 0; i < data.length; i++) {
        activities.addLayer(createPoint(data[i]));


        // Fill out list of activities i am partecipaiting

        for (var j = 0; j < data[i].users.length; j++) {
            if (data[i].users[j] === myname) {
                console.log("You're in: " + data[i].name);
                myact.push(data[i]);
            }
        }




    }
    var mylist = "";
    for (var i = 0; i < myact.length; i++) {
        mylist += '<li><div class="row"><div class="col s12 center"><h3 style="margin-bottom:0;">';
        mylist += myact[i].name;
        mylist += '</h3><div class="dd-flex"><span class="dd-span"><i class="material-icons">location_on</i>';
        mylist += myact[i].location;
        mylist += '</span><span class="dd-span"><i class="material-icons">watch_later</i>';
        mylist += myact[i].date;
        mylist += '</span><span class="dd-span"> <i class="material-icons">supervisor_account</i>';
        mylist += myact[i].users.length + "/" + myact[i].maxusers;
        mylist += '</span></div><a href="#modal1" class="waves-effect waves-light btn blue">Goto chat</a></div></div></li><li class="divider"></li>';
    }
    $('#dropdown1').html(mylist);
    activities.addTo(map);
}



function createPoint(marker) {
    //name location und description
    var marker_content = '<h5 class="center" style="margin:0;">' + marker.name + '</h5><div style="display:inline-block">'
    marker_content += '<div class="dd-flex" style="padding: 15px 0;"><span class="ddd-span"><i class="material-icons">location_on</i>';
    marker_content += marker.location;
    marker_content += '</span><span class="ddd-span"><i class="material-icons">watch_later</i>';
    marker_content += marker.date;
    marker_content += '</span><span class="ddd-span"> <i class="material-icons">supervisor_account</i>';
    marker_content += marker.users.length + "/" + marker.maxusers;
    marker_content += '</span></div><p>'


    marker_content += marker.description;

    //---------------category
    marker_content += '</p> <div style="display:flex; flex-wrap:wrap;">';
    marker_content += '<span class="new badge uppercase blue" data-badge-caption="" style="margin-top:5px;">' + marker.category +'</span>'
    //-------------tags
    for (var tag_count = 0; tag_count < marker.tags.length; tag_count++) {
        marker_content += '<span class="new badge uppercase red" data-badge-caption="" style="margin-top:5px;">' + marker.tags[tag_count] +'</span>'
    }
    marker_content += '</div><br><br>';
    marker_content += '<center>' + '<button onclick="join(' + marker.id + ')" class="button arrow"><hjoin style="color:#ffffff">Join in!</hjoin>' + '</button>' + '</center>';
    marker_content += '</span></div>';
    //arbe
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
        case 'leisure activity' :
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
