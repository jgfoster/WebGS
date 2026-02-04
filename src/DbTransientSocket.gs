! ------------------- Remove existing behavior from DbTransientSocket
removeallmethods DbTransientSocket
removeallclassmethods DbTransientSocket
! ------------------- Class methods for DbTransientSocket
category: 'other'
classmethod: DbTransientSocket
new: aSocket

	^self basicNew
		initialize: aSocket;
		yourself
%
! ------------------- Instance methods for DbTransientSocket
category: 'other'
method: DbTransientSocket
accept

	| newSocket |
	newSocket := socket accept.
	newSocket ifNil: [self error: socket lastErrorString].
	^self class new: newSocket.
%
category: 'other'
method: DbTransientSocket
checkForErrors
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
%
category: 'other'
method: DbTransientSocket
close

	socket ifNotNil: [
		socket close.
		socket := nil.
	].
%
category: 'other'
method: DbTransientSocket
initialize: aSocket

	(aSocket isKindOf: GsSocket) ifFalse: [self error: 'Should be a GsSocket!'].
	socket := aSocket.
%
category: 'other'
method: DbTransientSocket
isConnected

	^socket isConnected
%
category: 'other'
method: DbTransientSocket
lastErrorString

	^socket lastErrorString
%
category: 'other'
method: DbTransientSocket
makeServer: backlogInteger atPort: portInteger

	| result |
	result := socket makeServer: backlogInteger atPort: portInteger.
	result ifNil: [^nil].
	^self
%
category: 'other'
method: DbTransientSocket
peerAddress

	^socket peerAddress
%
category: 'other'
method: DbTransientSocket
peerName

	^socket peerName
%
category: 'other'
method: DbTransientSocket
peerPort

	^socket peerPort
%
category: 'other'
method: DbTransientSocket
port

	^socket port
%
category: 'other'
method: DbTransientSocket
printOn: aStream

	aStream
		nextPutAll: 'DbTransientSocket(';
		nextPutAll: socket class name;
		nextPutAll: ':';
		print: socket asOop;
		nextPut: $).
%
category: 'other'
method: DbTransientSocket
read: anInteger

	^socket read: anInteger
%
category: 'other'
method: DbTransientSocket
read: wantInteger into: byteObject

	^socket read: wantInteger into: byteObject
%
category: 'other'
method: DbTransientSocket
read: wantInteger into: byteObject startingAt: startingAtInteger

	^socket read: wantInteger into: byteObject startingAt: startingAtInteger
%
category: 'other'
method: DbTransientSocket
readWillNotBlock

	^socket readWillNotBlock
%
category: 'other'
method: DbTransientSocket
readWillNotBlockWithin: anInteger

	^socket readWillNotBlockWithin: anInteger
%
category: 'other'
method: DbTransientSocket
secureAccept

	socket secureAccept ifFalse: [self error: socket lastErrorString].
	^true
%
category: 'other'
method: DbTransientSocket
write: aByteObject

	aByteObject isEmpty ifTrue: [^self].
	^socket write: aByteObject
%
