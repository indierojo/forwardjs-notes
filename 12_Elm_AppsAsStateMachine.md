## Write Applications as State Machines (Use Elm and reuse it everywhere)
Pasindu Perera (Cake?)

## Abstract
Learnings from developing a multiplayer game logic in elm as a finite state machine and exporting it as a npm module that is being used in 1. In mobile(react-native) client to play the game offline and to do optimistic updates when playing online. 2. In server(node) for scoring 3. In web client (react) as a desktop client.

## The Problem
1. Turn based real-time card game
2. Playable offline
3. Online multiplayer
4. Multiple Clients (iOS, Android, Web)
5. Reuse Logic Across Client/Server
6. Plan for change (ie, keep logic portable insofar as possible so it isn't tied to the framework) 

## Model Applications as State Machines
### Typical App
Layered, UI <-> Biz Logic / Engine <-> Perisistence

#### As State Machine
Pitch: Extract the logic out of the above into a library, and reuse it on each client + the server

IE:
ios  andr    web   bot
biz   biz    biz   biz
db     db     db    db
^ clients each have the biz logic
v they send data to the server, which also has the biz logic, uses it to validate client logic

     server
  biz logic
persistence

## FP 101
Pure Fns
 * no side effects, no mutations, deterministic
 ^ This is important for this case, since we'll be doing memoization later.
Higher Order Functions
 * A Function that takes a function as an argument
 * IE: Map, Reduce
IoC (Inversion of Control)
 * All the dependencies of a unit are passed in to it, very helpful for making pure functions
Isolate State to one place in your app.
 * Helps you track down bugs

^ All of this is key to this approach, since we are making our logic portable

## Extract App Logic as an Engine
### Isolate state / actions
ED: Think Redux...

* State: Data, arrays, etc
 ie: todos: []
 ie: todo: {done: false, text: ""}
* Actions as effects
 ie: AddTodo()
 ie: MarkAsComplete()

^ Actions are the only things that can change the state

### You can view actions as state transitions
ED: Again, this is very REDUXy
```
Action
   +     =>   Engine   =>   Next
 State                      State
```

* The state transition logic is a pure function
* Export as an NPM module
* Clients perform actions, use them for optimistic updates, tell the server what action happened
* Server validates the action, accepts/rejects back to the client
* Enables Time Travel Debugging, basically, you track each action performed, and you play that on top of the initial state

### Business Logic as a Service
* A JS module that provides an interface to compute states based on actions
* All of your business/core logic is in the transition function (ED: very much like a redux reducer)
* This function is a pure function

### Usage
* Next state can be ALWAYS be calculated by passing the current state w/ the action
* It can be done on the server/client

## Use ELM to Code the App Logic
ELM: A delightful Language for reliable webapps
* Generates JS with great perf. and no runtime exceptions

### Why Elm?
* Functional
  * Immutable
  * Pure
  * Statically typed
  * No NULL values, No undefined
* Performant
* Compiles to performant JS
* JS Interop -- (ed: I don't quite get it... apparently you can play the messages from elm in JS and from JS in Elm)
* No runtime exceptions; if the code compiles, it won't run with any runtime errors
* Exceptional Compiler support for errors

### Can you run Elm on the Backend?
* Node? Also there's an Elm Runtime, which I assume is something like babel-node
* Mostly used as a view layer (ala React)
* UI Rendering performant w/ React
  * But: Not as good libs / support as React
* But it is best suited w/ the logic

### The Code:
#### Logic/Engine Module
JSWrapper:
 * init(state)
 * fireAction(action)
 * subscribe(function(state) {
     // state
 })
 #### Elm types
  * Union Types, can use for string types like TS: type suit = heart club, etc
  * Parameterized Types
    * Crazy cool - basically you can define the 'states' (ala state machine) WITH actions in the type:
    * ^ LINK???

## Summary
* Structure app as a state machine
* Modularize the state machien to a single package
* Hydrate and de-hydrate the engine when needed
  * To run the app offline
  * To do optimistic Updates

* Write the engine/core logic in Elm
* Compile to JS & export as a module
* Use encoders / decoders to convert messages and state through ports

* Youtube Elm Vids:
  * Make Impossible states impossible yt: https://www.youtube.com/watch?v=IcgmSRJHu_8
  * Use Effects as Data yt: https://www.youtube.com/watch?v=6EdXaWfoslc