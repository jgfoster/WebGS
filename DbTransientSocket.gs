! ------------------- Remove existing behavior from DbTransientSocket
removeAllMethods DbTransientSocket
removeAllClassMethods DbTransientSocket
! ------------------- Class methods for DbTransientSocket
set compile_env: 0
category: 'other'
classmethod: DbTransientSocket
new: aSocket

	^self basicNew
		initialize: aSocket;
		yourself
%
! ------------------- Instance methods for DbTransientSocket
set compile_env: 0
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
