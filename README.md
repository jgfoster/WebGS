# WebGS
WebGS is a framework for building the back-end for modern web applications in GemStone/S 64 Bit Smalltalk. It provides a basic server and can respond to HTTP requests with Smalltalk-generated strings. While these strings can be HTML, in today's environment it is more common that they will be JSON.

## Install
* Set environment variables for your GemStone system.
  * `export GEMSTONE=/path/to/gemstone`
  * `export PATH=$GEMSTONE/bin`
* Create `.topazini` in this directory or in your home directory.
  * `set user DataCurator pass swordfish gems gs64stone`
* Optional: Run `setUnicodeMode.sh` to use the modern character comparison mode (recommended if this is a new install).
* Run `install.sh` to install WebGS into your GemStone/S system.

## Use
The typical use is to subclass `WebApp` and override appropriate methods. To see how this works, take a look at `Sample.gs`. You can run the application from a Topaz prompt (see `sample.sh`) or from an IDE (such as [Jade](https://github.com/jgfoster/jade)) using `Sample runHttp`. If you have breakpoints, halts, or errors in your code, then the server will stop and you can debug the code (or just step through it to see how it works). To test the server, access it from a web browser (`http://localhost:8888`) or from a Linux or macOS shell:

```shell
curl http://localhost:8888/stone.gs
curl --header "Content-Type: application/json" \
   --request POST \
   --data '{"x":3,"y":5}' \
   http://localhost:8888/add.gs \
   && echo
curl http://localhost:8888/index.html
```

Of course, simple GET requests can be submitted from a browser and [Postman](https://www.postman.com/) is a great tool for working with web servers.

## WebSockets
`Sample.gs` also has a *demo* of WebSockets. Please keep in mind that *all* your WebSocket connections on this host/port will be sharing the same gem and each connection will stay alive until it is dropped by the client. This may affect performance (depending on how much activity each connection requires) and it may affect behavior (think very carefully about changes to persistent objects and transactions!).

## Tests
WebGS includes a set of tests written in [Dart](https://dart.dev).
* `./runGCI.sh # in one shell`
* `dart tests/jade_server_test.dart # in another shell`
The tests also provides an example of how to interact with WebGS from a client application.

## Performance
Recent tests have been run with [Locust](https://locust.io) (see the `./locust` directory). On a 3.7.4.3 GemStone server (with round-trip `ping` time of 15ms) using a single gem (no load balancing) the following were observed for the `/add.gs?x=1&y=2` request:

| Protocol  | Median (ms) | 95%ile (ms) | 99%ile (ms) | Average (ms) | Min (ms) | Max (ms) |  RPS |
|-----------|------------:|------------:|------------:|-------------:|---------:|---------:|-----:|
| **http**  |          32 |          53 |          68 |           35 |        2 |     1051 | 2900 |
| **https** |         190 |         250 |         280 |          191 |      115 |      322 |   25 |

This demonstrated a serious performance problem with HTTPS. This has been addressed in [3.7.5](https://downloads.gemtalksystems.com/docs/GemStone64/3.7.x/GS64-ReleaseNotes-3.7.5/2-BugFixes.htm#pgfId-1971160) (watch this site for an update to the the timings!).

Note that for trivial operations, the sync server is faster (no load balancing overhead), but for operations that take non-trivial CPU time, the async server shows significant benefits.
