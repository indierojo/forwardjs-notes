## gRPC -- As simple as func()
Speaker: Tejas Monaher (Segment)

## Abstract
PUT or PATCH? 200 or 201? HTTP or WebSockets? Today, protocols requiring enormous tribal knowledge rule the web when we really just care about calling remote functions. Introducing GRPC, an RPC framework from Google built on top of HTTP/2 and Protobuf. Define your API as plain old functions and generate idiomatic clients for a variety of platforms. In this talk, we’ll learn how to move faster and break fewer things with GRPC.

## How do apps communicate now?
* REST - send a representation of the app state between the client and the server
    * uses http verbs to communicate different types of state changes, ie create update delete
    * very good at CRUD
* What is REST good for?
    * humman readable
    * guides folks in a sane direction
* Where does REST fall short?
    * not great for tooling
    * unopinionated in a lot of important areas: login, streaming, paging, server push, etc
    * Not a standard, it is a guideline
    * This is important because you can't really tell a computer how to automate a guideline.

## What does an API need?
* routes mapped to fn(req, res)
* read / validate req, do some work, write back a response

## So what's gRPC?
* gRPC: google remote procedure calls, based on the internal google tool: "stubby"
* Calls a remote system's function w/o considering the impl. details

## How does gRPC work?
* Requires an Interface definition langauage, most commonly ProtoBufs:
```
service UserService {
rpc Create(CreateRequest) returns (User) {}
...
}

message User (
string id = 1
string name = 2
)
```
* this IDL is used to generate code in other languages.
    * this is the grpc generation api
* You can then consume the defined functions by requiring that package and calling the function.
* Supports lots of languages, IE you can use the same Proto to generate C# AND Java code.

## Details
* gRPC uses HTTP/2 multiplexing for the transport layer
    * (do more than one req. over the same TCP connection)
* gRPC uses Protobufs as the payload
    * binary data: not human-readable, but much smaller payload
    * protobufs require a known schema in order to parse the protobuf (perf optimization)
    * can lead to problems w/ versioning apis
    * Strict schema w/ robust type system & data structures, the protocol enforces this, client can't parse a string as an INT
    * Ditto optional
    * Strongly typed nature leads to very good generated code in typed languages.
    * GO
    * TypeScript in the works
* So how do you handle changing APIs if the schema must be known
    * This is why there are strict ids on the messages (above)

## Versioning Example:
Problem: Versioning a user, go from just id and name to id, firstName, lastName

#### Before
```
message User {
    string id = 1;
    string name = 2;
    int64 score = 3;
}
```

#### Naive Solution
```
message User {
    string id = 1;
    string firstName = 2;
    string lastName = 3;
    int64 score = 4;
}
```

 * Problem with this: Never change the IDs -- note that score used to be 3, and an int64, but now is a string, this will break the old api

#### Better Solution
```
message User {
    string id = 1;
    // string name = 2;
    int64 score = 3;
    string firstName = 4;
    string lastName = 5;
}
```
 * YES: we no longer use name; we comment it out; and id 2 is skipped, note that score remains as id 3, new fields are 4 & 5

## gRPC supports many paradigms
* Unary RPC - Basic call, like HTTP, single call from client to server
* Bidirectional streaming
    * client -> server
    * server -> client
    * stream both ways (ala websockets)

## gRPC focuses on generating idiomatic clients
* ie: node generator will generate nodebacks
* ie: go generates a stream

## gRPC has middleware (called interceptors)
* hooks for before/after requests
* middleware can be used on client and/or server-side

## gRPC problems:
 * Load balancing isn't great, since most load balancers are tuned for http/https round-robins
   * client-side load balancing is a way to go, client knows all of the rpc servers and stripes requests off of them
     * not great, since you have to do a lot of work, keep track of all the servers, new servers etc.
   * Envoy is a possilbe future solution -- Lyft load balancer which knows about gRPC and measures gRPC metrics pools etc.
     * no great support on AWS atm
 * Go impl is not so great
   * Performance issues
   * hard to read code
   * WIP
 * gRPC web is still WIP, browser clients are rough
 * unstable API
 * relatively small community

## Areas to look into:
 * gRPC + Typescript
 * debug/trace tools (zipkin, wireshark, devtools, etc)
 * Infrastructure interop
   * load balancing on existing solutions (nginx)
   * multiple transports side by side, (ie: gRPC/HTTP/JSON)