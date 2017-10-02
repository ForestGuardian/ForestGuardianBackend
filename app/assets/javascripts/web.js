//= require jquery
//= require leaflet
//= require leaflet-ajax
//= require leaflet-routing-machine
//= require osmtogeojson
//= require maps

$( document ).ready(function() {

    $("#agua").change(function () {
        if (this.checked) {
            showWindsLayer();
        } else {
            hideWindsLayer();
        }
    })

    $("#lluvia").change(function () {
        if (this.checked) {
            showWeatherLayer();
        } else {
            hideWeatherLayer();
        }
    })

    $("#bosque").change(function () {
        if (this.checked) {
            showForestLayer();
        } else {
            hideForestLayer();
        }
    })

}