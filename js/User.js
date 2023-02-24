export { User }

class User {

    constructor(first, last, coordinates) {
        this.first = first
        this.last = last
        this.coordinates = coordinates // [longitude, latitude]
    }

    static createUserFromRandomUser(dataAPI) {
        /*
        Creates a function with dataAPI fetched from the randomuser.me API
        */

        let data = dataAPI
        
        console.log(dataAPI)
        let first = dataAPI['name']['first'];
        let last = dataAPI['name']['last'];
        let coordinates = dataAPI['location']['coordinates']

        return User.prototype.constructor(first, last, coordinates)
    }
}