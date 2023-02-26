export { User };

var userAPI_URL = "https://randomuser.me/api/?nat=fr&inc=name,location&noinfo";

class User {
  /**
   * ? API used : randomuser.me
   * ?            open-meteo.com
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
   * @returns {User}
   */
  static async createUser() {
    var randomUser = await User.requestNewUser();

    /*
      ? Coordinates provided by randomuser API are not correlated with nationality, relevanted coordinates are inferred from the user's city
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
   * @returns {Array}
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
   * @returns {[float, float]} - coordinates - [latitude, longitude]
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
   * getIdentity
   * * Concatenate the first and last name
   * @returns {string}
   */
  getIdentity() {
    return `${this.first} ${this.last}`;
  }
}
