# WebGS
WebGS is a framework for building web applications in GemStone/S 64 Bit Smalltalk.

## Install
One way to install WebGS is to use Topaz. Make sure that $GEMSTONE is set for your environment and that $GEMSTONE/bin is in your path. You can use .topazini and install.sh as models for your setup.

Another way to install WebGS is from Jade. Open JSON.gs in Jade (or copy its contents to a workspace). Select all the text, and from the context menu (right click), select 'File In'. Do the same for WebGS.gs then commit (from the toolbar or menu). 

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

