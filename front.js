import {UserQueue} from './cls/UserQueue.js'
import {User} from './cls/User.js'

var maxUser = 10
var userAPI_URL = "https://randomuser.me/api/?nat=fr&inc=name,location"

function init() {

    var userQueue = createUserQueue(maxUser)

    let usr = createUser()

}

function createUser() {
    var userFromAPI = requestNewUser();
    console.log(userFromAPI)
    //let user = User.createUserFromRandomUser(userFromAPI)

}

function requestNewUser() {
    return fetch(userAPI_URL)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //console.log("fetched")
            //console.log(data.results['0'])
            return data.results['0']
        })
        .then((individualData) => {
            console.log("here is the individual")
            console.log(individualData)
            return individualData
        })
        .done
}

function addUser() {

}

function createUserQueue(maxLen) {

    if (maxLen<0) {
        maxLen = 0
    }

    let userQueue = new UserQueue(maxLen)

    return userQueue
}

document.addEventListener("DOMContentLoaded", init)