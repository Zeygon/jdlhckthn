var map = L.map('map').setView([49.003008, 12.098255], 13);
var all_points = L.layerGroup();
var p23 = L.layerGroup();
var p24 = L.layerGroup();
var p25 = L.layerGroup();
var p26 = L.layerGroup();
var p27 = L.layerGroup();
var p28 = L.layerGroup();
var p29 = L.layerGroup();

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//own point
L.marker([49.00316, 12.09751],{ icon: headIcon }).addTo(map);

$.getJSON('23.json', function (data) {
    for (var i = 0; i < data.marker.length; i++) {
        p23.addLayer(createPoint(data.marker[i]));
    }
    p23.addTo(map);
});

$.getJSON('24.json', function (data) {
    for (var i = 0; i < data.marker.length; i++) {
        p24.addLayer(createPoint(data.marker[i]));
    }
});

$.getJSON('25.json', function (data) {
    for (var i = 0; i < data.marker.length; i++) {
        p25.addLayer(createPoint(data.marker[i]));
    }
});

$.getJSON('26.json', function (data) {
    for (var i = 0; i < data.marker.length; i++) {
        p26.addLayer(createPoint(data.marker[i]));
    }
});

$.getJSON('27.json', function (data) {
    for (var i = 0; i < data.marker.length; i++) {
        p27.addLayer(createPoint(data.marker[i]));
    }
});

$.getJSON('28.json', function (data) {
    for (var i = 0; i < data.marker.length; i++) {
        p28.addLayer(createPoint(data.marker[i]));
    }
});

$.getJSON('29.json', function (data) {
    for (var i = 0; i < data.marker.length; i++) {
        p29.addLayer(createPoint(data.marker[i]));
    }
});

function createPoint(marker) {
    var marker_content = '<h4 class="center" style="margin:0;">' + marker.name + '</h4><br><b>' + marker.opening + ' &bull; ' + marker.address + '</b><br>' + marker.description + "<br><p>";
    for (var tag_count = 0; tag_count < marker.tags.length; tag_count++) {
        marker_content += '<span class="uppercase white-text badge ' + get_color(marker.tags[tag_count]) + '">';
        marker_content += marker.tags[tag_count] + "</span>";
    }
    marker_content += '</p><br><br><i class="material-icons tiny" style="vertical-align: middle;">phone</i> ' + marker.phone + '<br><i class="material-icons tiny"  style="vertical-align: middle;">public</i> ' + marker.url + '<br><i class="material-icons tiny"  style="vertical-align: middle;">mail</i> ' + marker.email;
    if (marker.typ === "event") {
        var point = L.marker(marker.coordinates, { icon: greenIcon }).bindPopup(marker_content);
    } else {
        var point = L.marker(marker.coordinates, { icon: redIcon }).bindPopup(marker_content);
    }

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

function get_color(tag) {
    switch (tag) {
        case '#escalation':
            return 'blue';
        case '#party':
            return 'red';
        case '#music':
            return 'yellow';
        case '#action':
            return 'green';
        case '#sport':
            return 'grey';
        case '#adventure':
            return 'black';
        case '#nature':
            return 'pink';
        case '#kids':
            return 'orange';
        case '#education':
            return 'purple';
        case '#social':
            return 'indigo';
        case '#talk':
            return 'teal';
        default:
            return 'black';
    }
}

var rangeSlider = function () {
    var slider = $('#range--div'),
        range = $('#range'),
        value = $('#range--value');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            if (value === "23") {
                $(this).html("TODAY");

            } else {

                $(this).html(value + ". April");
            }
        });

        range.on('input', function () {
            if (this.value === "23") {
                $(this).next(value).html("TODAY");
            } else {

                $(this).next(value).html(this.value + ". April");
            }

        });
    });
};

rangeSlider();

$('#brand').fadeIn(300);
setTimeout(function(){
  $('#loader').fadeOut(500);
},1500);
