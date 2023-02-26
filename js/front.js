import {UserQueue} from './UserQueue.js'
import {User} from './User.js'

var maxUser = 10
var userAPI_URL = "https://randomuser.me/api/?nat=fr&inc=name,location&noinfo"

function init() {

    var userQueue = createUserQueue(maxUser)

    let usr = createUser()

}

async function createUser() {
    var userFromAPI = await requestNewUser();
    console.log("here is the individual")
    console.log(userFromAPI)

    let user = User.createUserFromRandomUser(userFromAPI)

    console.log(user)
}

async function requestNewUser() {
    const response = await fetch(userAPI_URL)

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

    const data = await response.json()
    const individualData = data.results['0']
    
    return individualData
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