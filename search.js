//Animations with jQuery
var $searchOverlay = $('#search');
var $searchReset = $('#btn-resetSearch');
var $searchTrigger = $('#fab');
var $search = $('#input');
var $fabi = $('#fab--i');
var $input = $('#input');
var $rangeslider = $('#range');
var $btnMore = $('#btn-more');

var search_points = L.layerGroup();
//var allPoints;

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
    getCorrectLayer(activities));
    $searchOverlay.fadeOut(500);
    $fabi.text("search");
    $input.val("");
    b = false;
    map.setView([49.003008, 12.098255], 13);
});

function resetMap() {
    map.removeLayer(activities);
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
      url:'activities.json',
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

    $searchOverlay.fadeOut(500);
    $fabi.text("search");
    b = false;
    search_points.addTo(map);
};
