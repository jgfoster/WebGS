
expectvalue /Class
doit
HttpServer category: 'User Interface'
%
! ------------------- Remove existing behavior from HttpServer
expectvalue /Metaclass3
doit
HttpServer removeAllMethods.
HttpServer class removeAllMethods.
%
! ------------------- Class methods for HttpServer
set compile_env: 0
category: 'constants'
classmethod: HttpServer
contentTypeFor: aPath
		"Used when sending a file"

	^self contentTypes
		at: (aPath subStrings: $.) last asLowercase
		otherwise: 'text/html; UTF-8'.
%
category: 'constants'
classmethod: HttpServer
contentTypes
		"Used when sending a file"

	^KeyValueDictionary new
		at: 'css'		put: 'text/css';
		at: 'gif'		put: 'image/gif';
		at: 'html'	put: 'text/html; charset=UTF-8';
		at: 'ico'		put: 'image/x-icon';
		at: 'jpg'		put: 'image/jpg';
		at: 'js'		put: 'text/javascript';
		at: 'json'	put: 'text/json';
		at: 'png'		put: 'image/png';
		yourself.
%
set compile_env: 0
category: 'critical'
classmethod: HttpServer
critical: aBlock
	"Evaluate aBlock inside a commit while holding the mutex"

	^self mutex critical: [
		| result |
		[
			result := aBlock value.
			System commitTransaction.
		] whileFalse: [
			System abort.
		].
		result
	].
%
category: 'critical'
classmethod: HttpServer
mutex
	"In case anyone persists an instance of HttpServer, we don't want the mutex to prevent the commit!"

	^SessionTemps current
		at: #'WebServer_mutex'
		ifAbsentPut: [Semaphore forMutualExclusion].
%
set compile_env: 0
category: 'logging'
classmethod: HttpServer
log: aSymbol string: aString
	"Write a string to the log if aSymbol in supportedLogTypes."

	| log |
	(self supportedLogTypes includes: aSymbol) ifTrue: [
		System clientIsRemote ifTrue: [
			self critical: [
				log := GsFile openAppendOnServer: self logName.
				log log: '[', System gemProcessId printString ,'] - (', aSymbol , ') ' , (HttpResponse webStringForDateTime: DateTime now) , ' - ' , Processor activeProcess asOop printString , ' - ' , aString.
				log close.
			].
		] ifFalse: [
			GsFile gciLogServer: 	"stdout for linked topaz"
				DateAndTime now printStringWithRoundedSeconds ,
				' - ' , Processor activeProcess asOop printString ,
				' - ' , aString.
		]
	].
%
category: 'logging'
classmethod: HttpServer
logName

	^SessionTemps current
			at: #'WebServer_logName'
			ifAbsentPut: [ (System performOnServer: 'pwd') trimSeparators, '/webServer.log' ]
%
category: 'logging'
classmethod: HttpServer
logName: aString

	SessionTemps current
			at: #'WebServer_logName'
			put: aString
%
category: 'logging'
classmethod: HttpServer
supportedLogTypes

	^SessionTemps current
			at: #'WebServer_logTypes'
			ifAbsentPut: [ #(#'startup' " #'debug' #'warning' " #'error') ]
%
category: 'logging'
classmethod: HttpServer
supportedLogTypes: anArray

	SessionTemps current
			at: #'WebServer_logTypes'
			put: anArray
%
set compile_env: 0
category: 'running'
classmethod: HttpServer
askDelegate: aDelegate toHandleLogEntry: aLogEntry
	"This is called from the Gem that handles the socket and
	is typically run in a separate gem to allow for parallel requests.
	aLogEntry.key contains anHttpRequest and the role of this method
	is to end with aLogEntry.value containing either anHttpResponse or
	anException."

	[
		| request response |
		AlmostOutOfMemory enable.
		request := aLogEntry key.
		response := aDelegate responseForRequest: request.		"<- work is done here"
		response ifNotNil: [response setDate].
		aLogEntry value: response.
		System commit.
		aDelegate postSendAction.
	] on: Error , Admonition do: [:ex1 |
		[
			System abort.
			aLogEntry value: ex1.
			System commit.
		] on: Error do: [:ex2 |
			self log: #'error' string: ex1 printString , Character lf asString , ex2 printString , Character lf asString , (GsProcess stackReportToLevel: 50).
			ex2 return: nil.
		].
	].
%
category: 'running'
classmethod: HttpServer
new

	self error: 'Use #serveOnPort:delegate:*'
%
category: 'running'
classmethod: HttpServer
serveOnPort: anInteger delegate: aWebApp

	self
		serveOnPort: anInteger
		delegate: aWebApp
		withWorkerGemCount: aWebApp workerCount.
%
category: 'running'
classmethod: HttpServer
serveOnPort: portInteger delegate: aWebApp withWorkerGemCount: sessionCountInteger

	self basicNew
		initializeDelegate: aWebApp withWorkerGemCount: sessionCountInteger;
		startOnPort: portInteger.
%
category: 'running'
classmethod: HttpServer
serveOnPort: aPortNumber
		delegate: aWebApp
		withWorkerGemCount: workerGemCountNumber
		logFileName: aFileNameString
		supportedLogTypes: anArray

	self
		supportedLogTypes: anArray;
		logName: aFileNameString;
		serveOnPort: aPortNumber
			delegate: aWebApp
			withWorkerGemCount: workerGemCountNumber
%
! ------------------- Instance methods for HttpServer
set compile_env: 0
category: 'Initializing'
method: HttpServer
initializeDelegate: aDelegate withWorkerGemCount: anInteger

	delegate := aDelegate.
	delegate log.	"to ensure that it exists; create now and commit"
	System commit.
	GsSocket closeAll.	"debugging could have left some open sockets"
	System 		"some extra overhead, but we want to get exception stacks"
		gemConfigurationAt: #GemExceptionSignalCapturesStack
		put: true.
	self loginSessions: anInteger.
%
category: 'Initializing'
method: HttpServer
log: aSymbol string: aString

	self class log: aSymbol string: aString
%
set compile_env: 0
category: 'Request Handler'
method: HttpServer
critical: aBlock
	"Evaluate aBlock inside a commit while holding the mutex"

	^self class critical: aBlock
%
category: 'Request Handler'
method: HttpServer
handleRequestForFile: pathString on: aSocket method: methodString
	"The delegate returned nil, indicating that it didn't have a response to offer.
	We will check to see if there is a static file available that matches the path."

	| response gsFile |
	(gsFile := self openFile: pathString) ifNil: [	"does file exist?"
			self sendResponse: (HttpResponse notFound: pathString) on: aSocket.
			^self.
	].
	[
		response := HttpResponse new
			contentLength: gsFile fileSize;
			lastModified: gsFile lastModified;
			contentType: (self class contentTypeFor: gsFile pathName);
			yourself.
		methodString = 'HEAD' ifFalse: [	"A HEAD request has the file size and type but not the contents."
			response sendContentsBlock: [:socket |
				[gsFile atEnd not] whileTrue: [socket write: (gsFile next: 32000)].
			].
		].
		self
			sendResponse: response
			on: aSocket.
	] ensure: [
		gsFile close.
	].
%
category: 'Request Handler'
method: HttpServer
handleRequestOn: aSocket
	"We are in a forked process (thread) and aSocket has the unread request (new socket from accept)"

	| error logEntry request response |
	logEntry := self newWebLogEntry.	"might include a #'critical:' block"
	[
		self log: #'debug' string: 'handleRequestOn: ' , aSocket printString , ' - a'.
		request := HttpRequest readFromSocket: aSocket.
		self log: #'debug' string: 'handleRequestOn: ' , aSocket printString , ' - b'.
		self critical: [logEntry key: request].
		request method isEmpty ifTrue: [
			self class log: #'warning' string: 'Got an empty request'.
			^self.
		].
		self respondToRequestInLogEntry: logEntry.		"<- work is done here for dynamic content"
		response := logEntry value.
		response ifNil: [		"no dynamic content available, try static content"
			self critical: [logEntry value: request path].
			self
				handleRequestForFile: request path
				on: aSocket
				method: request method.
		] ifNotNil: [
			(response isKindOf: Exception) ifTrue: [
				error := response.
			] ifFalse: [
				self sendResponse: response on: aSocket.	"dynamic content is returned here"
			].
		].
	] on: Error , Admonition do: [:ex1 |
		[
			self critical: [System abort. logEntry value: ex1].
		] on: Error do: [:ex2 |
			self class log: #'error' string:
				ex1 printString , Character lf asString ,
				ex2 printString , Character lf asString ,
				(GsProcess stackReportToLevel: 50).
			ex2 return: nil.
		].
		error := ex1.
	].
	error ifNotNil: [
		response := HttpResponse serverError: error.
		self sendResponse: response on: aSocket.
	].
%
category: 'Request Handler'
method: HttpServer
newWebLogEntry
	"A weblog entry is an association. Its contents indicates a status:
		timestamp -> nil
			we have accepted a connection, but not read the request; if this is the result, then the request was likely empty
		anHttpRequest -> nil
			we have read the request, but have not generated a response; this should only be work-in-progress
		anHttpRequest -> 'path/to/static/content'
			indicates an attempt to get static content; actual result is not indicated
		anHttpRequest -> anException
			anException happened while generating the result (dynamic or static)
		anHttpRequest -> anHttpResponse
			dynamic content was generated
"

	^self critical: [delegate log add: DateTime now -> nil].
%
category: 'Request Handler'
method: HttpServer
openFile: pathString
	"We will check to see if there is a static file available that matches the path."

	| file path |
	file := pathString.
	(path := delegate htdocs) ifNil: [^nil]. "Should we offer static files?"
	(file includesString: '../') ifTrue: [^nil]. "Is request for a file below provided path?"
	(file isEmpty or: [file = '/']) ifTrue: [file := '/index.html'].
	^GsFile openReadOnServer: path , file
%
category: 'Request Handler'
method: HttpServer
respondToRequestInLogEntry: aLogEntry
	"We are in a forked process (thread) and aLogEntry.key contains anHttpRequest.
	We put something in aLogEntry.value and return.
	The action might be done in our Gem or in a remote (worker) Gem.
	In either case, we call HttpServer class>>askDelegate:toHandleLogEntry: to do the work."

	| session useLocalGem |
	useLocalGem := aLogEntry key isMultiPart		"We need the local socket to read request"
		or: [(session := self getSession) isNil]. 	"No worker gem available"
	useLocalGem ifTrue: [		"Handle request in this process"
		HttpServer askDelegate: delegate toHandleLogEntry: aLogEntry.	"<- work is done either here"
	] ifFalse: [						"Let a worker gem handle the request"
		self class log: #'debug' string: 'sending task to ' , session printString.
		[
			session
				executeBlock: [System abort];	"so it can see the new logEntry"
				send: #'askDelegate:toHandleLogEntry:' 							"<- or work is done here"
					to: HttpServer asOop
					withArguments: (Array with: delegate with: aLogEntry);
				yourself.
		] ensure: [
			self returnSession: session.
		].
	].
%
category: 'Request Handler'
method: HttpServer
sendResponse: anHttpResponse on: aSocket

	[
		anHttpResponse sendResponseOn: aSocket.
		self class log: #'debug' string: 'Response sent to socket: ', aSocket asOop asString, ' fDesc: ' , aSocket fileDescriptor printString
	] on: Error do: [:ex |
		self class log: #'error' string: ex description , ' - socket: ', aSocket asOop asString,  Character lf asString , (GsProcess stackReportToLevel: 40).
	].
%
set compile_env: 0
category: 'Sessions'
method: HttpServer
abortIdleSessions

	self critical: [	"so no other process changes a session state"
		System abort.
		self sessions do: [:each |
			each value ifTrue: [		"session is available (idle)"
				each key executeBlock: [		"block evaluated in remote (worker) process"
					(Delay forMilliseconds: 100) wait. 	"Allow background processes to run"
					System abort.								"Avoid CR backlog"
				].
			].
		].
	].
%
category: 'Sessions'
method: HttpServer
getSession
	"Returns a GciExternalSession that is idle and can be used to build an HttpResponse"

	| assoc sessions |
	(sessions := self sessions) isEmpty ifTrue: [^nil].
	[
		self critical: [
			assoc := sessions
				detect: [:each | each value] 		"session is available"
				ifNone: [nil].
			assoc ifNotNil: [assoc value: false].		"session is not available"
		].
		assoc isNil.
	] whileTrue: [
		(Delay forMilliseconds: 10) wait. 			"wait to see if something becomes available"
	].
	^assoc key
%
category: 'Sessions'
method: HttpServer
loginSessions: anInteger
	"part of the initialization sequence"

	| sessions |
	sessions := self sessions.	"starts as an empty IdentitySet"
	anInteger timesRepeat: [
		sessions add: delegate externalSession -> true.		"logged-in session is available"
	].
	sessions do: [:each |
		each key executeBlock: [System gemConfigurationAt: #GemExceptionSignalCapturesStack put: true].
	].
%
category: 'Sessions'
method: HttpServer
returnSession: aGciSession
	"all done using this remote, worker, Gem"

	self critical: [
		| assoc |
		assoc := self sessions detect: [:each | each key == aGciSession].
		assoc value: true.
	].
%
category: 'Sessions'
method: HttpServer
sessions
	"Collection of Association instances
		key: GsExternalSession
		value: aBoolean indicating whether session is available
	In case anyone persists an instance of HttpServer, we don't want the sessions to prevent the commit!"

	^SessionTemps current
		at: #'WebServer_sessions'
		ifAbsentPut: [IdentitySet new].
%
set compile_env: 0
category: 'Web Server'
method: HttpServer
acceptSocket

	^self listeningSocket accept
%
category: 'Web Server'
method: HttpServer
listeningSocket

	^SessionTemps current at: #'WebServer_listeningSocket'.
%
category: 'Web Server'
method: HttpServer
listeningSocket: aSocket
	"In case anyone persists an instance of HttpServer, we don't want the socket to prevent the commit!"

	SessionTemps current
		at: #'WebServer_listeningSocket'
		put: aSocket.
%
category: 'Web Server'
method: HttpServer
listenOn: anInteger
	"set up the listening socket"

	| listenerSocket |
	listenerSocket := self newServerSocket.
	(listenerSocket makeServer: self sessions size * 2 atPort: anInteger) isNil ifTrue: [
		| string |
		string := listenerSocket lastErrorString.
		listenerSocket close.
		self error: string.
	].
	listenerSocket port == anInteger ifFalse: [self error: 'Asked for port ' , anInteger printString , ' but got ' , listenerSocket port printString].
	self listeningSocket: listenerSocket.
	self class log: #'debug' string: 'listening on a' , listenerSocket class name , '(' , listenerSocket asOop printString , ')'.
%
category: 'Web Server'
method: HttpServer
mainLoop

	[
		self abortIdleSessions.	"this does an abort/commit in the current gem as well"
		true.
	] whileTrue: [
		| flag socket |
		flag := self listeningSocket readWillNotBlockWithin: 60000. 	"60,000 milliseconds = 60 seconds"
		[flag] whileTrue: [
			self log: #'debug' string: 'received connection request'.
			self critical: [ socket := self acceptSocket ].
			socket isNil
				ifTrue: [ self class log: #'warning' string: 'ReadWillNotBlock but accept failed!' ]
				ifFalse: [
					self class log: #'debug' string: 'accepted serverSocket ' , socket asOop asString, ' fileDesc: ' , socket fileDescriptor printString.
					self serveClientSocket: socket.
				].
			flag := self listeningSocket readWillNotBlock.
		].
	].
%
category: 'Web Server'
method: HttpServer
newServerSocket

	^GsSocket new
%
category: 'Web Server'
method: HttpServer
protocol

	^'http'
%
category: 'Web Server'
method: HttpServer
reportServerUrlOn: anInteger
	"log some startup information"

	| serverURL |
	serverURL := self protocol , '://' , (GsSocket getHostNameByAddress: ((System descriptionOfSession: System session) at: 11)) , ':' , anInteger printString , '/'.
	self class log: #'startup' string: serverURL.
%
category: 'Web Server'
method: HttpServer
serveClientSocket: aSocket

	" Serve the request on the client socket in a forked process.
	  Extract from mainLoop due temp variables conflict (wrong socket closed!). "

	[
		[ aSocket isConnected
			ifTrue: [ self handleRequestOn: aSocket ]		"<- work is done here"
			ifFalse: [ self class log: #'warning' string: 'Socket is not connected: ' , aSocket asOop asString ].
		] ensure: [
			aSocket close.
		].
		System commit.
	] fork.
	Processor yield.		"let new process get started"
%
category: 'Web Server'
method: HttpServer
startOnPort: anInteger
	"primary entry point; called immediately after initialization"

	self reportServerUrlOn: anInteger.
	[
		self listenOn: anInteger.
		self mainLoop.		"<- work is done here"
	] ensure: [
		self listeningSocket close.
		self sessions do: [:each | each key forceLogout].
	].
%
