
class Observable {
    constructor(milliseconds) {
        this.millis = milliseconds
    }

    forEach(observer) {
        const int = setInterval(observer.onNext, this.millis)

        return {
          dispose() {
            clearInterval(int);
          }
        }
    }
}

const test = new Observable(1000)
const subscription = test.forEach({
  onNext: () => { console.log('hey') }
})
setTimeout(() => {
  subscription.dispose()
}, 4000)