'use strict';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWRnYXJjYXN0cmlsbG8iLCJhIjoiY2p5aW42c2F4MDA5bDNjcnhnOW5mNWc1ayJ9.8GSdtr-slz3DfPjxzqQ3FA';
const main = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(`User position: ${position.coords.latitude}, ${position.coords.longitude}`);
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 14
      });

      var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        limit: 3
      });

      // map.on('load', () => {
      //   // const locationInput = document.querySelector('.location');
      //   // test();
      // });

      // función que devuelve las coordenadas del resultado seleccionado
      geocoder.on('result', (selected) => {
        const selectedCoord = selected.result.geometry.coordinates;
        // console.log(coords);
        const locationInput = document.querySelector('.location');
        locationInput.value = selectedCoord;
        // console.log(locationInput.value);
      });

      var geolocate = new mapboxgl.GeolocateControl(
        {
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: false
        }
      );

      map.addControl(geolocate);

      geolocate.on('geolocate', function (e) {
        var lon = e.coords.longitude;
        var lat = e.coords.latitude;
        var position = [lon, lat];
        console.log(position);
      });

      document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    });
  }
};

window.addEventListener('load', main);

// if ('geolocation' in navigator) {
//   navigator.geolocation.getCurrentPosition(position => {
//     const geocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       mapboxgl: mapboxgl
//     });

//     const map = new mapboxgl.Map({
//       // container id specified in the HTML
//       container: 'map',
//       // style URL
//       style: 'mapbox://styles/mapbox/light-v10',
//       // initial position in [lon, lat] format
//       center: [position.coords.longitude, position.coords.latitude],
//       // initial zoom
//       zoom: 14
//     });

//     map.addControl(new mapboxgl.GeolocateControl({
//       positionOptions: {
//         enableHighAccuracy: true
//       },
//       trackUserLocation: false
//     }));
//     geocoder.on('result', function (result) {
//       console.log(result.result.geometry.coordinates);
//       const form = document.querySelector('location');
//     });
//     document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
//   });
// } else { /* geolocation IS NOT available, handle it */ }
