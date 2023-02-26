import {UserQueue} from './UserQueue.js'
import {User} from './User.js'

var maxUser = 10
var msInterval = 1000

function init() {

    var userQueue = createUserQueue(maxUser)

    setInterval(async() => {
        let usr = await User.createUser()
        console.log(usr)
        userQueue.add(usr)
        console.log(userQueue)
    },
    msInterval)
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