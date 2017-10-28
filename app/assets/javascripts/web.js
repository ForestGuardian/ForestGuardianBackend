//= require jquery
//= require webflow


// legend config
legend_position = {
    'right': '0px',
    'bottom': '50px',
    'left': 'initial',
    'top': 'initial'
};

$( document ).ready(function() {

    $("#wind").change(function () {
        if (this.checked) {
            showWindsLayer();
        } else {
            hideWindsLayer();
        }
    })

    $("#rain").change(function () {
        if (this.checked) {
            showWeatherLayer();
        } else {
            hideWeatherLayer();
        }
    })

    $("#forest").change(function () {
        if (this.checked) {
            showForestLayer();
        } else {
            hideForestLayer();
        }
    })

});

var webInterface = new function() {
    this.showWebInfoMarker = function (lat,lng, brightness) {
        L.popup({offset: L.point(0, -37)})
            .setLatLng(L.latLng(lat, lng))
            .setContent('<b>Incendio</b><br>Intensidad: ' + brightness + " K")
            .openOn(map);
    }
};

