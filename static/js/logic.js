// Store our API endpoint inside queryUrl
var queryUrl = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"
// Perform an API call to the Citi Bike API to get station information
d3.json(queryUrl, function(data) {
  // call createMakers function
  createMarkers(data);
 });

// Create the createMarkers function
function createMarkers(markers) {
  // Pull the "stations" property off of response.data
  var allStations = markers.data.stations 
 
  // Initialize an array to hold bike markers
  var arrBikeMarkers = [];
  // Loop through the stations array
    for (var i = 0; i < allStations.length; i++) {
      // For each station, create a marker and bind a popup with the station's name
      arrBikeMarkers.push(
        L.marker([allStations[i].lat, allStations[i].lon])
        .bindPopup("<h1>" + allStations[i].name + "</h1><hr><h2>" + "capacity: " + allStations[i].capacity + "</h3>"));
    }
  // Add the marker to the bikeMarkers array
  // Now we can handle them as one group instead of referencing each individually
  var stationLayer = L.layerGroup(arrBikeMarkers);
  // Create a layer group made from the bike markers array, pass it into the createMap function
  console.log(stationLayer);
  // call createMap function
  createMap(stationLayer);
};


// Create the createMap function
function createMap(bikeStations) {
  // Create the tile layer that will be the background of our map
  var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    Light: light
  };
  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    BikeStations: bikeStations
  };
  // Create the map object with options
  var myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [light, bikeStations]
    
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
};
