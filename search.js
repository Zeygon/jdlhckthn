//Animations with jQuery
var $searchOverlay = $('#search');
var $searchReset = $('#btn-resetSearch');
var $searchTrigger = $('#fab');
var $search = $('#input');
var $fabi = $('#fab--i');
var $input = $('#input');
var $rangeslider = $('#range');
var $btnMore = $('#btn-more');
var currentDay = "23";

var search_points = L.layerGroup();
//var allPoints;

$rangeslider.on("input", function () {
    getCorrectLayer(this.value);
    currentDay = this.value;
});

function getCorrectLayer(value) {
    switch (value) {
        case "23":
            removeAllLayers();
            p23.addTo(map);
            break;
        case "24":
            removeAllLayers();
            p24.addTo(map);
            break;
        case "25":
            removeAllLayers();
            p25.addTo(map);
            break;
        case "26":
            removeAllLayers();
            p26.addTo(map);
            break;
        case "27":
            removeAllLayers();
            p27.addTo(map);
            break;
        case "28":
            removeAllLayers();
            p28.addTo(map);
            break;
        case "29":
            removeAllLayers();
            p29.addTo(map);
            break;
        default:
            break;
    }
}

function removeAllLayers() {
    map.removeLayer(p23);
    map.removeLayer(p24);
    map.removeLayer(p25);
    map.removeLayer(p26);
    map.removeLayer(p27);
    map.removeLayer(p28);
    map.removeLayer(p29);
}

var bMore = false;
$btnMore.click(function(e) {
    if (bMore) {
        $(".more_tags").hide();
        bMore = false;
    } else {
        $(".more_tags").show();
        bMore = true;
    }
});

var b = false;
$searchTrigger.click(function (e) {
    if (b) {
        $searchOverlay.fadeOut(500);
        $fabi.text("search");
        b = false;
    } else {

        $searchOverlay.fadeIn(500);
        setTimeout(function () {
            $search.focus();
        }, 500);
        $fabi.text("arrow_back");

        b = true;
    }
});

$searchReset.click(function (e) {
    getCorrectLayer(currentDay);
    $searchOverlay.fadeOut(500);
    $fabi.text("search");
    $input.val("");
    b = false;
    map.setView([49.003008, 12.098255], 13);
});

function resetMap() {
    removeAllLayers();
}

$input.keypress(function (e) {
    //enter key
    if (e.which == 13) {
        searchPoints($input.val());
    }
});

function searchPoints(searchString) {
    map.removeLayer(search_points);
    search_points = L.layerGroup();
    var searchCount = 0;
    var specificPoints= $.ajax({ 
      url: currentDay + '.json', 
      async: false
   }).responseJSON;
    resetMap();
    for (var i = 0; i < specificPoints.marker.length; i++) {
        for (var tagCount = 0; tagCount < specificPoints.marker[i].tags.length; tagCount++) {
            if (searchString.includes(specificPoints.marker[i].tags[tagCount])) {
                search_points.addLayer(createPoint(specificPoints.marker[i]));
                searchCount++;
                break;
            }
        }
    }

    if (searchString.includes('aachen') || searchString.includes('Aachen')) {
        map.setView([50.776, 6.082], 13);
        if (searchCount == 0) {
            $searchOverlay.fadeOut(500);
            $fabi.text("search");
            b = false;
            return;
        }
    }
    $searchOverlay.fadeOut(500);
    $fabi.text("search");
    b = false;
    search_points.addTo(map);
};
