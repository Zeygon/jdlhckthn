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

    console.log(d);

    var j = JSON.stringify(d);
    console.log(j);

}

var abort = function() {
    console.log("TODO: abort");
}
