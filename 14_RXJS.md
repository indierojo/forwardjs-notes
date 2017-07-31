## The Essence of RxJS: Getting your feet wet
Andre Coelho (?)

## Abstract
RxJS has become a popular framework for managing asynchronous tasks and its flagship Observables even being a current ES proposal. You can find many resources on how to use RxJS but very few which explains how it works. I've found that building things from first principles works best for me and would like to show you a barebones implementation of RxJS, enough to have a drag and drop example from its documentation to work. This will highlight the essence of what RxJS is and enable you to think better about how to use it.

## What is RxJS
 * Reactive Extensions
 * Set of libs for composing a async and event-based programs using observable sequences and fluent-based operators

### Composition
 * FP gives us a way to divide code that is efficient for our brains to reason about.

### How does RxJS fit In?
 * RxJS provides an opinionated framework to build the pieces
 * Composition, Pipelines, And Assembly Lines
 * Observables are lazy, unlike promises
#### Chaining
```
const button = Dom.findByBlah(`button`)
 const events = Observable.fromEvent(button, 'click')
 .filter(ev => /**/)
 .map(ev => /**/)
 .take(5)

 events.doStuff
```
#### Some code
```
  [1,2,3,4]
  .filter(x => x % 2 === 0)
  // [2, 4]
  .map(x => x * 10)
  // [20, 40]
  .slice(0, 1)
  // [20]
```
^ Behind the scenes, these are powered by `forEach`
* We assume that foreach loops, but does that have to be the case?
^ this apparently is the essence of RxJS

#### SRC
http://github.com/andrecoelho/barebones-observable
#### Slides
http://slides.com/andrerc/essence-of-rx

## Live Example
SEE: js files