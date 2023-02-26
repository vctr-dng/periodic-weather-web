import { UserQueue } from "./UserQueue.js";
import { User } from "./User.js";

var maxUser = 10;
var msInterval = 1000;

function init() {
  var map = createMap();

  var userQueue = createUserQueue(maxUser);

  setInterval(async () => {
    let usr = await User.createUser();

    let weatherData = await usr.getWeather();

    userQueue.add(usr);
  }, msInterval);
}

function createMap() {
  var map = L.map("map").setView([46.54, 2.43], 6); // The coordinates of the center of France is given by the IGN institution

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  return map;
}

function createUserQueue(maxLen) {
  if (maxLen < 0) {
    maxLen = 0;
  }

  let userQueue = new UserQueue(maxLen);

  return userQueue;
}

document.addEventListener("DOMContentLoaded", init);
