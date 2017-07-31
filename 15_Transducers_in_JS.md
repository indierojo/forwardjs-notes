## Transducers: Decoupling Transformations from I/O Sources
Nicolas Feigenbaum (?)

## Abstract
A look into how transducers are implemented in Javascript, how and when to use them, as well as a fresh take on how they can be improved.

## Advantages
 * Decoupling transformations of data from the I/O sources (ie streams, arrays, any generators of values), can use push or pull model
 * Highly Composable

## People
 * Rich Hickey (clojure)
 * Juan Pedro Bolivar -- talk: "transducers from clojure to C++"
   * github arximboldi
 * Roman Liutikov -- medium article: Visualizations of transducers
   * github roman01la

## Why's it called a Transducer
[TRANS]FORM AND RE[DUCE] -> TRANSDUCE, verb
TRANSDUCERS -> nouns
transduce(transducer)

Input > [transducer] > Output
-----   ------------   ------
[]    >              >  []
{}    >              >  {}
[]    >              >  {}
Map   >              >  Set
Stack >              >  Number
ADT   >              >  ADT       // ADT == Abstract Data Type

OR other stuff:
Microphone   >              >  Display

## Humpty Dumpty
 * Trying to push humpty dumpty off the wall to try to figure out the pieces, so that you can put them back together again

## Capstone
 !
[*]     Transduce
[++]    Compose
[===]   Transducers
[----]  Reduce
[|||||] Reducers

### What is a reducer
* an N-ary fun that taeks state followed by N additional inputs and returns a new state
```
function reducer (state, ...inputs) {
    // change update, recreate, or keep state using inputs
    return state
}
```
* map / filter / reduce consume reducers
v Array Builder Reducer
```
function arrayPushMutate(arr, element) {
    arr.push(element)
    // could also do this and copy the array
    return arr
}

function arrayPush(arr, element) {
    const res = arr.slice()
    result.push(element)
    return result
}

function listPush(list, element) {
    return list.push(element)
}
```

State, Inputs > ... > State

### Reduce
Accumulate, Fold, & Compress

```
function reduce(reducer, state, iterable) {
    for (let inputs of iterable) {
        state = reducer(state, ...spread(input))
    }
    return state
}
// in action
const result = reduce((state, element) => {
    state.push(element)

    return state
}, [], [1,2,3])
```

### Transducers
```
// takes a reducer, returns another reducer
function identity(reducer) {
    return (state, ...inputs) => {
        return state;
    }
}

const transform = identity(reducer)

const s1 = []
const s2 = transform(s1, 1)
const s3 = transform(s2, 2)
const s4 = transform(s3, 3)

console.log(s4) // [] nothing, expected
```
* Can you write map and filter to be written in terms of reduce?
* what do these return?
```
function map(iteratee) {
    return reducer => {
        return (state, ...inputs) => {
            return reducer(state, iteratee(...inputs))
        }
    }
}

// ...
function filter(predicate) {
    return reducer => {
        return (state, ...inputs) => {
            return predicate(...inputs) ? reducer(state, ...inputs) : state
        }
    }
}
```
* ^ stateless transducers
* v stateful transducers
```
function take(count) {
    let iteration = 0 // <-- inner state
    return reducer => {
        if (iteration >= count) {
            return state // <-- outer state
        }

        iteration++

        return reducer(state, ...inputs)
    }
}
```

### Composition
The function pipe
```
    const f = x => x+1,
    const g => x => x/2
    const z => x => g(f(x))

    function pipe(...funcs) {
        // v incomplete
        return initial => reduce((input, func) => func(input), initial, )
    }
```

pipe(
    map(x => x+1),
    map(x => x/2)
),
reducer = (state, ...inputs) => {
    const result = state.slice()
    result.push(...inputs)
    return result
}
// this would be backwards, ie: divide first, then add
// a better model perhaps is to compose, which would do add then divide

## Transduce -- Sequence & Into
```
function transduce(transform, reducer, output, input) {
    return reduce(transform(reducer), output, input)
}

function into(transform, output, input) {
    return transduce(transform, between(output, input), output, input)
}

function sequence(transform, input) {
    return into(transform, from(input), input)
    // ^ From would just create a new output source of the same type of the input source
    // ie: if input is an array, from(input) would make an empty array
}
```

## Ex
```
const transform = compose(
    map(x => x+1),
    filter(x => x%2 ===0)
),
input = {
    alpha : 1,
    beta: 2,
    gamma: 5,
    delta: 5
}

// v note that beta is not present in any of the below because after the map (adding 1), the value is odd so it gets filtered out
const array = into(transform, [], input) // [2, 6, 6]
const object = into(transform, {}, input) // {alpha: 2, gamma: 6, delta: 6}
const map = into(transform, new Map(), input) // Map {'alpha' => 2, 'gamma' => 6, 'delta' => 6}
const set = into(transform, new Set(), input) // Set {2, 6} // Note that delta is gone, because val is dupe
```

```
const transform = compose(
    map(x => x + 1),
    filter(x => x%2 === 0)
),
input = [1,2,3,4]

const result = sequence(transform, input) // 2, 4
```

## Transducers - stateful
See take(count) of http://github.com/Ableton/atria
// wraps up the internal state of the transducer and unwraps it in the reduce function

## Functional Lenses - a means of applying functions to complex data types
https://github.com/DrBoolean/lenses
```
const adjustScore = compose (
    transd.map(x => x+5),
    transd.map(x => x/5)
)
const input = [{
    name: `john`,
    score: 23,
    items: ['hat', 'shoe']
}]
const transform = compose(
    lens('score', adjustScore),
    lens('name', map(toUpper)),
    lens('items', filter(isNotIdentical('wand'))),
    // incomplete, see: https://github.com/kgnzt/trans.d/blob/master/example/lens.js
)
```

## Performance
operations
```
map(addTwo)
filter(isEven)
map(divideByFive)
```
### in native Js:
```
const addedTwo = [8,7,14].map(addTwo)
const filtered = addedTwo.filter(isEven)
//...map
// note that there are intermediate vars
```

### transducers
// see examples earlier, you would compose together the above three
* avoids creating the intermediate arrays

### perf result
Transducers tend to be more performant because of the 


## Resources
https://github.com/kgnzt/trans.d // Lib w/ func. lens
https://github.com/kog13
