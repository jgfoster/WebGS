! ------------------- Remove existing behavior from WebAppSample
removeAllMethods WebAppSample
removeAllClassMethods WebAppSample
! ------------------- Class methods for WebAppSample
set compile_env: 0
category: 'other'
classmethod: WebAppSample
runDistributedHttps
"
	WebAppSample runDistributedHttps.
"
	HttpsListener new
		listenBacklog: 100;
		port: 8888;
		webApp: (HttpLoadBalancer for: self gemCount: 2);
		run.
%
category: 'other'
classmethod: WebAppSample
runHttp
"
	WebAppSample runHttp.
"
	HttpListener new
		listenBacklog: 100;
		port: 8888;
		webApp: self;
		run.
%
category: 'other'
classmethod: WebAppSample
runHttps
"
	WebAppSample runHttps.
"
	HttpsListener new
		listenBacklog: 100;
		port: 8888;
		webApp: self;
		run.
%
set compile_env: 0
category: 'required'
classmethod: WebAppSample
htdocs
	"/path/to/static/files"

	| string |
	string := System performOnServer: 'echo $GEMSTONE'.
	string := string copyFrom: 1 to: string size - 1.		"remove trailing \n"
	^string
%
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
category: 'REST API'
method: WebAppSample
uploadFile_gs

	| dict headers part pieces size string |
	dict := Dictionary new.
	part := request upToNextPartAsUnicode.	"should be an empty string"
	2 timesRepeat: [
		headers := request nextPartHeaders.		"should be a Dictionary"
		string := headers at: (Unicode7 withAll: 'content-disposition').
		pieces := string subStrings: $;.
		string := ((pieces at: 3) subStrings: $=) at: 2.
		string := string copyFrom: 2 to: string size - 1.
		part := request upToNextPartAsUnicode.	"should be file contents"
		size := part size.
		dict at: string put: size.
	].
	^dict
%
set compile_env: 0
category: 'WebSockets'
method: WebAppSample
webSocket_gs

	request isWebSocketUpgrade ifFalse: [self error: 'Expected a WebSocket protocol!'].
	Log instance log: #'debug' string: 'WebAppSample>>webSocket_gs'.
	"We can send arbitrary data on the socket"
	[
		[
			(Delay forSeconds: 1) wait.
			socket isConnected.
		] whileTrue: [
			WebSocketDataFrame sendText: 'Hello from WebSocketSample at ' , Time now printString onSocket: socket.
		].
	] fork.
	"We can receive arbitrary data on the socket.
	The following never returns but quietly terminates when the other side closes the connection"
	self 
		wsWithBinaryDo: [:aByteArray | 
			Log instance log: #'debug' string: 'WebAppSample>>webSocket_gs - ' , aByteArray printString.
		]
		withTextDo: [:unicode |
			Log instance log: #'debug' string: 'WebAppSample>>webSocket_gs - ' , unicode printString.
			unicode asString = 'foo' ifTrue: [
				WebSocketDataFrame sendText: 'bar' onSocket: socket.
			].
		].
%
