/**
 * Created by Luis Alonso Murillo Rojas on 11/12/16.
 */

/* Global definitions */
var map;
var route;
var fireStationMarker;
var currentFireCoordinates;
var gpsMarker;
var reportMarker;
var MODISLayer;
var fireIcon;
var fireStationIcon;
var markerIcon;
var markerArea;
var reportMarkerLocation = { 'latitude':0.0, 'longitude':0.0 }
var fg_layers = [];

var windytyInit = {
    // Required: API key
    key: 'pBEnvSWfnXaWpNC',

    // Optional: Initial state of the map
    lat: 10.07568504578726,
    lon: -84.31182861328125,
    zoom: 8,
}

/* Interface function with the client app */

//@function displayWildfiresDetails
//Funtion that parse the MODIS data an send it to the corresponding mobile clients
//@param {double} lat (latitude) of the fire point
//@param {double} lng (longitude) of the fire point
//@param {double} birghtness value of the fire point
//@param {double} scan value
//@param {double} track value
//@param {String} adquisitionTime from the satellite
//@param {String} satellite identification
//@param {integer} confidence value
//@param {String} version of the data
//@param {double} bright_t31 value
//@param {double} frp value
//@param {String} daynight value
function displayWildfiresDetails(lat, lng, brightness, scan, track, adquisitionTime, satellite, confidence, version, bright_t31, frp, daynight) {
    var jsonMODIS = {"LATITUDE":lat,
        "LONGITUDE":lng,
        "BRIGHTNESS":brightness,
        "SCAN":scan,
        "TRACK":track,
        "ADQUISITION_TIME":adquisitionTime,
        "SATELLITE":satellite,
        "CONFIDENCE":confidence,
        "VERSION":version,
        "BRIGHT_T31":bright_t31,
        "FRP":frp,
        "DAYNIGHT":daynight};
    try {
        mobile.getMODISData(JSON.stringify(jsonMODIS));
    } catch(err) {
        console.log("Error trying to invoke mobile method");
    }
}

//@function setUserCurrentLocation
//Funtor that centers the map to the current a given point provided by the clients
//@param {double} latitued
//@param {double} longitude
function setUserCurrentLocation(latitude, longitude) {

    // Center map on Location
    map.setView(L.latLng(latitude, longitude), 8);

    // Initialize marker if null
    if ( gpsMarker == null ){
        gpsMarker = L.marker([latitude, longitude], {icon: markerIcon});
        gpsMarker.addTo(map);
    }

    try {
        mobile.notifyCurrentLocation();
    } catch (err) {
        console.log("Error trying to invoke mobile method");
    }
}

//@function mobileShowDetails
//Function that notify the client when is the time to show the detail information of a given fire point
function mobileShowDetails() {
    try {
        mobile.showWildfireDetails();
    } catch(err) {
        console.log("Error trying to invoke mobile method");
    }
}

//@function setRouteFromTwoPoints
//Function that sets the route from a point A to a point B
//@param {double} latitudeA of the point A
//@param {double} longitudeA of the point A
//@param {double} latitudeB of the point B
//@param {double} longitudeB of the point B
function setRouteFromTwoPoints(latitudeA, longitudeA, latitudeB, longitudeB) {
    route.setWaypoints([
        L.latLng(latitudeA, longitudeA),
        L.latLng(latitudeB, longitudeB)
    ]);
}

//@function removeRoute
//Function that removes the route from the map
function removeRoute() {
    route.setWaypoints([]);
}

function addReportLocation( latitude, longitude ){

    // Center map on Location
    map.setView(L.latLng(latitude, longitude), 8);

    // Initialize marker if null
    if ( reportMarker == null ){
        reportMarker = L.marker([latitude, longitude], {icon: markerArea, draggable:'true'});
        reportMarkerLocation.latitude = latitude;
        reportMarkerLocation.longitude = longitude;
        reportMarker.addTo(map);
        console.log("latitude: " + reportMarkerLocation.latitude);
        console.log("longitude: " + reportMarkerLocation.longitude);
        reportMarker.on("dragend",function(ev){
            var position = ev.target.getLatLng();
            reportMarkerLocation.latitude = position.lat;
            reportMarkerLocation.longitude = position.lng;
            console.log("latitude: " + reportMarkerLocation.latitude);
            console.log("longitude: " + reportMarkerLocation.longitude);
        });
    }
}

function clearReportLocation(){
    map.removeLayer(reportMarker);
    //FIXME This can be improved by setting a state variable.
    reportMarker = null;
}

function prepareReportLocation(){
    console.log("prepareReportLocation");
    console.log(reportMarkerLocation.latitude);
    console.log(reportMarkerLocation.longitude);
    mobile.reportLocation(reportMarkerLocation.latitude, reportMarkerLocation.longitude);
}

function addFireStationMark(latitude, longitude) {
    fireStationMarker = L.marker([latitude, longitude], {icon: fireStationIcon});
    fireStationMarker.addTo(map);
}

function removeFireStationMark() {
    if (fireStationMarker == null){
        return;
    }

    fireStationMarker.removeFrom(map);
}

/* Pop up functions */

//@function addWildfireMessage
//Function that creates a popup message with some info related to the pressed fire point
//@param {double} latitude
//@param {double} longitude
//@param {double} brightness value of the wildfire
//@param {double} temperature value of the place where the fire is located
//@param {double} humidity value of the place where the fire is located
function addWildfireMessage(latitude, longitude, brightness, temperature, humidity) {
    var popup = L.popup({offset: L.point(0, -37)})
        .setLatLng(L.latLng(latitude, longitude))
        .setContent('<b>Incendio</b>' +
            '<br>Intensidad: ' + brightness + " K" +
            '<br>Temperatura: ' + temperature + " &#8451;" +
            '<br>Humedad: ' + humidity + "%" +
            '<br><a href="javascript:mobileShowDetails();">Detalles</a>')
        .openOn(map);
}

function removeWildfireMessage() {
    map.closePopup();
}

//Callback that will the called each time a fire marker is creator on the map.
//@param {Object} feature
//@param {Layer} layer where the marker are been displayed
function onEachFeature(feature, layer) {
    layer.setIcon(fireIcon);
    /* onClick event */
    layer.on('click', function (e) {
        displayWildfiresDetails(e.latlng.lat,
            e.latlng.lng,
            e.target.feature.properties.brightness,
            e.target.feature.properties.scan,
            e.target.feature.properties.track,
            e.target.feature.properties.acquisition_time,
            e.target.feature.properties.satellite,
            e.target.feature.properties.confidence,
            e.target.feature.properties.version,
            e.target.feature.properties.bright_t31,
            e.target.feature.properties.frp,
            e.target.feature.properties.daynight);
    });
}
//@function downloadMODISData
//Function that downloads the MODIS data from the backend
function downloadMODISData() {
    console.log('downloading modis data...');

    var bounds = map.getBounds();

    var data = new FormData();
    data.append("north", bounds.getNorth());
    data.append("south", bounds.getSouth());
    data.append("east", bounds.getEast());
    data.append("west", bounds.getWest());

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            try {
                var geoJSONData = JSON.parse(this.responseText);

                MODISLayer.clearLayers();
                MODISLayer.addData(geoJSONData);

                console.log(this.responseText);
            } catch (err) {
                console.log("Error downloading the MODIS data: " + err);
            }
        }
    });

    xhr.open("POST", "/modis_data/fires.json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
}

/* Map events functions */

//@function checkZoomLevel
//Function that check the the zoom level of the map in order to decide if display or not the datailed MODIS data
function checkZoomLevel() {
    var zoomLevel = map.getZoom();
    console.log("Zoom level: " + zoomLevel);
    if (zoomLevel > 7) {
        console.log("Download the MODIS data");
        downloadMODISData();
    } else {
        console.log("MODISLayer clear layer");
        MODISLayer.clearLayers();
    }
}

function windytyMain(map) {
    map.options.maxZoom = 11;

    var fireIcon = L.icon({
        iconUrl: 'fire.png',
        iconSize:     [32, 37],
        iconAnchor:   [16, 36]
    });

    downloadMODISData();
}

$(function() {
    //Map where the data will be displayed
    map = L.map('map').setView([10.07568504578726, -84.31182861328125], 8);
    //Some setting to the general map
    L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
 	    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
 	    maxZoom: 18
    }).addTo(map);


    /* Routing */
    route = L.Routing.control({
        waypoints: [],
        routeWhileDragging: false,
        createMarker: function() { return null; },
        router: L.Routing.graphHopper('c06e05f1-cd2f-4c9d-921c-06d634c9c8e9')
    });
    route.addTo(map);

    /* Fire station mark */
    fireStationIcon = L.icon({
        iconUrl: '/assets/firemen.png',
        iconSize:     [32, 37],
        iconAnchor:   [16, 36],
        popupAnchor:  [0, -37]
    });

    markerIcon = L.icon({
        iconUrl: '/assets/marker-gps.png',
        iconSize:     [16, 16],
        iconAnchor:   [8, 8],
        popupAnchor:  [0, -37]
    });

    markerArea = L.icon({
        iconUrl: '/assets/marker-area.png',
        iconSize:     [180, 180],
        iconAnchor:   [90, 90],
        popupAnchor:  [0, 0]
    });


    /* Wildfire icon */

    fireIcon = L.icon({
        iconUrl: '/assets/fire.png',
        iconSize:     [60, 60],
        iconAnchor:   [30, 60],
        popupAnchor:  [0, -60]
    });

    //Capturing the moveend event from the map
    map.on('moveend', function() {
        checkZoomLevel();
    });

    /* MODIS data layers */

    //Data from the backend
    MODISLayer = new L.GeoJSON.AJAX().addTo(map);

    //NASA's WMS service
    var wmsLayer = L.tileLayer.wms('https://firms.modaps.eosdis.nasa.gov/wms/c6?', {
        layers:'fires24',
        transparent: true,
        format: 'image/png'
    }).addTo(map);


    if ( $('#map').hasClass("weather_perspective") ){
        /* Central America weather perspectives */
        var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
            layers: 'perspectiva_ca_mjj',
            styles: 'perspectiva_ca_mjj',
            transparent: true,
            format: 'image/png'
        }).addTo(map);
    };
    if ( $('#map').hasClass("forests") ){
        /* Forest types for Costa Rica */
        var wmsLayer = L.tileLayer('http://138.68.63.173/geoserver/gwc/service/tms/1.0.0/geonode:bi18_tipos_bosque_costa_rica_2015@EPSG:900913@png/{z}/{x}/{y}.png', {
          tms: true
        }).addTo(map);

        /* Forest types for Honduras */
        var wmsLayer = L.tileLayer('http://138.68.63.173/geoserver/gwc/service/tms/1.0.0/geonode:bi21_tipos_bosque_honduras_2015_v2@EPSG:900913@png/{z}/{x}/{y}.png', {
          tms: true
        }).addTo(map);

        /* Forest types for El Salvador */
        var wmsLayer = L.tileLayer('http://138.68.63.173/geoserver/gwc/service/tms/1.0.0/geonode:bi19_tipos_bosque_el_salvador_2015@EPSG:900913@png/{z}/{x}/{y}.png', {
          tms: true
        }).addTo(map);

        /* Forest types for Belice */
        var wmsLayer = L.tileLayer('http://138.68.63.173/geoserver/gwc/service/tms/1.0.0/geonode:bi15_tipos_bosque_belice_2015@EPSG:900913@png/{z}/{x}/{y}.png', {
          tms: true
        }).addTo(map);
    };
    if ( $('#map').hasClass("protected_areas") ){
        /* Protected areas for Costa Rica */
        var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
            layers:'bi08_areas_prote_costa_rica_2014',
            styles: 'bi07_areas_prote_belice_2014',
            transparent: true,
            format: 'image/png'
        }).addTo(map);

        /* Protected areas for Honduras*/
        var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
            layers:'bi11_areas_prote_honduras_2014',
            styles: 'bi07_areas_prote_belice_2014',
            transparent: true,
            format: 'image/png'
        }).addTo(map);

        /* Protected areas for El Salvador*/
        var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
            layers:'bi09_areas_prote_salvador_2014',
            styles: 'bi07_areas_prote_belice_2014',
            transparent: true,
            format: 'image/png'
        }).addTo(map);

        /* Protected areas for Belice*/
        var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
            layers:'bi07_areas_prote_belice_2014',
            styles: 'bi07_areas_prote_belice_2014',
            transparent: true,
            format: 'image/png'
        }).addTo(map);

        /* Protected areas for Panama*/
        var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
            layers:'bi13_areas_prote_panama_2014',
            styles: 'bi07_areas_prote_belice_2014',
            transparent: true,
            format: 'image/png'
        }).addTo(map);

        /* Protected areas for Guatemala*/
        var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
            layers:'bi10_areas_prote_guatemala_2014',
            styles: 'bi07_areas_prote_belice_2014',
            transparent: true,
            format: 'image/png'
        }).addTo(map);

        /* Protected areas for Caribbean*/
        var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
            layers:'bi01_areas_protegidas_caribe_2008',
            styles: 'bi01_areas_protegidas_caribe_2008',
            transparent: true,
            format: 'image/png'
        }).addTo(map);

        /* Protected areas for Nicaragua*/
        var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
            layers:'bi12_areas_prote_nicaragua_2014',
            styles: 'bi07_areas_prote_belice_2014',
            transparent: true,
            format: 'image/png'
        }).addTo(map);
    };

});
