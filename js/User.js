export { User };

var userAPI_URL = "https://randomuser.me/api/?nat=fr&inc=name,location&noinfo";

class User {
  /**
   * * API used : randomuser.me
   *              open-meteo.com
   *
   * * Data stucture
   * string - first
   * string - last
   * string - city
   * [float, float] - coordinates - [latitude, longitude]
   * leaflet.js marker object
   */
  first;
  last;
  city;
  coordinates;
  marker;

  /**
   * Constructor
   * @param {*} first
   * @param {*} last
   * @param {*} city
   * @param {*} coordinates
   */
  constructor(first, last, city, coordinates) {
    this.first = first;
    this.last = last;
    this.city = city;
    this.coordinates = coordinates;
  }

  /**
   * createUser
   * * asynchronous
   * * Create a new User entity from the information provided by the APIs
   * @returns User entity
   */
  static async createUser() {
    var randomUser = await User.requestNewUser();

    /*
      ? Coordinates provided by randomuser API are not correlated with nationality, relevanted coordinates are inferred from the user's city ?
    */
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

  /**
   * requestNewUser
   * * asynchronous
   * * Fetch from randomuser API user information
   * @returns Array
   */
  static async requestNewUser() {
    const response = await fetch(userAPI_URL);
    const data = await response.json();
    const individualData = await data.results["0"];

    return individualData;
  }

  /**
   * getCoordinatesFromCity
   * * asynchronous
   * * Fetch from open-meteo API the coordinates of a given city
   * @param {string} city
   * @returns {[float, float]} coordinates - [latitude, longitude]
   */
  static async getCoordinatesFromCity(city) {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const data = await response.json();
    const geolocationData = await data.results["0"];
    const coordinates = [geolocationData.latitude, geolocationData.longitude];

    return coordinates;
  }

  /**
   * addMarker
   * * asynchronous
   * * Place a marker with relevant weather information on a given map
   * @param {*} map 
   */
  async addMarker(map) {
    let marker = L.marker(this.coordinates).addTo(map);
    let weatherData = await this.getWeather();
    let popupMsg = `<p class=popup>
    ${this.getIdentity()}<br>
    <span class=city>${this.city}</span><br>
    <span class=temperature>${weatherData.temperature}°C</span><br>
    <span class=weathercode>${weatherData.weathercode}</span></p>`;
    marker.bindPopup(popupMsg);

    this.marker = marker;
  }

  /**
   * getWeather
   * * asynchronous
   * * Fetch from open-meteo API weather information at the user's coordinates
   * @returns 
   */
  async getWeather() {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${this.coordinates[0]}&longitude=${this.coordinates[0]}&current_weather=true`
    );
    const data = await response.json();
    const weatherData = await data.current_weather;

    return weatherData;
  }

  /**
   * getIdentity
   * * Concatenate the first and last name
   * @returns {string}
   */
  getIdentity() {
    return `${this.first} ${this.last}`;
  }
}
