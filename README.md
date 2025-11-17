# WebGS
WebGS is a framework for building the back-end for modern web applications in GemStone/S 64 Bit Smalltalk. It provides a basic server and can respond to HTTP requests with Smalltalk-generated strings. While these strings can be HTML, in today's environment it is more common that they will be JSON.

## Install
* Copy `sample-setEnv.sh` to `setEnv.sh` and edit to set `GEMSTONE` to a product tree.
* Copy `sample-.topazini` to `.topazini` and edit to properly describe a running GemStone/S system.
* Optional: Run `setUnicodeMode.sh` to use the modern character comparison mode (recommended if this is a new install).
* Run `install.sh` to install WebGS into your GemStone/S system.

## Use
The typical use is to subclass `WebApp` and override appropriate methods. To see how this works, take a look at `Sample.gs`. You can run the application from a Topaz prompt (see `runSyncSample.sh`) or from an IDE (such as [Jade](https://github.com/jgfoster/jade)) using `Sample runHttp`. If you have breakpoints or halts in your code, then the server will stop and you can debug the code (or just step through it to see how it works). To test the server, access it from a web browser (`http://localhost:8888`) or from a Linux or macOS shell:

```shell
curl http://localhost:8888/stone.gs
curl --header "Content-Type: application/json" \
   --request POST \
   --data '{"x":3,"y":5}' \
   http://localhost:8888/add.gs \
   && echo
curl http://localhost:8888/README.md
```

Of course, simple GET requests can be submitted from a browser and [Postman](https://www.postman.com/) is a great tool for working with web servers.

## WebSockets
`Sample.gs` also has a *demo* of WebSockets. Please keep in mind that *all* your WebSocket connections on this host/port will be sharing the same gem and each connection will stay alive until it is dropped by the client. This may affect performance (depending on how much activity each connection requires) and it may affect behavior (think very carefully about changes to persistent objects and transactions!).

## Tests
WebGS includes a set of tests written in [Dart](https://dart.dev) that can be run after you start a server. The tests also provides an example of how to interact with WebGS from a client application.

The speed test measures performance. On an Apple M4 the sync server answers about 1800 (trivial) AJAX requests per second and about 100 (small) file requests per second. 
