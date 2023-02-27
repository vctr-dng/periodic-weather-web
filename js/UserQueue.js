export { UserQueue };

class UserQueue {
  /**
   * * Data structure
   * Array - queue
   * Integer - length
   * Integer - maxLen - if = 0 then the queue has no limit
   */
  queue = [];
  length = 0;
  maxLen = 0;

  /**
   * constructor
   * @param {*} maxLen
   */
  constructor(maxLen) {
    this.maxLen = maxLen;
  }

  /**
   * add
   * * Add a new user to the queue
   * ? If the maximum length is exceeded, the top user is removed from the queue and this user is returned
   * @param {User} user
   * @returns {User or null}
   */
  add(user) {
    let res = null;
    this.queue.push(user);
    this.length++;
    if (this.maxLen > 0) {
      if (this.length > this.maxLen) {
        res = this.remove();
      }
    }

    return res;
  }

  /**
   * remove
   * * Remove the user at the top of the queue
   * @returns {User or null}
   */
  remove() {
    if (this.length > 0) {
      let userRemoved = this.queue.shift();
      this.length--;
      return userRemoved;
    }
  }
}
