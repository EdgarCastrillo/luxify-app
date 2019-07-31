'use strict';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWRnYXJjYXN0cmlsbG8iLCJhIjoiY2p5cTlsZWo2MDAzeTNuczBlNWhxZGxzMCJ9.hySaKuMXT6KAb3qksvZccw';
const main = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(`User position: ${position.coords.latitude}, ${position.coords.longitude}`);
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 8
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

      const searchHouses = async () => {
        try {
          const housesRequest = await fetch(`/api/users`);
          if (housesRequest.status === 404) {
            console.error('No houses');
          }
          const arrayHouses = await housesRequest.json();
          return arrayHouses;
        } catch (error) {
          console.error(error);
        }
      };

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

      const array = await testing();

      array.forEach(element => {
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = "url('https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png";
        new mapboxgl.Marker(el)
          .setLngLat(element.location.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(`
            <div class="popup">
              <div class="popup-img">
                <div class="popup-img-avatar" style="background-image:url(${element.image})">
                <img src="url(${element.image}">
                </div>
              </div>
              <div class="popup-details">
                <p class="popup-details-title"><a href="/profile/${element._id}">${element.title}</a></p>
              </div>
            </div>
            `))
          .addTo(map);
      });
    });
  }
};

const testing = async () => {
  const response = await axios.get('/api');
  return response.data;
};

testing();

window.addEventListener('load', main);
