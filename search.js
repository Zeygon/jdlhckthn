//Animations with jQuery
var $searchOverlay = $('#search');
var $searchReset = $('#btn-resetSearch');
var $searchTrigger = $('#fab');
var $search = $('#input');
var $fabi = $('#fab--i');
var $input = $('#input');
var $rangeslider = $('#range');
var $btnMore = $('#btn-more');
var activitis= L.layerGroup();
var $create = $('#create');
var $add = $('#add');
var search_points = L.layerGroup();



$('.datepicker').pickadate({
    selectMonths: false, // Creates a dropdown to control month
    selectYears: 2 // Creates a dropdown of 15 years to control year
  });
  $(document).ready(function() {
   $('select').material_select();
   $('.modal').modal();
 });



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
$add.click(function (e) {
    if (b) {
        $create.fadeOut(500);
        $fabi.text("search");
        b = false;
    } else {

        $create.fadeIn(500);
        $fabi.text("arrow_back");

        b = true;
    }
});

$searchReset.click(function (e) {
    getCorrectLayer(activities);
    $searchOverlay.fadeOut(500);
    $fabi.text("search");
    $input.val("");
    b = false;
    map.setView([49.003008, 12.098255], 13);
});

function resetMap() {
    map.removeLayer(activities);
    console.log("activities removed");
    map.removeLayer(activitis);
    console.log("activitis removed");
}

$input.keypress(function (e) {
    //enter key
    if (e.which == 13) {
        resetMap();
        searchPoints($input.val());

    }
});

function searchPoints(searchString) {
    search_points = L.layerGroup();
    var searchCount = 0;
    var specificPoints= $.ajax({
      url:'activities.json',
      async: false
   }).responseJSON;

    for (var i = 0; i < specificPoints.marker.length; i++) {
        for (var tagCount = 0; tagCount < specificPoints.marker[i].tags.length; tagCount++) {
          alert("lala");
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


//-----------------------------------------------------------------------------
//Suche

var tosearch;
var newlayer=L.layerGroup();
$("#search").keyup(function(event) {
    if (event.keyCode == 13) {
        resetMap();
        activitis.clearLayers();
        tosearch=$("#search").val();
        $("#search").val('');
        console.log(tosearch);
        $.getJSON('activities.json', function (d){
          console.log("get json search");
          data = d.activities;
          console.log("get json search2");
        })
        for(var data_count=0;data_count<data.length;data_count++){
          for(var tag_count=0; tag_count < data[data_count].tags.length;tag_count++){
            console.log(data[data_count].tags[tag_count] === tosearch);

            console.log(data[data_count].users.length + "   " + data[data_count].maxusers);
            if(data[data_count].tags[tag_count] === tosearch && data[data_count].users.length < data[data_count].maxusers){
              console.log("if ist true!!!!!!!!!!");
              activitis.addLayer(createPoint(data[data_count]));
              console.log("add to map" + data[data_count].name);

            }
          }
          activitis.addTo(map);
        }

    }
});
