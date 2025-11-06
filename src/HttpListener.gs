! ------------------- Remove existing behavior from HttpListener
removeallmethods HttpListener
removeallclassmethods HttpListener
! ------------------- Class methods for HttpListener
category: 'constructors'
classmethod: HttpListener
new

	^self basicNew
		initialize;
		yourself
%
category: 'constructors'
classmethod: HttpListener
run: aRouter

	^self new
		router: aRouter;
		run;
		yourself
%
! ------------------- Instance methods for HttpListener
category: 'Initializing'
method: HttpListener
initialize

	listenBacklog := 5.
	port := 8888.
	server := HttpServer.  "might be replaced with an HttpLoadBalancer"
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
router: aRouter

	router := aRouter.
%
category: 'Initializing'
method: HttpListener
server: anAbstractHttpServer
	"anObject implements #'serveClientSocket:router:'"

	server := anAbstractHttpServer.
%
category: 'Override Defaults'
method: HttpListener
accept

	^socket accept
%
category: 'Override Defaults'
method: HttpListener
newSocket

	^GsSignalingSocket new
%
category: 'Override Defaults'
method: HttpListener
protocol

	^'http'
%
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
	Log instance log: #'debug' string: 'HttpListener>>createListener - ' , socket printString.
	^socket port
%
category: 'Web Server'
method: HttpListener
mainLoop

	[
		Log instance log: #'debug' string: 'HttpListener>>mainLoop - 1'.
		[
			System commitTransaction.
		] whileTrue: [
			| flag |
			flag := [
				socket readWillNotBlockWithin: 60000. 	"60 seconds"
			] on: Error do: [:ex |
				ex return: false.
			].
			[flag] whileTrue: [
				self mainLoopBody.
				flag := socket readWillNotBlock.
			].
		].
	] ensure: [
		Log instance log: #'debug' string: 'HttpListener>>mainLoop - 2'.
		socket close.
		socket := nil.
		server shutdown.
	].
%
category: 'Web Server'
method: HttpListener
mainLoopBody

	[
		| newSocket |
		newSocket := self accept.
		newSocket isNil ifTrue: [
			Log instance log: #'warning' string: 'GsSocket>>readWillNotBlock returned true but accept failed!'.
		] ifFalse: [
			[:aServer :aSocket :aRouter |
				Log instance log: #'debug' string: 'HttpListener>>mainLoopBody - ' , aSocket printString.
				aServer serveClientSocket: aSocket router: aRouter.		"<== work is done here"
			] forkWith: (Array with: server with: newSocket with: router).
		].
	] on: Error do: [:ex |
		Log instance log: #'error' string: ex description.
	].
%
category: 'Web Server'
method: HttpListener
reportUrl
	"log some startup information"

	| serverURL |
	serverURL := self protocol , '://' , (GsSocket getHostNameByAddress: ((System descriptionOfSession: System session) at: 11)) , ':' , port printString , '/'.
	Log instance log: #'startup' string: serverURL.
%
category: 'Web Server'
method: HttpListener
run
	"primary entry point; called immediately after initialization"

	self
		reportUrl;
		createListener;
		mainLoop.		"<- work is done here"
%
