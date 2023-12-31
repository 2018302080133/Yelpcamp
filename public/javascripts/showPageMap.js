mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/light-v10', 
      center: campgroundInfo.geometry.coordinates, 
      zoom: 9, 
});

map.addControl(new mapboxgl.NavigationControl());

const marker = new mapboxgl.Marker()
    .setLngLat(campgroundInfo.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({offset: 25})
        .setHTML(
          `<h3>${campgroundInfo.title}</h3><p>${campgroundInfo.location}</p>`
        )
    )
    .addTo(map);