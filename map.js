He-Yump


Search Drive

Drive
.
Folder Path
My Drive
Code
Web
GoogleMapsAPI
NEW 
Folders and views
My Drive
Shared with me
Google Photos
Recent
Starred
Trash
9 GB of 15 GB used
Upgrade storage
Get Drive for PC
Name
Owner
Last modified
File size

index.html
me
Oct 9, 2015
928 bytes

javascript.js
me
Oct 12, 2015
688 bytes

main.css
me
Oct 9, 2015
907 bytes

map.js
me
Oct 11, 2015
5 KB
Javascript
map.js
Details
Activity
YESTERDAY
H
Youcreated an item in
Computer • Thu 10:40 PM
Google Drive Folder
GoogleMapsAPI
Javascript
map.js
No recorded activity before February 4, 2016
All selections cleared 


var map;
var infowindow;

function initMap() {
  var location = {lat: 44.9778, lng: -93.2650};

  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  infowindow = new google.maps.InfoWindow();

  findGoodPlace(location);
  
  
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
  
  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
        
        
        //Based on search term find good places and set the arrows
        var search = place.geometry.location;
      var searchPlace = new google.maps.LatLng(search.lat(), search.lng());
        findGoodPlace(searchPlace);
        
        
        
        //TOD find bad places adn set them as a different icon
        

     

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
      
  
    map.fitBounds(bounds);
      
      
      
      
  });
}


        
function findGoodPlace(location){
    var service = new google.maps.places.PlacesService(map);
  service.textSearch({
    location: location,
    radius: 500,
    query: 'Whole Foods'
  }, callGoodBack);
    
    
    service.textSearch({
    location: location,
    radius: 500,
    query: 'Chipotle'
  }, callGoodBack);

    service.textSearch({
    location: location,
    radius: 500,
    query: 'Starbucks'
  }, callGoodBack);

    service.textSearch({
    location: location,
    radius: 500,
    query: 'Apple Store'
  }, callGoodBack);
    
     service.textSearch({
    location: location,
    radius: 500,
    query: 'Organic'
  }, callGoodBack);
//TODO add more place to check
    
    //Bad
    service.textSearch({
    location: location,
    radius: 500,
    query: 'Walmart'
  }, callBadBack);
    
    
    service.textSearch({
    location: location,
    radius: 500,
    query: 'Aldi'
  }, callBadBack);

    service.textSearch({
    location: location,
    radius: 500,
    query: 'Hospital'
  }, callBadBack);
    
    service.textSearch({
    location: location,
    radius: 500,
    query: 'Pawn Shop'
  }, callBadBack);
    
    service.textSearch({
    location: location,
    radius: 500,
    query: 'Pay Day Loan'
  }, callBadBack);
}
        

function callGoodBack(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createGoodMarker(results[i]);
    }
  }
}



function createGoodMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


        

function callBadBack(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createBadMark(results[i]);
    }
  }
}



function createBadMark(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
