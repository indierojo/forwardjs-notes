
class Observable {
    constructor(milliseconds) {
        this.millis = milliseconds
    }

    forEach(callback) {
        const int = setInterval(callback, this.millis)

        return {
          dispose() {
            clearInterval(int);
          }
        }
    }
}

const test = new Observable(1000)
const subscription = test.forEach(() => console.log('hey'))
setTimeout(() => {
  subscription.dispose()
}, 4000)