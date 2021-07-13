! ------------------- Remove existing behavior from HttpListenerProxy
removeAllMethods HttpListenerProxy
removeAllClassMethods HttpListenerProxy
! ------------------- Class methods for HttpListenerProxy
set compile_env: 0
category: 'other'
classmethod: HttpListenerProxy
for: aClass

	^self basicNew
		initialize: aClass;
		yourself
%
category: 'other'
classmethod: HttpListenerProxy
new

	self error: 'Use #for: aWebAppClass'.
%
! ------------------- Instance methods for HttpListenerProxy
set compile_env: 0
category: 'other'
method: HttpListenerProxy
beNotAvailable

	isAvailable := false.
%
category: 'other'
method: HttpListenerProxy
initialize: aClass

	| listener |
	Log instance log: #'debug' string: 'HttpListenerProxy>>initialize: ' , aClass printString.
	session := self newExternalSession.
	listener := (session executeString: 'HttpListener new') first.
	port := session 
		send: 'port:' to: listener withArguments: (Array with: nil);
		send: 'webApp:' to: listener withArguments: (Array with: aClass);
		send: 'createListener' to: listener.
	session forkString: '(Object objectForOop: ' , listener printString , ') mainLoop'.
	isAvailable := true.
	host := GsSocket getHostNameByAddress: ((System descriptionOfSession: System session) at: 11).
	host := 'localhost'.
	Log instance log: #'debug' string: 'remote port: ' , port printString.
%
category: 'other'
method: HttpListenerProxy
isAvailable

	^isAvailable
%
category: 'other'
method: HttpListenerProxy
logout

	session forceLogout.	
	session := nil.
	port := 0.
	isAvailable := false.
%
category: 'other'
method: HttpListenerProxy
newExternalSession

	^WebExternalSession newDefault
		login;
		yourself
"
	^(WebExternalSession
		gemNRS: GsNetworkResourceString defaultGemNRSFromCurrent
		stoneNRS: GsNetworkResourceString defaultStoneNRSFromCurrent
		username: System myUserProfile userId
		password: 'swordfish'
		hostUsername: 'gsadmin'
		hostPassword: 'swordfish')
		login;
		executeBlock: [WebAppSample doLocalSessionInitialization];
		yourself
"
%
category: 'other'
method: HttpListenerProxy
serveClientSocket: clientSocket

	| semaphore serverSocket |
	Log instance log: #'debug' string: 'HttpListenerProxy>>serveClientSocket: ' , clientSocket printString.
	semaphore := Semaphore new.
	serverSocket := DbTransientSocket new: (GsSignalingSocket new
		connectTo: port on: host timeoutMs: 5000;
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
				Log instance log: #'debug' string: 'sent ' , bytes size printString , ' bytes from ' , clientSocket printString , ' to ' , serverSocket printString , '
	''' , bytes , ''''.
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
				Log instance log: #'debug' string: 'sent ' , bytes size printString , ' bytes from ' , serverSocket printString , ' to ' , clientSocket printString , '
	''' , bytes , ''''.
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
