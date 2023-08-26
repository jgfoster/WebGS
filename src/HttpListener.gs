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
webAppClass: anObject
	"anObject implements #'serveClientSocket:'"

	webAppClass := anObject.
%
set compile_env: 0
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
		webAppClass shutdown.
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
			[:anObject :aSocket |
				Log instance log: #'debug' string: 'HttpListener>>mainLoopBody - ' , aSocket printString.
				anObject serveClientSocket: aSocket.		"<== work is done here"
			] forkWith: (Array with: webAppClass with: newSocket).
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
