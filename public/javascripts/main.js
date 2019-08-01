'use strict';

const main = () => {
  var mapContiner = document.querySelector('#map');
  if (mapContiner) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWRnYXJjYXN0cmlsbG8iLCJhIjoiY2p5cTlsZWo2MDAzeTNuczBlNWhxZGxzMCJ9.hySaKuMXT6KAb3qksvZccw';
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log(`User position: ${position.coords.latitude}, ${position.coords.longitude}`);
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/light-v10',
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 4
        });

        var geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          limit: 3
        });

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
                  <a href="/houses/sells/${element._id}"><img src="${element.image[0]}"></a>
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
    const testing = async () => {
      const response = await axios.get('/api');
      return response.data;
    };
    testing();
  }

  // -------------------------------------------------------------

  const form = document.querySelector('.sell-form');
  const buttonFile = document.querySelector('.sell-form button');
  var imageArray = [];
  if (buttonFile && form) {
    buttonFile.addEventListener('click', async (event) => {
      console.log('click');
      event.preventDefault();
      const imageContainer = document.querySelector('.photo-up-container');
      const formData = new FormData();
      formData.append('image', event.target.parentElement.children[1].files[0]);
      const imageUrl = await axios.post('/api/image-upload', formData);
      const image = document.createElement('article');
      image.classList.add('article-img');
      // image.classList.backgroundImage = `url(${imageUrl.data})`;
      image.innerHTML = `<img src="${imageUrl.data}" alt="uploaded photo">`;
      // imageContainer.appendChild(image);
      // image.setAttribute('src', imageUrl.data);

      imageContainer.appendChild(image);
      imageArray.push(imageUrl.data);
      if (imageArray.length === 6) {
        const p = document.createElement('p');
        p.innerHTML = '<p style="color:red;">You have uploaded 6 photos</style></p>';

        buttonFile.replaceWith(p);
      }
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const house = {
        title: event.srcElement.title.value,
        area: event.srcElement.location.value,
        image: imageArray,
        location: event.srcElement.location.value,
        description: event.srcElement.rooms.value,
        rooms: event.srcElement.rooms.value,
        bathrooms: event.srcElement.bathrooms.value,
        swimmingPool: event.srcElement.swimmingPool.value,
        garden: event.srcElement.garden.value,
        privateBeach: event.srcElement.privateBeach.value,
        price: event.srcElement.price.value
      };
      const response = await axios.post('/api/form-sell', house);
      window.location.href = '/profile/sells';
      console.log(response);
    });
  }
};

window.addEventListener('load', main);
