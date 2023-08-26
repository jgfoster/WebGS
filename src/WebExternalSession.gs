! ------------------- Remove existing behavior from WebExternalSession
removeAllMethods WebExternalSession
removeAllClassMethods WebExternalSession
! ------------------- Class methods for WebExternalSession
set compile_env: 0
category: 'other'
classmethod: WebExternalSession
for: aClass

	^super newDefault
		login;
		startServer: aClass;
		yourself
%
! ------------------- Instance methods for WebExternalSession
set compile_env: 0
category: 'other'
method: WebExternalSession
_isOnMyStone
	"GemStone has a bug in this method and we are always on the current stone!"

	^true
%
category: 'other'
method: WebExternalSession
_signalIfError

	(GsExternalSession canUnderstand: #'_signalIfError') ifTrue: [	"3.6.0 and later"
		super _signalIfError.
	] ifFalse: [
		self _signalIfError: self _gciLibrary.
	].
%
category: 'other'
method: WebExternalSession
beNotAvailable

	isAvailable := false.
%
category: 'other'
method: WebExternalSession
forceLogout

	super forceLogout.	
	port := 0.
	isAvailable := false.
%
category: 'other'
method: WebExternalSession
hostPassword: aString

	hostPassword := aString copy
%
category: 'other'
method: WebExternalSession
isAvailable

	^isAvailable
%
category: 'other'
method: WebExternalSession
login

	| result |
	stoneSessionId ifNotNil: [
		ImproperOperation signal: 'Stone session ' , stoneSessionId printString ,
			' already associated with this GsExternalSession!'.
	].
	self _gciLibrary
		GciSetNetEx_: parameters gemStoneName
		_: parameters hostUsername
		_: hostPassword
		_: parameters gemService
		_: 0.		"parameters passwordIsEncryptedAsIntegerBoolean."	"1 or 0: GCI_LOGIN_PW_ENCRYPTED"
	self _signalIfError.
	result := self _gciLibrary
		GciLoginEx_: parameters username
		_: password
		_: (parameters loginFlags bitAnd: 1 bitInvert)
		_: 0. "haltOnErrNum"
	self _signalIfError.
	0 == result ifTrue: [
		self error: 'Login failed for unknown reason!'.
	].
	gciSessionId := self _gciLibrary GciGetSessionId.
	stoneSessionId := Object _objectForOop: (self _gciLibrary GciPerform_: System asOop _: 'session' _: nil _: 0).
	self _signalIfError.
	self _isOnMyStone ifTrue: [
		stoneSessionSerial := GsSession serialOfSession: stoneSessionId.
		gemProcessId := (System descriptionOfSession: stoneSessionId) at: 2.
	] ifFalse: [
		stoneSessionSerial := self executeString: 'GsSession currentSession serialNumber'.
		gemProcessId := self executeString: 'System gemVersionAt: #''processId'''.
	].
	self log: 'GsExternalSession login: ' , self _describe.
%
category: 'other'
method: WebExternalSession
password: aString

	password := aString copy
%
category: 'other'
method: WebExternalSession
serveClientSocket: clientSocket

	| semaphore serverSocket |
	Log instance log: #'debug' string: 'WebExternalSession>>serveClientSocket: ' , clientSocket printString.
	semaphore := Semaphore new.
	serverSocket := DbTransientSocket new: (GsSignalingSocket new
		connectTo: port on: 'localhost' timeoutMs: 5000;
		yourself).
	[
		[
			clientSocket isConnected and: [(clientSocket readWillNotBlockWithin: -1) and: [serverSocket isConnected]]
		] whileTrue: [
			| bytes |
			bytes := clientSocket read: 4096.
			bytes size == 0 ifTrue: [
				clientSocket close.
			] ifFalse: [
				serverSocket write: bytes.
				Log instance log: #'debug' string: 'sent ' , bytes size printString , ' bytes from ' , clientSocket printString , ' to ' , serverSocket printString.
			].
		].
		semaphore signal.
	] fork.
	[
		[
			serverSocket isConnected and: [(serverSocket readWillNotBlockWithin: -1) and: [clientSocket isConnected]]
		] whileTrue: [
			| bytes |
			bytes := serverSocket read: 4096.
			bytes size == 0 ifTrue: [
				serverSocket close.
			] ifFalse: [
				clientSocket write: bytes.
				Log instance log: #'debug' string: 'sent ' , bytes size printString , ' bytes from ' , serverSocket printString , ' to ' , clientSocket printString.
			].
		].
		semaphore signal.
	] fork.
	semaphore wait.
	(Delay forMilliseconds: 10) wait.
	clientSocket close.
	serverSocket close.
	isAvailable := true.
%
category: 'other'
method: WebExternalSession
startServer: aClass

	| listener |
	Log instance log: #'debug' string: 'WebExternalSession>>initialize: ' , aClass printString.
	listener := (self executeString: 'HttpListener new') first.
	port := self 
		send: 'port:' to: listener withArguments: (Array with: nil);
		send: 'webAppClass:' to: listener withArguments: (Array with: aClass);
		send: 'createListener' to: listener.
	self forkString: '(Object objectForOop: ' , listener printString , ') mainLoop'.
	isAvailable := true.
	Log instance log: #'debug' string: 'remote port: ' , port printString.
%
