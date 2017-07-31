## The Fullstack Websocket Deep Dive
Brad Urani (ProCore) @BradUrani

## Abstract
Depending on whom you ask, a websocket is either a pipe, a channel, or a protocol. We know they allow two-way communication between a browser and server, but if you don't understand how they work, using them can be a leap of faith. Join us for a deep dive into websockets. We'll start at the browser and see how to connect, inspect and debug. Then we'll use node.js to build a websocket server using TCP sockets. Finally, we'll use a few handy Linux tools to peak into the kernel and see what's going on at the very lowest level. Along the way, we'll give concrete definitions to sometimes vague terms, like "connection" and "listening". Love cool tools? We'll explore several for debugging websockets at every layer of the stack. Whether you're just discovering websockets, or have used them for years, you'll learn something new, and discover that all it takes to use them confidently is a little understanding.

## W/O WebSockets
POST w/ longpoll on a loop

## SaaS WebSockets
Can use services like Pusher / PubNub to do this for you

## Or write it yourself!
socket.io + something like redis

## Why websockets?
* Full Duplex (two way communication)
* Performance -- save the bandwidth of the headers etc of http ajax
* Unopinionated about _what_ you send, ends up sending a Base64 encoded bytestream
* Websockets uses TCP (not UDP), so you get guaranteed packet order
###
* Great for games, chat, BG notif, streaming

## Issues
* If you lose the server, you must handle reconnect, there's a few npm packages which handle this
#### Auth
* The initial handshake uses standard HTTP security, but each message does not use that, WSS sort of does this but there are other security concerns, libraries like socket.io have some additional security features.

## Deep Dive
### The Browser
```
var websocket = new WebSocket('wss://localhost:8080'); // wss:// === secure version of ws://

websocket.onopen = (e) => {
    console.log('socket.open')
} 
websocket.onmessage = (e) => {
    console.log(e.data)
}
websocket.onclose = (e) => {
    console.log('closed')
}
websocket.onerror = (e) => {
    console.log('on no!')
    // onerror always comes w/ onclose, can just handle it there
}
```
* It isn't HTTP, but it starts w/ an HTTP Request w/ Upgrade header
* The server if it supports it, responds with a 101: Switching Protocols, and a few headers
### Chrome dev tools
* Has a ws filter in network tab, keeps track of all the frames (each message basically)
### Libraries and Subprotocols
* You can create your own protocols and use them w/ websocket
  * IE: I send via JSON mandate that messages all have these fields
* Websocket supports protocols, which are basically a message type, this gets sent w/ the message over 'ws.protocol'
* You can also use a bunch of existing protocols that folks have defined:
  * faye(has a good pub/sub one)
  * stomp - simple text
  * wamp(pub/sub && RPC)
  * socket.io - all sorts of stuff
### Server
```
import WebSocket from 'ws'

const server = new WebSocket.Server({port: 8080});

server.on('connection', (ws) => {
    ws.send('connected')

    ws.on('message', (msg) => {
        ws.send('bar')
    })

    // ws.close() to close it
})
```

## Advice, takeaways:
* Alwasy use WSS protocol
* Always use Port 433
* Increase file descriptor count
* Look at available sub protocols & libs
* Use node.js

## Why Nodejs?
* Some languages ala Ruby keep a thread open per websocket
* Node's evented I/O model just handles the threads better
