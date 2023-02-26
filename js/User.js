export { User };

var userAPI_URL = "https://randomuser.me/api/?nat=fr&inc=name,location&noinfo";

class User {
  first;
  last;
  city;
  coordinates;
  marker;

  constructor(first, last, city, coordinates) {
    this.first = first;
    this.last = last;
    this.city = city;
    this.coordinates = coordinates; // [latitude, longitude]
  }

  static async createUser() {
    var randomUser = await User.requestNewUser();

    let correctCoordinates = await User.getCoordinatesFromCity(
      randomUser.location.city
    );

    let user = new User(
      randomUser.name.first,
      randomUser.name.last,
      randomUser.location.city,
      correctCoordinates
    );

    return user;
  }

  static async requestNewUser() {
    const response = await fetch(userAPI_URL);

    /*
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                return data.results['0']
            })
            .then((individualData) => {
                return individualData
            })
        */

    const data = await response.json();
    const individualData = await data.results["0"];

    return individualData;
  }

  static async getCoordinatesFromCity(city) {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const data = await response.json();
    const geolocationData = await data.results["0"];
    const coordinates = [geolocationData.latitude, geolocationData.longitude];

    return coordinates;
  }

  async addMarker(map) {
    let marker = L.marker(this.coordinates).addTo(map);
    let weatherData = await this.getWeather();
    console.log(weatherData);
    let popupMsg = `<p class=popup>
    ${this.getIdentity()}
    <span class=city>${this.city}</span>
    <span class=temperature>${weatherData.temperature}°C</span>
    <span class=weathercode>${weatherData.weathercode}</span></p>`;
    marker.bindPopup(popupMsg);

    this.marker = marker;
  }

  async getWeather() {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${this.coordinates[0]}&longitude=${this.coordinates[0]}&current_weather=true`
    );
    const data = await response.json();
    const weatherData = await data.current_weather;

    return weatherData;
  }

  getIdentity() {
    return `${this.first} ${this.last}`;
  }
}
