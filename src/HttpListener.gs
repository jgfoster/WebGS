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

	System sessionCacheStatAt: 0 put: 0.	"request count"
	System sessionCacheStatAt: 1 put: 0.	"time in secure accept (us)"
	System sessionCacheStatAt: 2 put: 0.	"secure accept failure count"
	System sessionCacheStatAt: 3 put: 0.	"readWillNotBlock returned true but accept failure count"
	System sessionCacheStatAt: 4 put: 0.	"time in #'serveClientSocket:router:' (us)"
	System sessionCacheStatAt: 5 put: 0.	"#'serveClientSocket:router:' failure count"
	System sessionCacheStatAt: 6 put: 0.	"time in socket read (us)"
	System sessionCacheStatAt: 7 put: 0.	"time in socket write (us)"
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
				System sessionCacheStatAt: 0 incrementBy: 1.	"request count"
				[:newSocket | self mainLoopBody: newSocket] forkWith: { socket accept }.
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
mainLoopBody: aSocket

	| t1 t2 |
	aSocket isNil ifTrue: [
		Log instance log: #'warning' string: 'GsSocket>>readWillNotBlock returned true but accept failed!'.
		System sessionCacheStatAt: 3 incrementBy: 1.	"error count"
		^self
	].
	Log instance log: #'debug' string: 'HttpListener>>mainLoopBody - ' , aSocket printString.
	[
		t1 := System timeNs.
		server serveClientSocket: aSocket router: router.		"<== work is done here"
		t2 := System timeNs.
		System sessionCacheStatAt: 4 incrementBy: (t2 - t1) // 1000.	"time in #'serveClientSocket:router:' (us)"
	] on: Error do: [:ex |
		Log instance log: #'error' string: ex description.
		System sessionCacheStatAt: 5 incrementBy: 1.	"error count"
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
