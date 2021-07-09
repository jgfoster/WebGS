! ------------------- Remove existing behavior from WebSocketDataFrame
removeAllMethods WebSocketDataFrame
removeAllClassMethods WebSocketDataFrame
! ------------------- Class methods for WebSocketDataFrame
set compile_env: 0
category: 'other'
classmethod: WebSocketDataFrame
fromSocket: aSocket

	^self basicNew
		initializeFromSocket: aSocket;
		yourself
%
category: 'other'
classmethod: WebSocketDataFrame
new

	self error: 'Use other constructors'.
%
category: 'other'
classmethod: WebSocketDataFrame
sendPongData: data onSocket: aSocket

	self basicNew sendPongData: data onSocket: aSocket
%
category: 'other'
classmethod: WebSocketDataFrame
sendText: data onSocket: aSocket

	self basicNew sendText: data onSocket: aSocket
%
! ------------------- Instance methods for WebSocketDataFrame
set compile_env: 0
category: 'accessors'
method: WebSocketDataFrame
data

	^data
%
set compile_env: 0
category: 'other'
method: WebSocketDataFrame
initializeFromSocket: aSocket
	"fin rsv1 rsv2 rsv3 opcode mask data"

	| byte bytes count hasMask mask payloadLen |
	bytes := ByteArray new: 4.
	count := aSocket read: 2 into: bytes.
	count < 2 ifTrue: [self error: 'Invalid response from client!'].
	byte := bytes at: 1.
	fin 	:= (byte bitAnd: 2r10000000) ~= 0.
	rsv1 	:= (byte bitAnd: 2r01000000) ~= 0.
	rsv2 	:= (byte bitAnd: 2r00100000) ~= 0.
	rsv3 	:= (byte bitAnd: 2r00010000) ~= 0.
	opcode := byte bitAnd: 2r00001111.
	byte := bytes at: 2.
	hasMask := (byte bitAnd: 2r10000000) ~= 0.
	hasMask ifFalse: [self error: 'Invalid response from client!'].
	payloadLen := byte bitAnd: 2r01111111.
	payloadLen == 126 ifTrue: [
		count := aSocket read: 2 into: bytes.
		count ~= 2 ifTrue: [self error: 'Invalid response from client!'].
		payloadLen := (bytes at: 1) * 256 + (bytes at: 2).
	] ifFalse: [
		payloadLen == 127 ifTrue: [
			count := aSocket read: 4 into: bytes.
			count ~= 4 ifTrue: [self error: 'Invalid response from client!'].
			payloadLen := (bytes at: 1) * 256 + (bytes at: 2) * 256 + (bytes at: 3) * 256 + (bytes at: 4).
		].
	].
	mask := ByteArray new: 4.
	count := aSocket read: 4 into: mask.
	count ~= 4 ifTrue: [self error: 'Invalid response from client!'].
	bytes := ByteArray new: payloadLen.
	count := payloadLen == 0 ifTrue: [0] ifFalse: [aSocket read: payloadLen into: bytes].
	count ~= payloadLen ifTrue: [self error: 'Invalid response from client!'].
	1 to: count do: [:i | 
		bytes at: i put: ((bytes at: i) bitXor: (mask at: i - 1 \\ 4 + 1)).
	].
	data := bytes decodeFromUTF8.
%
category: 'other'
method: WebSocketDataFrame
sendBinary: bytes onSocket: aSocket

	self
		sendOpcode: 16r2
		data: bytes 
		onSocket: aSocket
%
category: 'other'
method: WebSocketDataFrame
sendDisconnect: bytes onSocket: aSocket

	self
		sendOpcode: 16r8
		data: bytes 
		onSocket: aSocket
%
category: 'other'
method: WebSocketDataFrame
sendOpcode: type data: bytes onSocket: aSocket

	| count |
	bytes size < 126 ifTrue: [
		data := (ByteArray new: 2) , bytes.
		data 
			at: 1 put: 2r10000000 + type;
			at: 2 put: bytes size;
			yourself.
	] ifFalse: [
		bytes size < 16r10000 ifTrue: [
			data := (ByteArray new: 4) , bytes.
			data 
				at: 1 put: 2r10000000 + 16r1;
				at: 2 put: 126;
				unsigned16At: 3 put: bytes size;
				yourself.
		] ifFalse: [
			data := (ByteArray new: 8) , bytes.
			data 
				at: 1 put: 2r10000000 + 16r1;
				at: 2 put: 127;
				unsigned32At: 3 put: bytes size;
				yourself.
		].
	].
	count := aSocket write: data.
	count == data size ifFalse: [self error: 'Unable to write data!'].
%
category: 'other'
method: WebSocketDataFrame
sendPongData: bytes onSocket: aSocket

	self
		sendOpcode: 16rA 
		data: bytes 
		onSocket: aSocket
%
category: 'other'
method: WebSocketDataFrame
sendText: bytes onSocket: aSocket

	self
		sendOpcode: 16r1
		data: bytes 
		onSocket: aSocket
%
set compile_env: 0
category: 'testing'
method: WebSocketDataFrame
isBinary

	^opcode == 2
%
category: 'testing'
method: WebSocketDataFrame
isContinuation

	^opcode == 0
%
category: 'testing'
method: WebSocketDataFrame
isDisconnect

	^opcode == 8
%
category: 'testing'
method: WebSocketDataFrame
isFinal

	^fin
%
category: 'testing'
method: WebSocketDataFrame
isPing

	^opcode == 9
%
category: 'testing'
method: WebSocketDataFrame
isText

	^opcode == 1
%
