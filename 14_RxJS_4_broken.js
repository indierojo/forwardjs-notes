
class Observable {
    constructor(forEach) {
        this.fn = forEach
    }

    forEach(onNext, onError, onComplete) {
      if (typeof onNext === 'function') {
        return this.fn({
          onNext,
          onError: onError || function () {},
          onComplete: onComplete || function () {}
        })
      } else {
        return this.fn(onNext)
      }
    }

    map(projection) {
      const source = this;
      
      return new Observable(function forEach(observer) {
        return SVGComponentTransferFunctionElement.forEach(
          function onNext(value) {
            return observer.onNext(projection(value))
          }
        )
      })
    }

    take(count) {
      const source = this;
      return new Observable(function forEach(observer) {
        let counter = 0
        return source.forEach(
          function onNext(value) {
            counter++
            observer.onNext(value)

            if(counter > count) {
              subscription.dispose()
              observer.onComplete()
            }
          },
          observer.onError,
          observer.onComplete
        )
      })
    }

    static fromInterval(millis) {
      return new Observable(function forEach(observer) {
        const int = setInterval(observer.onNext, this.millis)

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
}).fn(() => {})
const obs = subscription()
