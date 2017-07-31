
class Observable {
    constructor(forEach) {
        this.fn = forEach
    }

    forEach(onNext, onError, onComplete) {
      if (typeof onNext === 'function') {
        return this._forEach({
          onNext,
          onError: onError || function () {},
          onCoplete: onComplete || function () {}
        })
      } else {
        return this.forEach(onNext)
      }
    }
    
    static fromEvent(domEl, eventName) {
      return new Observable(function forEach(observer) {
        domEl.addEventListener(eventName, observer.onNext)
        return {
          dispose() {
            domEl.removeEventListener(eventName, observer.onNext)
          }
        }
      })
    }

    static fromInterval(millis) {
      return new Observable(function forEach(observer) {
        const int = setInterval(observer.onNext, millis)

        return {
          dispose() {
            clearInterval(int);
          }
        }
      })
    }
}


const subscription = Observable.fromInterval({
  onNext: () => { console.log('hey') }
})
setTimeout(() => {
  console.log(subscription)
  subscription.dispose()
}, 4000)

// <>