/**
 * Created by luisalonsomurilloalonso on 11/12/16.
 */

 var attr_osm = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
   attr_overpass = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';
 var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_osm, attr_overpass].join(', ')});
 var map = new L.Map('map').addLayer(osm).setView(L.latLng(10.07568504578726, -84.31182861328125), 8);

//Global variables
var currentFireCoordinates = null;

 function displayWildfiresDetails(lat, lng, brightness, scan, track, date, time, satellite, confidence, version, bright_t31, frp, daynight) {
   var jsonMODIS = {"LATITUDE":lat,
                    "LONGITUDE":lng,
                    "BRIGHTNESS":brightness,
                    "SCAN":scan,
                    "TRACK":track,
                    "ACQ_DATE":date,
                    "ACQ_TIME":time,
                    "SATELLITE":satellite,
                    "CONFIDENCE":confidence,
                    "VERSION":version,
                    "BRIGHT_T31":bright_t31,
                    "FRP":frp,
                    "DAYNIGHT":daynight};
   console.log(JSON.stringify(jsonMODIS));
   try {
     mobile.getMODISData(JSON.stringify(jsonMODIS));
   } catch(err) {
     console.log("Error trying to invoke mobile method");
   }
 }

 function setUserCurrentLocation(latitude, longitude) {
   map.setView(L.latLng(latitude, longitude), 8);
   try {
     mobile.notifyCurrentLocation();
   } catch (err) {
     console.log("Error trying to invoke mobile method");
   }
 }

/* Routing */

var route = L.Routing.control({
    waypoints: [],
    routeWhileDragging: false,
    createMarker: function() { return null; },
    router: L.Routing.graphHopper('c06e05f1-cd2f-4c9d-921c-06d634c9c8e9')
});
route.addTo(map);

function setRouteFromTwoPoints(latitudeA, longitudeA, latitudeB, longitudeB) {
  route.setWaypoints([
    L.latLng(latitudeA, longitudeA),
    L.latLng(latitudeB, longitudeB)
  ]);
}

function removeRoute() {
  route.setWaypoints([]);
}

/* Fire station mark */
var fireStationIcon = L.icon({
     iconUrl: 'firemen.png',
     iconSize:     [32, 37],
     iconAnchor:   [16, 36],
     popupAnchor:  [0, -37]
 });
 var fireStationMarker = null;

 function addFireStationMark(latitude, longitude) {
   fireStationMarker = L.marker([latitude, longitude], {icon: fireStationIcon});
   fireStationMarker.addTo(map);
 }

 function removeFireStationMark() {
   fireStationMarker.removeFrom(map);
 }

 function mobileShowDetails() {
   try {
     mobile.showWildfireDetails();
   } catch(err) {
     console.log("Error trying to invoke mobile method");
   }
 }

 function addWildfireMessage(latitude, longitude, brightness, temperature, humidity) {
   var popup = L.popup({offset: L.point(0, -37)})
     .setLatLng(L.latLng(latitude, longitude))
     .setContent('<b>Incendio</b>' +
                 '<br>Intecidad: ' + brightness +
                 '<br>Temperatura: ' + temperature + " &#8451;" +
                 '<br>Humedad: ' + humidity + "%" +
                 '<br><a href="javascript:mobileShowDetails();">Detalles</a>')
     .openOn(map);
 }

 function removeWildfireMessage() {
   map.closePopup();
 }

 /* Wildfire icon */

 var fireIcon = L.icon({
      iconUrl: 'fire.png',
      iconSize:     [32, 37],
      iconAnchor:   [16, 36],
      popupAnchor:  [0, -37]
  });

  function onEachFeature(feature, layer) {
      layer.setIcon(fireIcon);
      /*if (feature.properties) {
        var link = '<br><a href="javascript:displayWildfiresDetails('
                   + feature.properties.LATITUDE + ','
                   + feature.properties.LONGITUDE + ','
                   + feature.properties.BRIGHTNESS + ','
                   + feature.properties.SCAN + ','
                   + feature.properties.TRACK + ','
                   + '\'' + feature.properties.ACQ_DATE + '\','
                   + '\'' + feature.properties.ACQ_TIME + '\','
                   + '\'' + feature.properties.SATELLITE + '\','
                   + feature.properties.CONFIDENCE + ','
                   + '\'' + feature.properties.VERSION + '\','
                   + feature.properties.BRIGHT_T31 + ','
                   + feature.properties.FRP + ','
                   + '\'' + feature.properties.DAYNIGHT + '\''
                   + ');">Details</a>';

        layer.bindPopup("<b>Wildfire point</b>"
                       + "<br>BRIGHTNESS: " + feature.properties.BRIGHTNESS
                       + "<br>DATE: " + feature.properties.ACQ_DATE
                       + "<br>TIME: " + feature.properties.ACQ_TIME
                       + "<br>SATELLITE: " + feature.properties.SATELLITE
                       + link);
      }*/
      layer.on('click', function (e) {
        //console.log(e);
        map.setView(e.latlng, 13);
        currentFireCoordinates = L.latLng(e.latlng.lat, e.latlng.lng);
        displayWildfiresDetails(e.target.feature.properties.LATITUDE,
                                e.target.feature.properties.LONGITUDE,
                                e.target.feature.properties.BRIGHTNESS,
                                e.target.feature.properties.SCAN,
                                e.target.feature.properties.TRACK,
                                e.target.feature.properties.ACQ_DATE,
                                e.target.feature.properties.ACQ_TIME,
                                e.target.feature.properties.SATELLITE,
                                e.target.feature.properties.CONFIDENCE,
                                e.target.feature.properties.VERSION,
                                e.target.feature.properties.BRIGHT_T31,
                                e.target.feature.properties.FRP,
                                e.target.feature.properties.DAYNIGHT);
     });
  }

  /* MODIS geoJSON */

   var geojsonLayer = new L.GeoJSON.AJAX("http://forestdev6339.cloudapp.net/Leaflet/central_america.json", {
      onEachFeature: onEachFeature
  });
  geojsonLayer.addTo(map);