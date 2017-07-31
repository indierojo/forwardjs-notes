## ClojureScript in your Pocket
Speakers: Dom Kiva-Meyer & Lily M. Goh (Paren.com)

## Abstract
In this talk we’ll explore how we replaced a buggy iOS app and an outsourced and abandoned Android app with a single React Native and ClojureScript app.

React Native allowed us to write a single codebase; GraphQL allowed us to eliminate the data-syncing issues that plagued the iOS app; ClojureScript let us move fast and recreate, in a matter of months, what took almost two years to build in Swift and Java.

We’ll discuss the obstacles that we encountered, how we circumvented them, and where we think the mobile industry will move. This is an exciting time to be (or become!) a mobile app developer.

## Background
Client came to them, they had never done mobile work before, but had done extensive clojurescript & react work

## Goals
* Move fast to meet tight deadline
  * Therefore, use familiar tech
  * Also, went with react-native for shared codebase
* App must be fast
* Needs to last

## Stack
* Web:
   * clj.js + react
* ios: Swift
* Android: cljs + react
* middleware: rest(ish) + graphql hybrid over time, eventually just GQL
* Server: Cljscript
## Native vs. Webview vs. ???
 * Native:
   * Barrier to entry
   * not cross platform
 * WEbview (cordova): missing fn-ality
## ReactNative is a hybrid of the above
 * Compiles to Native UI code
 * VERY similar to react, just code against <View>s instead of <Div>s
 * allowed
   * fast iteration
   * familiar pattern
   * x-platform
   * fast
   * strong ecosystem
## Clojurescript?
* a dialect of clojure
  * functional, dynamically typed
* compiles to javascript
## Also used Expo
 * Expo is a utility library for react native, does a lot of things
 * Adds addt'l APIs for common functions, ie: push notifications, etc
 * GUI + CLI for dev which eliminates the need for xcode & android studio
   * also URL for sharing the output of the app
 * Instant deployment
 * In a nutshell; Familiarity made it feel more like web development than native development
## GraphQL
 * Query lang. for APIs, alternative to REST
 * Define a Schema, which is a query + mutations
 * User can create a custom query against the schema
 * User can call the mutations
 * Makes a lot of sense specifically for mobile since the custom queries send ONLY the data requested as opposed to REST which either 'over-returns' or requires many custom endpoints.
## Putting it all together
 * This combination of technology isn't used all together by many companies...
## Lessons learned
#### ReactNative Gotchas
* A bit of cross learning w/ REACT + React-native
* BUT: there are enough differences that there is some uncertainty around std libs you may rely on
    * ie: desktop(hover/click) != mobile(press/swipe)
    * ie: desktop(mouse cursor is accurate) != mobile(fingertip is rough)
* Styling in RN is very different than CSS
    * Styles don't cascade.
    * No global styling, (stuff like bootstrap can't exist)
    ? In practice, this ends up being pretty similar to something like Styled Components
    * A lot easier to position things
* Styles and programs are much more tightly coupled in RN than React
    * Totally fine to do React w/ no styles
    * In React Native, this is often not the case
#### Expected RN to be the same on Android && iOS
* In practice, the same code often has a lot of areas where it just doesn't work the same
* worse than say, chrome vs. firefox
#### ReactNative isnt' complete yet
* You can 'hack' this in via various mechanisms if you know how
* Also there are some tools which help 'bridge' the gap
    * These are very common when using RN
    * EXCEPT: they don't play well w/ Expo (???because of how it uses futures???)
    * Expo has apparently fixed a few of these
* They ended up having to build/'eject' the project and then make manual changes in XCode/Android Studio
* Keep this in mind if going w/ Expo
#### React Native + CLJS
#### GraphQL
* They hadn't used it w/ CLJS or ReactNative before
* Tooling: Pretty darn good esp. for a young tech, they used:
  * GraphQL Voyager
  * GraphiQL
* Client:
  * Mobile clients have compute, memory and network constraints
  * GQL helps with memory and network contraints due to batching, no-overfetching
  * GQL also dramatically simplifies the complexity of client -> server communication
* Server:
  * In general a GQL server will be more complex than a REST server
    * Esp. in the CRUD case
  * The saved complexity on the client-side is essentially now the server's responsibility
    * From a mobile perspective, this is still great, b/c the client is constrained, the server is.. less so
#### Generally
 * New techs -- led to MANY growing pains
 * That having been said, given that they were web devs w/ little to no mobile experience, they think everything worked really well