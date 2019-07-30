'use strict';

// This adds the map to your Home page
// const mapHome = document.getElementsByClassName('');
// const mapForm = document.getElementsByClassName('');
const main = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWRnYXJjYXN0cmlsbG8iLCJhIjoiY2p5aW42c2F4MDA5bDNjcnhnOW5mNWc1ayJ9.8GSdtr-slz3DfPjxzqQ3FA';
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      });

      const map = new mapboxgl.Map({
        // container id specified in the HTML
        container: 'map',
        // style URL
        style: 'mapbox://styles/mapbox/light-v10',
        // initial position in [lon, lat] format
        center: [position.coords.longitude, position.coords.latitude],
        // initial zoom
        zoom: 14
      });

      map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: false
      }));
      geocoder.on('result', function (result) {
        console.log(result.result.geometry.coordinates);
      });
      document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    });
  } else { /* geolocation IS NOT available, handle it */ }
};

window.addEventListener('load', main);
