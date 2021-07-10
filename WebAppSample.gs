! ------------------- Remove existing behavior from WebAppSample
removeAllMethods WebAppSample
removeAllClassMethods WebAppSample
! ------------------- Class methods for WebAppSample
set compile_env: 0
category: 'required'
classmethod: WebAppSample
workerCount
	"Do everything in one Gem"
	^0
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
category: 'WebSockets'
method: WebAppSample
wsReadTimeoutMS

	^10000
%
