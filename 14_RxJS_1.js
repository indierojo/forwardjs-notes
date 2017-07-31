
class ObservableBasic {
    constructor(milliseconds) {
        this.millis = milliseconds
    }

    forEach(callback) {
        setInterval(callback, this.millis)
    }
}

const test = new ObservableBasic(1000)
test.forEach(() => console.log('hey'))

class O