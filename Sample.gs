! ------------------- Remove existing behavior from Sample
removeAllMethods Sample
removeAllClassMethods Sample
! ------------------- Class methods for Sample
set compile_env: 0
category: 'other'
classmethod: Sample
runDistributedHttps
"
	Sample runDistributedHttps.
"
	HttpsListener new
		listenBacklog: 100;
		port: 8888;
		webApp: (HttpLoadBalancer for: self gemCount: 2);
		run.
%
category: 'other'
classmethod: Sample
runHttp
"
	Sample runHttp.
"
	HttpListener new
		listenBacklog: 100;
		port: 8888;
		webApp: self;
		run.
%
category: 'other'
classmethod: Sample
runHttps
"
	Sample runHttps.
"
	HttpsListener new
		listenBacklog: 100;
		port: 8888;
		webApp: self;
		run.
%
set compile_env: 0
category: 'required'
classmethod: Sample
htdocs
	"/path/to/static/files"

	| string |
	string := System performOnServer: 'pwd'.
	string := string copyFrom: 1 to: string size - 1.		"remove trailing \n"
	^string
%
! ------------------- Instance methods for Sample
category: 'override'
method: Sample
index

	response redirectTo: 'Sample.html'.
%
set compile_env: 0
category: 'REST API'
method: Sample
add_gs: args

	| x y |
	x := args at: 'x'.
	y := args at: 'y'.
	^Dictionary new
		at: 'sum' put: x + y;
		yourself.
%
category: 'REST API'
method: Sample
echo_gs: args

	"UserGlobals at: #'James' put: args.
	System commit."
	^args
%
category: 'REST API'
method: Sample
stone_gs

	^System stoneConfigurationReport
%
category: 'REST API'
method: Sample
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
method: Sample
webSocket_gs

	request isWebSocketUpgrade ifFalse: [self error: 'Expected a WebSocket protocol!'].
	Log instance log: #'debug' string: 'Sample>>webSocket_gs'.
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
			Log instance log: #'debug' string: 'Sample>>webSocket_gs - ' , aByteArray printString.
		]
		withTextDo: [:unicode |
			Log instance log: #'debug' string: 'Sample>>webSocket_gs - ' , unicode printString.
			unicode asString = 'foo' ifTrue: [
				WebSocketDataFrame sendText: 'bar' onSocket: socket.
			].
		].
%
