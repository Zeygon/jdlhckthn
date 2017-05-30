var save = function() {
    console.log("TODO: save");

    var d = {
        id: Math.floor((Math.random() * 100000) + 1),
        name: "",
        date: "",
        coord: [],
        description: "",
        location: "",
        tags: [],
        category: "",
        maxusers: 0,
        users: ["admin"],
        creator: "admin"
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

    if (latlng === []) {
        console.log("No tags provided");
        return;
    } else {
        d.coordinates = latlng;
    }

    console.log(d);

    var j = JSON.stringify(d);
    console.log(j);

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/activities",
        data: j,
        contentType: 'application/json',
        success: function(data) {
            console.log("wat: " + data);
        }
    });


    name = '';
    date = '';
    date_tbd = '';
    location = '';
    description = '';
    category = '';
    tags = '';
    spots = '';
    spots_limited = '';

    $('#input_title').val("");
    $('#input_date').val("");
    $('#input_date_tbd').val(on);
    $('#input_location').val("");
    $('#input_description').val("");
    $('#input_category').val("");
    $('#input_tags').val([]);
    $('#input_spots').val(0);
    $('#input_spots_limited').val(on);

}

map.on('click', function(e) {
    console.log("Lat: " + e.latlng.lat + ", Lon: " + e.latlng.lng);
    if (wait_for_latlng === true) {
        latlng = [e.latlng.lat, e.latlng.lng];
        $('#create').fadeIn(300);
        wait_for_latlng = false;
    }

});

var latlng = [];
var wait_for_latlng = false;

var getCoordinates = function() {
    $('#create').fadeOut(300);
    Materialize.toast('Pick a location by tapping on it', 2000)
    wait_for_latlng = true;
}

var abort = function() {
    console.log("TODO: abort");
}
