"Frame format (best viewed with a fixed-width font!):

      0                   1                   2                   3
      0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
     +-+-+-+-+-------+-+-------------+-------------------------------+
     |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
     |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
     |N|V|V|V|       |S|             |   (if payload len==126/127)   |
     | |1|2|3|       |K|             |                               |
     +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
     |     Extended payload length continued, if payload len == 127  |
     + - - - - - - - - - - - - - - - +-------------------------------+
     |                               |Masking-key, if MASK set to 1  |
     +-------------------------------+-------------------------------+
     | Masking-key (continued)       |          Payload Data         |
     +-------------------------------- - - - - - - - - - - - - - - - +
     :                     Payload Data continued ...                :
     + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
     |                     Payload Data continued ...                |
     +---------------------------------------------------------------+"
Class {
	#name : 'WebSocketDataFrame',
	#superclass : 'Object',
	#instVars : [
		'fin',
		'rsv1',
		'rsv2',
		'rsv3',
		'opcode',
		'data'
	],
	#category : 'WebGS-Core'
}

{ #category : 'other' }
WebSocketDataFrame class >> fromSocket: aSocket [

	^self basicNew
		initializeFromSocket: aSocket;
		yourself
]

{ #category : 'other' }
WebSocketDataFrame class >> new [

	self error: 'Use other constructors'.
]

{ #category : 'other' }
WebSocketDataFrame class >> sendDisconnect: data onSocket: aSocket [

	self basicNew sendDisconnect: data onSocket: aSocket
]

{ #category : 'other' }
WebSocketDataFrame class >> sendPongData: data onSocket: aSocket [

	self basicNew sendPongData: data onSocket: aSocket
]

{ #category : 'other' }
WebSocketDataFrame class >> sendText: data onSocket: aSocket [

	self basicNew sendText: data onSocket: aSocket
]

{ #category : 'accessors' }
WebSocketDataFrame >> data [

	^data
]

{ #category : 'other' }
WebSocketDataFrame >> initializeFromSocket: aSocket [
	"fin rsv1 rsv2 rsv3 opcode mask data"

	| byte bytes count hasMask mask payloadLen |
	bytes := ByteArray new: 4.
	count := aSocket read: 2 into: bytes.
	count < 2 ifTrue: [	"A GemStone bug (49606) causes readWillNotBlock to return true and the read to return zero bytes"
		fin := 1.
		opcode := 8.
		^self
	].
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
	opcode == 0 ifTrue: [		"Continuation"
		self error: 'Continuation frame not (yet) supported!'.
	].
	opcode == 1 ifTrue: [		"Text"
		data := bytes decodeFromUTF8.
		^self
	].
	opcode == 2 ifTrue: [		"Binary"
		data := bytes.
		^self
	].
	opcode == 8 ifTrue: [		"Close"
		bytes notEmpty ifTrue: [
			data := bytes unsigned16At: 1.
		].
		^self
	].
	opcode == 9 ifTrue: [		"Ping"
		data := bytes.
		^self
	].
	opcode == 16rA ifTrue: [	"Pong"
		data := bytes.
		^self
	].
]

{ #category : 'other' }
WebSocketDataFrame >> sendBinary: bytes onSocket: aSocket [

	self
		sendOpcode: 16r2
		data: bytes
		onSocket: aSocket
]

{ #category : 'other' }
WebSocketDataFrame >> sendDisconnect: anInteger onSocket: aSocket [

	| bytes |
	anInteger ifNil: [
		bytes := ByteArray new: 0.
	] ifNotNil: [
		bytes := ByteArray new: 2.
		bytes unsigned16At: 1 put: anInteger.
	].
	self
		sendOpcode: 16r8
		data: bytes
		onSocket: aSocket
]

{ #category : 'other' }
WebSocketDataFrame >> sendOpcode: type data: bytes onSocket: aSocket [

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
]

{ #category : 'other' }
WebSocketDataFrame >> sendPongData: bytes onSocket: aSocket [

	self
		sendOpcode: 16rA
		data: bytes
		onSocket: aSocket
]

{ #category : 'other' }
WebSocketDataFrame >> sendText: bytes onSocket: aSocket [

	self
		sendOpcode: 16r1
		data: bytes
		onSocket: aSocket
]

{ #category : 'testing' }
WebSocketDataFrame >> isBinary [

	^opcode == 2
]

{ #category : 'testing' }
WebSocketDataFrame >> isContinuation [

	^opcode == 0
]

{ #category : 'testing' }
WebSocketDataFrame >> isDisconnect [

	^opcode == 8
]

{ #category : 'testing' }
WebSocketDataFrame >> isFinal [

	^fin
]

{ #category : 'testing' }
WebSocketDataFrame >> isPing [

	^opcode == 9
]

{ #category : 'testing' }
WebSocketDataFrame >> isText [

	^opcode == 1
]
