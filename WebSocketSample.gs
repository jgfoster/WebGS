! ------------------- Remove existing behavior from WebSocketSample
expectvalue /Metaclass3       
doit
WebSocketSample removeAllMethods.
WebSocketSample class removeAllMethods.
%
! ------------------- Class methods for WebSocketSample
set compile_env: 0
category: 'required'
classmethod: WebSocketSample
workerCount
	"Do everything in one Gem"
	^0
%
set compile_env: 0
category: 'startup'
classmethod: WebSocketSample
httpServerClass

	^HttpsServer
%
! ------------------- Instance methods for WebSocketSample
set compile_env: 0
category: 'WebSockets Overrides'
method: WebSocketSample
wsOnIdle

	WebSocketDataFrame sendText: 'Hello from WebSocketSample at ' , Time now printString onSocket: self _socket.
%
category: 'WebSockets Overrides'
method: WebSocketSample
wsOnText: bytes

	| result |
	[
		result := bytes decodeFromUTF8ToUnicode evaluate printString.
	] on: Error do: [:ex |
		result := ex description.
	].
	WebSocketDataFrame sendText: result onSocket: self _socket.
%
category: 'WebSockets Overrides'
method: WebSocketSample
wsReadTimeoutMS

	^10000
%
