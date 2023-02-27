import { UserQueue } from "./UserQueue.js";
import { User } from "./User.js";
import { WeatherUI } from "./WeatherUI.js";

/**
 * ! EDITABLE SETTINGS !
 */
var maxUser = 10; // Maximum user on the map
var msInterval = 1000; // Interval in ms spacing out the retrieval of a new user

/**
 * init
 * * Main function starting the loop to place a random user with their associated weather information
 */
function init() {
  var map = createMap();
  var weatherUI = new WeatherUI(map);
  var userQueue = createUserQueue(maxUser);

  setInterval(async () => {
    let user = await User.createUser();

    weatherUI.addUserMarker(user);

    let userToRemove = userQueue.add(user);

    if (userToRemove != null) {
      map.removeLayer(userToRemove.marker);
    }
  }, msInterval);
}

/**
 * * Create a map centered on France and display it as a HTML element
 * @returns Leaflet map object entity
 */
function createMap() {
  var map = L.map("map", {
    // The coordinates of the center of France is given by the IGN institution
    center: [46.54, 2.43],
    // Parameters to finetune the zooming feature
    zoomSnap: 0.1,
    zoomDelta: 0.1,
    zoom: 6.4,
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  return map;
}

/**
 * createUserQueue
 * * Create a user queue (FIFO)
 * ? if the maximum length is below or equal to 0 then the queue is infinite
 * @param {*} maxLen
 * @returns
 */
function createUserQueue(maxLen) {
  if (maxLen < 0) {
    maxLen = 0;
  }

  let userQueue = new UserQueue(maxLen);

  return userQueue;
}

document.addEventListener("DOMContentLoaded", init);
