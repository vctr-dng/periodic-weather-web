export { WeatherUI };

class WeatherUI {
  /**
   * ? API used: open-meteo.com
   *
   * * Data structure
   * Array - queue
   * Integer - length
   * Integer - maxLen - if = 0 then the queue has no limit
   */
  map;

  constructor(map) {
    this.map = map;
  }

  /**
   * addUserMarker
   * * asynchronous
   * * Place a marker with relevant user and weather information on a given map
   * @param {*} map
   */
  async addUserMarker(user) {
    let marker = L.marker(user.coordinates).addTo(this.map);
    let weatherData = await WeatherUI.getWeatherFromCoordinates(
      user.coordinates
    );
    let temperatureRGB = WeatherUI.temperatureToRGB(weatherData.temperature);

    let popupMsg = `<p class=popup>
      ${user.getIdentity()}<br>
      <span class=city>${user.city}</span><br>
      <span class=temperature style='color:${temperatureRGB}'>${
      weatherData.temperature
    }°C</span><br>
      <span class=weathercode>${
        weatherCodeText[weatherData.weathercode]
      }</span></p>`;
    marker.bindPopup(popupMsg);

    user.marker = marker;
  }

  /**
   * getWeatherFromCoordinates
   * * asynchronous
   * * Fetch from open-meteo API weather information at the user's coordinates
   * @param {[Float, Float]} coordinates - [Latitude, Latitude]
   * @returns {Array}
   */
  static async getWeatherFromCoordinates(coordinates) {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates[0]}&longitude=${coordinates[0]}&current_weather=true`
    );
    const data = await response.json();
    const weatherData = await data.current_weather;

    return weatherData;
  }

  /**
   * temperatureToRGB
   * * Return the RGB value corresponding to temperature range the given temperature belongs to
   * @param {Float} temperature
   * @returns {String} - color
   */
  static temperatureToRGB(temperature) {
    let color = "rgb(0, 0, 0)";

    if (temperature > 25) {
      color = "rgb(200, 0, 0)";
    } else if (temperature > 15 && temperature < 25) {
      color = "rgb(180, 75, 30)";
    } else if (temperature > -5 && temperature < 15) {
      color = "rgb(20, 160, 190)";
    } else if (temperature < -5) {
      color = "rgb(20, 0, 150)";
    }

    return color;
  }
}

/**
 * ? Text associated with weathercodes from open-meteo API
 */
const weatherCodeText = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light Drizzle",
  53: "Moderate Drizzle",
  55: "Dense Drizzle",
  56: "Light Freezing Drizzle",
  57: "Dense Freezing Drizzle",
  61: "Slight Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  66: "Light Freezing Rain",
  67: "Heavy Freezing Rain",
  71: "Slight Snow Fall",
  73: "Moderate Snow Fall",
  75: "Heavy Snow Fall",
  77: "Snow Grains",
  80: "Slight Rain Showers",
  81: "Moderate Rain Showers",
  85: "Slight Snow Showers",
  86: "Heavy Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm with Slight Hail",
  99: "Thunderstorm with Slight Hail",
};
