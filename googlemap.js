let map;
function initMap() {
  navigator.geolocation.getCurrentPosition((position) => {
    const myLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    map = new google.maps.Map(document.getElementById('map'), {
      center: myLocation,
      zoom: 10,
    });
    const marker = new google.maps.Marker({
      position: myLocation,
      map: map,
    });
  });
}