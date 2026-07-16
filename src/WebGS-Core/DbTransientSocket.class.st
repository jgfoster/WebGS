"It is an error to try to persist a Socket so any object that references a Socket is similarly ineligible to be persisted. This class provides a wrapper for a Socket so the wrapper can be referenced."
Class {
	#name : 'DbTransientSocket',
	#superclass : 'Object',
	#instVars : [
		'socket'
	],
	#gs_options : [ 'dbTransient' ],
	#category : 'WebGS-Core'
}

{ #category : 'other' }
DbTransientSocket class >> new: aSocket [

	^self basicNew
		initialize: aSocket;
		yourself
]

{ #category : 'other' }
DbTransientSocket >> accept [

	| newSocket |
	newSocket := socket accept.
	newSocket ifNil: [self error: socket lastErrorString].
	^self class new: newSocket.
]

{ #category : 'other' }
DbTransientSocket >> checkForErrors [
	| errors |
	(socket isKindOf: GsSecureSocket) ifFalse: [^self].
	socket fetchLastIoErrorString ifNotNil: [:value | 
		Log instance log: #'error' string: errors.
		EndOfStream signal: errors.
	].
	(errors := socket class fetchErrorStringArray) notEmpty ifTrue: [
		errors do: [:each |
			((each subStrings: $:) copyFrom: 1 to: 6) = #('error' '1410E114' 'SSL routines' 'SSL_peek' 'uninitialized' 'ssl/ssl_lib.c') ifTrue: [
				Log instance log: #'warn' string: each.
			] ifFalse: [
				Log instance log: #'error' string: each.
			].
		].
		EndOfStream signal: errors.
	].
]

{ #category : 'other' }
DbTransientSocket >> close [

	socket ifNotNil: [
		socket close.
		socket := nil.
	].
]

{ #category : 'other' }
DbTransientSocket >> initialize: aSocket [

	(aSocket isKindOf: GsSocket) ifFalse: [self error: 'Should be a GsSocket!'].
	socket := aSocket.
]

{ #category : 'other' }
DbTransientSocket >> isConnected [

	^socket isConnected
]

{ #category : 'other' }
DbTransientSocket >> lastErrorString [

	^socket lastErrorString
]

{ #category : 'other' }
DbTransientSocket >> makeServer: backlogInteger atPort: portInteger [

	| result |
	result := socket makeServer: backlogInteger atPort: portInteger.
	result ifNil: [^nil].
	^self
]

{ #category : 'other' }
DbTransientSocket >> peerAddress [

	^socket peerAddress
]

{ #category : 'other' }
DbTransientSocket >> peerName [

	^socket peerName
]

{ #category : 'other' }
DbTransientSocket >> peerPort [

	^socket peerPort
]

{ #category : 'other' }
DbTransientSocket >> port [

	^socket port
]

{ #category : 'other' }
DbTransientSocket >> printOn: aStream [

	aStream
		nextPutAll: 'DbTransientSocket(';
		nextPutAll: socket class name;
		nextPutAll: ':';
		print: socket asOop;
		nextPut: $).
]

{ #category : 'other' }
DbTransientSocket >> read: anInteger [

	^socket read: anInteger
]

{ #category : 'other' }
DbTransientSocket >> read: wantInteger into: byteObject [

	^socket read: wantInteger into: byteObject
]

{ #category : 'other' }
DbTransientSocket >> read: wantInteger into: byteObject startingAt: startingAtInteger [

	^socket read: wantInteger into: byteObject startingAt: startingAtInteger
]

{ #category : 'other' }
DbTransientSocket >> readWillNotBlock [

	^socket readWillNotBlock
]

{ #category : 'other' }
DbTransientSocket >> readWillNotBlockWithin: anInteger [

	^socket readWillNotBlockWithin: anInteger
]

{ #category : 'other' }
DbTransientSocket >> secureAccept [

	socket secureAccept ifFalse: [self error: socket lastErrorString].
	^true
]

{ #category : 'other' }
DbTransientSocket >> write: aByteObject [

	aByteObject isEmpty ifTrue: [^self].
	^socket write: aByteObject
]
