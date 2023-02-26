import { UserQueue } from "./UserQueue.js";
import { User } from "./User.js";

var maxUser = 10;
var msInterval = 1000;

function init() {
  var map = createMap();

  var userQueue = createUserQueue(maxUser);

  setInterval(async () => {
    let user = await User.createUser();

    user.addMarker(map);

    let userToRemove = userQueue.add(user);

    if (userToRemove != null) {
      map.removeLayer(userToRemove.marker);
    }
  }, msInterval);
}

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

function createUserQueue(maxLen) {
  if (maxLen < 0) {
    maxLen = 0;
  }

  let userQueue = new UserQueue(maxLen);

  return userQueue;
}

document.addEventListener("DOMContentLoaded", init);
