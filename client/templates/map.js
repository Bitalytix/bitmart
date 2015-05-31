Meteor.subscribe('markers');

function createMarker();

Template.map.onCreated(function () {
    GoogleMaps.ready('mymap', function (map) {
        
        //google.maps.event.addListener(map.instance, 'click', function (event) {
        //    Markers.insert({lat: event.latLng.lat(), lng: event.latLng.lng()});
        //});

        var markers = {};

        function CenterControl(controlDiv, map) {

            // Set CSS for the control border
            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = '#fff';
            controlUI.style.border = '2px solid #fff';
            controlUI.style.borderRadius = '3px';
            controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
            controlUI.style.cursor = 'pointer';
            controlUI.style.marginBottom = '22px';
            controlUI.style.textAlign = 'center';
            controlUI.title = 'Click to recenter the map';
            controlDiv.appendChild(controlUI);

            // Set CSS for the control interior
            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText.style.fontSize = '16px';
            controlText.style.lineHeight = '38px';
            controlText.innerHTML = 'Center Map';
            controlText.style.paddingLeft = '5px';
            controlText.style.paddingRight = '5px';
            controlUI.appendChild(controlText);

            // Setup the click event listeners: simply set the map to Chicago
            google.maps.event.addDomListener(controlUI, 'click', function() {
                map.setCenter(new google.maps.LatLng(41.8337329, -87.7321555));
            });

        };


        var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map.instance);

        centerControlDiv.index = 1;
        map.instance.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(centerControlDiv);


        Markers.find().observe({
            added: function (document) {
                var marker = new google.maps.Marker({
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(document.lat, document.lng),
                    map: map.instance,
                    //icon: image,
                    id: document._id
                });

                google.maps.event.addListener(marker, 'dragend', function (event) {
                    Markers.update(marker.id, {$set: {lat: event.latLng.lat(), lng: event.latLng.lng()}});
                });

                google.maps.event.addListener(marker, 'click', function (event) {
                    console.log('clicked');
                    console.log(event);
                    //Markers.update(marker.id, {$set: {lat: event.latLng.lat(), lng: event.latLng.lng()}});
                });

                markers[document._id] = marker;
            },
            changed: function (newDocument, oldDocument) {
                markers[newDocument._id].setPosition({lat: newDocument.lat, lng: newDocument.lng});
            },
            removed: function (oldDocument) {
                markers[oldDocument._id].setMap(null);
                google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
                delete markers[oldDocument._id];
            }
        });
    });
});

Meteor.startup(function () {
    GoogleMaps.load();
});


Template.map.helpers({
    mapOptions: function () {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(19.9325862, 7.5140332),
                zoom: 3
            };
        }
    },
    parentProfile: function (){
        return 'in parent';
    }
});

Template.first.helpers({
    profile: function(parentContext) {
        console.log(this);
        console.log(parentContext);
        //console.log(parentContext);
        return 'buddy';
    }
});

var stationList = [
    {"latlng":[35.681382,139.766084],name:"Tokyo Station"},
    {"latlng":[35.630152,139.74044],name:"Shinagawa Station"},
    {"latlng":[35.507456,139.617585],name:"Shin-Yokohama Station"},
    {"latlng":[35.25642,139.154904],name:"Odawara Station"},
    {"latlng":[35.103217,139.07776],name:"Atami Station"},
    {"latlng":[35.127152,138.910627],name:"Mishima Station"},
    {"latlng":[35.142015,138.663382],name:"Shin-Fuji Station"},
    {"latlng":[34.97171,138.38884],name:"Shizuoka Station"},
    {"latlng":[34.769758,138.014928],name:"Kakegawa Station"},
    {"latlng":[34.703741,137.734442],name:"Hamamatsu Station"},
    {"latlng":[34.762811,137.381651],name:"Toyohashi Station"},
    {"latlng":[34.96897,137.060662],name:"Mikawa-Anjyo Station"},
    {"latlng":[35.170694,136.881637],name:"Nagoya Station"},
    {"latlng":[35.315705,136.685593],name:"Gifu-Hashima Station"},
    {"latlng":[35.314188,136.290488],name:"Yonehara Station"},
    {"latlng":[34.985458,135.757755],name:"Kyoto Station"},
    {"latlng":[34.73348,135.500109],name:"Shin-Osaka Station"}
];