! ------------------- Remove existing behavior from WebAppSample
removeAllMethods WebAppSample
removeAllClassMethods WebAppSample
! ------------------- Class methods for WebAppSample
set compile_env: 0
category: 'other'
classmethod: WebAppSample
run
"
	WebAppSample run.
"
	HttpsListener new
		listenBacklog: 100;
		port: 8888;
		webApp: self;
		run.
%
category: 'other'
classmethod: WebAppSample
runDistributed
"
	WebAppSample runDistributed.
"
	HttpsListener new
		listenBacklog: 100;
		port: 8888;
		webApp: (HttpLoadBalancer for: self gemCount: 8);
		run.
%
set compile_env: 0
! ------------------- Instance methods for WebAppSample
set compile_env: 0
category: 'REST API'
method: WebAppSample
add_gs: args

	| x y |
	x := args at: 'x'.
	y := args at: 'y'.
	^Dictionary new
		at: 'sum' put: x + y;
		yourself.
%
category: 'REST API'
method: WebAppSample
echo_gs: args

	"UserGlobals at: #'James' put: args.
	System commit."
	^args
%
category: 'REST API'
method: WebAppSample
stone_gs

	^System stoneConfigurationReport
%
set compile_env: 0
category: 'WebSockets'
method: WebAppSample
wsOnIdle

	WebSocketDataFrame sendText: 'Hello from WebSocketSample at ' , Time now printString onSocket: socket.
%
category: 'WebSockets'
method: WebAppSample
wsOnText: bytes

	| result |
	[
		result := bytes decodeFromUTF8ToUnicode evaluate printString.
	] on: Error do: [:ex |
		result := ex description.
	].
	WebSocketDataFrame sendText: result onSocket: socket.
%
