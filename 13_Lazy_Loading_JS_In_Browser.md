## Lazy Loading JS Modules in the Browser
Tiago Garcia (Avenue Code, Macys) -> tiagorg.com

## Abstract
This talk is about loading code during page load time vs lazy loading, then how to load JS modules both synchronously (during page load) and asynchronously (lazy-load) using System.js over Babel, as well as how to used Webpack 2 to bundle your app and resolve dependencies.

What will the audience learn: - The fundamentals on when to load your modules (page load time vs lazy loading) for a most optimized page performance - The 3 main module systems in JavaScript: AMD, CommonJS and ES2015 modules - The ES2015 Module Loader spec and System.js - Importing modules synchronously and asynchronously - Webpack 2 as a dependency management system

## Part 1 - Lazy Load for Dummies
### SPA for performance?
YES
* server-side to SPA improved perf
* Requests could return JSON instead of HTML -> smaller payloads
* render a new view is cheaper than a page reload
* Don't have to go to the server for all requests
BUT NO
* May have to pull down the full payload for the user who only uses 1 page
* State can get out of sync

### Lazy Loading 101
1. Imagine a (server-side) ecommerce site, has 5 pages: home, browse for products, view a product, add to cart, checkout
  * Each page has 300k HTML + 100k JS 
  * The complete flow will download
    * 400kb / page
    * 2MB total all the way through the checkout flow
2. Now imagine the same 5 pages, as a SPA
  * 1 actual page + 4 views
  * First page (home) -> 300k HTML + 100k JS
  * Each of the views now are 50KB JSON + 150k JS
  * Complete flow will download
    * 400kb / page
    * 200kb for each of the other 4 views
    * 1.2MB total
  * But: the first load still has to load all of the rest of those pages
3. Now imagine we lazy load:
  * first page only downloads the 400kb for the homepage
  * we then load the rest of the pages lazily when they click the link, deferring that 200kb until then

#### What is lazy loading
 * A design pattern for deferring the initialization of a resource until the point at which it is needed
 * Used to imporve efficiency when a significant amount of the resources aren't needed up front
 * targetted to increase performance and save on memory and CPU
 * Martin Fowler pattern, see Lazy Load on martinfowler.com, part of the EAA patterns, years old

### Do I need it?
 * Above the fold is the most important part, if the user doesn't buy that, the rest doesn't matter
    * IE: you could lazy load the reviews of a product
 * So, if you can optimize the load of the fold, you'll get better conversion
 * The browser tries to optimize 'above fold' in a critical rendering path.
 * ::: DON'T: lazy load above the fold
 * ::: DO if: feel free to do so if: you have a chunk of code or library that is below the fold or only shows up after an event (ie, button click) / upon some condition
 * ::: DON'T if: do it if the user may end up offline, etc...
 * ::: DON'T for: Web Based mobile app, IE: PWA

### How-to setup lazy loading
In a nutshell:
 * Don't include all of your scripts in the page at onces
 * Instead you have a script which imports the other scripts
 * For ES6, you may have to move your imports / requires to other places, they'll run in order.
 * Carefully decide what condition will cause the page to load
   * IE: below the fold
   * On button push
   * Network Call
   * Conditionally
   * On a Timer
   * Using JS deferred execution

#### System.JS + Babel
#### Webpack2
 * Not limited to JS, Webpack can lazy load images, css, and fonts as well.

## Part 2 - Hands on
### Modules
 * Overview of modules, think ES6 modules
 * IIFE

### Module Loaders
Think webpack, also, System.JS, Common.JS, they help you manage the ORDER deps are loaded. So that if A depends on B, it ensures B loads first.

### Common.JS - how to lazy load
 * Use Webpack's require.ensure:
```
require.ensure([/* list of dependencies */], function(require) {
    var dog = require('./dog')
    // some code that uses dog
})
```

### What about ES6 Modules?
* Browsers don't quite have them natively yet, they will soon
* Until then, you need to use something like system.js, Typescript, or Babel + Webpack

### System.JS
* A module loader which suppports a lot of types of modules (amd, umd, es, global scripts)
* does lazy loading via promises
* Can chain / combine loading via Promise.all(...)
* V2 ships with support for the dynamic import operator

### Dynamic Import operator
```
import notLazy from 'module'
^ will load when the file loads

if (blah) {
    // The next line starts loading when it is called, and will call the then function when loaded
    import('dog')
    .then(dog => {
        // stuff that uses dog
    })
    .catch(err => {/* some error */})
}
```

### Webpack 2
* Module bundler
* V2+ has native ES module + System.js support
* Supports lots of module types, transpilation
* bundles, supports lazy load
* Tree shakes (kind of)