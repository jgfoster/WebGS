# WebGS
WebGS is a framework for building web applications in GemStone/S 64 Bit Smalltalk.

## Install
One way to install WebGS is to use Topaz. Make sure that $GEMSTONE is set for your environment and that $GEMSTONE/bin is in your path. You can use .topazini and install.sh as models for your setup.

Another way to install WebGS is from Jade. Open WebGS.gs in Jade (or copy its contents to a workspace). Select all the text, and from the context menu (right click), select 'File In'. Then commit (from the toolbar or menu). (On an older version of GemStone you may need to install JSON.gs first.)

## Use
The typical use is to subclass WebApp and override appropriate methods.

## RestSample
If you are building a back-end application that accepts and returns JSON, then RestSample is a good place to start. Once the code is installed, you can run the application from a Topaz prompt or from a Jade workspace using `RestSample run`. If you have breakpoints or halts in your code, then the server will stop and you can debug the code (or just step through it to see how it works). To test the server, access it from a Linux shell:

```
curl http://localhost:8888/stone.gs
curl --header "Content-Type: application/json" \
   --request POST \
   --data '{"x":3,"y":5}' \
   http://localhost:8888/add.gs \
   && echo
```

## WebSocketSample
If you are building a back-end application that uses WebSockets, then the WebSocketSample is for you! Once the code is installed, you can run the application from a Topaz prompt or from a Jade workspace using `WebSocketSample run`. To test the server open [https://www.websocket.org/echo.html](https://www.websocket.org/echo.html), change the location to the machine running GemStone (e.g., [wss://localhost:8888/](wss://localhost:8888/)) and click the "Connect" button. From there you can see in the "Log" that the server sends a message every ten seconds. Also, you can enter a Smalltalk expression in the "Message" field and send it to be evaluated on the server (note that this is *not secure*!).

You can start your implementation by copying `WebSocketSample` and replacing `onIdle`, `onText:`, and `readTimeoutMS`. Since each connection will be handled by a new instance of your class, you can add instance variables that will be connection-specific.

Please keep in mind that *all* your WebSocket connections on this host/port will be sharing the same gem and the connections will stay alive until they are dropped by the client. (While the current implementation will respond to a ping, it does not initiate a ping and disconnect clients who fail to respond.) This may affect performance (depending on how much activity each connection requires) and it may affect behavior (think very carefully about commits and aborts!).
