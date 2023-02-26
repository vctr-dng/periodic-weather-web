export { User };

var userAPI_URL = "https://randomuser.me/api/?nat=fr&inc=name,location&noinfo";

class User {
  constructor(first, last, coordinates) {
    this.first = first;
    this.last = last;
    this.coordinates = coordinates; // [latitude, longitude]
  }

  async getWeather() {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${this.coordinates[0]}&longitude=${this.coordinates[0]}&current_weather=true`
    );
    const data = await response.json();
    const weatherData = await data.current_weather;

    return weatherData;
  }

  static async createUser() {
    var randomUser = await User.requestNewUser();

    let correctCoordinates = await User.getCoordinatesFromCity(
      randomUser.location.city
    );

    let user = new User(
      randomUser.name.first,
      randomUser.name.last,
      correctCoordinates
    );

    return user;
  }

  static createUserFromRandomUser(dataAPI) {
    /*
        Creates a function with dataAPI fetched from the randomuser.me API
        */

    let data = dataAPI;

    //console.log(dataAPI)
    let first = dataAPI["name"]["first"];
    let last = dataAPI["name"]["last"];
    let coordinates = dataAPI["location"]["coordinates"];

    return new User(first, last, coordinates);
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
}
