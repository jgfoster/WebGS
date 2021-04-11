! ------------------- Remove existing behavior from WebSocketSample
removeAllMethods WebSocketSample
removeAllClassMethods WebSocketSample
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
category: 'Accessing'
method: WebSocketSample
_socket

	^(SessionTemps current at: #'HttpRequest_socket') at: Processor activeProcess.
%
category: 'Accessing'
method: WebSocketSample
_socket: aSocket

	| dict process |
	dict := SessionTemps current at: #'HttpRequest_socket' ifAbsentPut: [Dictionary new].
	dict copy keysAndValuesDo: [:eachProcess :eachSocket |
		eachProcess _isTerminated ifTrue: [
			eachSocket close.
			dict removeKey: eachProcess.
		].
	].
	process := Processor activeProcess.
	(dict at: process otherwise: nil) ifNotNil: [:socket | dict removeKey: process].
	aSocket ifNotNil: [dict at: process put: aSocket].
%
set compile_env: 0
category: 'base'
method: WebSocketSample
responseForRequest: anHttpRequest
	"This is called from the required class-side method with the same name
	and simply populates the local instance variables."

	| headers connection upgrade |
	headers := anHttpRequest headers.
	connection := headers at: 'Connection' ifAbsent: [''].
	upgrade := headers at: 'Upgrade' ifAbsent: [''].
	self log: #'debug' string: 'Connection: ' , connection , '; Upgrade: ' , upgrade.
	(connection = 'Upgrade'  and: [upgrade = 'websocket']) ifTrue: [
		request := anHttpRequest.
		^self websocket
	].
	^super responseForRequest: anHttpRequest
%
category: 'base'
method: WebSocketSample
secureResponseFor: aKey
	"If the Key is 'dGhlIHNhbXBsZSBub25jZQ==', the response is 's3pPLMBiTxaQ9kYGzzhZRbK+xOo='."

	| bytes key sha1 stream |
	key := aKey , '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'.
	sha1 := key asSha1String.
	stream := ReadStream on: sha1.
	bytes := ByteArray new.
	[stream atEnd not] whileTrue: [
		bytes add: ('16r' , stream next asString , stream next asString) asNumber.
	].
	^bytes asBase64String
%
category: 'base'
method: WebSocketSample
upgradeToWebsocket

	| count crlf key socket version |
	version := request headers at: 'Sec-WebSocket-Version' ifAbsent: ['0'].
	version asNumber < 13 ifTrue: [
		self error: 'WebSocketSample requires at least version 13!'.
	].
	crlf := Character cr asString , Character lf asString.
	key := request headers at: 'Sec-WebSocket-Key' ifAbsent: [''].
	key := self secureResponseFor: key.
	response := 'HTTP/1.1 101 Switching Protocols' , crlf , 
		'Upgrade: websocket' , crlf , 
		'Connection: Upgrade' , crlf ,
		'Sec-WebSocket-Accept: ' , key , crlf , crlf.
	self log: #'debug' string: 'Response: ' , crlf , response.
	socket := self _socket.
	count := socket write: response.
	self log: #'debug' string: 'Sent ' , count printString , ' characters'.
%
category: 'base'
method: WebSocketSample
websocket

	self upgradeToWebsocket.
	[self _socket isConnected] whileTrue: [
		self websocketRead.
	].
	self halt.
%
category: 'base'
method: WebSocketSample
websocketRead

	| frame socket |
	socket := self _socket.
	(socket readWillNotBlockWithin: self readTimeoutMS) ifFalse: [
		^self onIdle
	].
	frame := WebSocketDataFrame fromSocket: socket.
	frame isPing ifTrue: [
		WebSocketDataFrame sendPongData: frame data onSocket: socket.
		^self
	].
	frame isText ifTrue: [
		^self onText: frame data
	].
	frame isDisconnect ifTrue: [
		WebSocketDataFrame sendPongData: frame data onSocket: socket.
		socket close.
		self _socket: nil.
		Processor activeProcess terminate.	"There isn't really anything to return!"
	].
	self error: 'Unrecognized frame'.
%
set compile_env: 0
category: 'default behavior'
method: WebSocketSample
onIdle

	WebSocketDataFrame sendText: 'Hello from WebSocketSample at ' , Time now printString onSocket: self _socket.
%
category: 'default behavior'
method: WebSocketSample
onText: bytes

	| result |
	[
		result := bytes decodeFromUTF8ToUnicode evaluate printString.
	] on: Error do: [:ex | 
		result := ex description.
	].
	WebSocketDataFrame sendText: result onSocket: self _socket.
%
category: 'default behavior'
method: WebSocketSample
readTimeoutMS

	^10000
%
