! ------------------- Remove existing behavior from HttpListener
removeAllMethods HttpListener
removeAllClassMethods HttpListener
! ------------------- Class methods for HttpListener
set compile_env: 0
category: 'other'
classmethod: HttpListener
new

	^self basicNew
		initialize;
		yourself
%
! ------------------- Instance methods for HttpListener
set compile_env: 0
category: 'default'
method: HttpListener
accept

	^socket accept
%
category: 'default'
method: HttpListener
newSocket

	^GsSignalingSocket new
%
category: 'default'
method: HttpListener
protocol

	^'http'
%
set compile_env: 0
category: 'Initializing'
method: HttpListener
initialize

	listenBacklog := 5.
	port := 8888.
	System 		"some extra overhead, but we want to get exception stacks"
		gemConfigurationAt: #GemExceptionSignalCapturesStack
		put: true.
%
category: 'Initializing'
method: HttpListener
 listenBacklog: anInteger

	listenBacklog := anInteger.
%
category: 'Initializing'
method: HttpListener
port: anInteger

	port := anInteger.
%
category: 'Initializing'
method: HttpListener
withSocketDo: aBlock

	block := aBlock.
%
set compile_env: 0
category: 'Web Server'
method: HttpListener
createListener
	"set up the listening socket"

	socket := DbTransientSocket new: self newSocket.
	(socket makeServer: listenBacklog atPort: port) ifNil: [
		| string |
		string := socket lastErrorString.
		socket close.
		socket := nil.
		self error: string.
	].
	HttpServer log: #'debug' string: 'HttpListener>>createListener - ' , socket printString.
%
category: 'Web Server'
method: HttpListener
mainLoop

	[
		System commitTransaction.
	] whileTrue: [
		| flag |
		flag := socket readWillNotBlockWithin: 60000. 	"60 seconds"
		[flag] whileTrue: [
			| newSocket |
			newSocket := self accept.
			newSocket isNil ifTrue: [
				HttpServer log: #'warning' string: 'GsSocket>>readWillNotBlock returned true but accept failed!'.
			] ifFalse: [
				[:aBlock :aSocket |
					HttpServer log: #'debug' string: 'HttpListener>>mainLoop - accepted ' , aSocket printString , ' isConnected = ' , aSocket isConnected printString.
					block value: aSocket.		"<== work is done here"
				] forkWith: (Array with: block with: newSocket).
			].
			flag := socket readWillNotBlock.
		].
	].
%
category: 'Web Server'
method: HttpListener
reportUrl
	"log some startup information"

	| serverURL |
	serverURL := self protocol , '://' , (GsSocket getHostNameByAddress: ((System descriptionOfSession: System session) at: 11)) , ':' , port printString , '/'.
	HttpServer log: #'startup' string: serverURL.
%
category: 'Web Server'
method: HttpListener
run
	"primary entry point; called immediately after initialization"

	[
		self createListener.
		self mainLoop.		"<- work is done here"
	] ensure: [
		socket close.
		socket := nil.
	].
%
