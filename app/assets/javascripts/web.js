//= require jquery
//= require leaflet
//= require leaflet-ajax
//= require leaflet-routing-machine
//= require osmtogeojson
//= require maps

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