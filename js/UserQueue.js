export { UserQueue };

class UserQueue {
  queue = [];
  length = 0;
  maxLen = 0; // if = 0, the queue has no limit

  constructor(maxLen) {
    this.maxLen = maxLen;
  }

  add(usr) {
    let res = null;
    this.queue.push(usr);
    this.length++;
    if (this.maxLen > 0) {
      if (this.length > this.maxLen) {
        res = this.remove();
      }
    }

    return res;
  }

  remove() {
    if (this.length > 0) {
      let userRemoved = this.queue.shift();
      this.length--;
      return userRemoved;
    }
  }
}
