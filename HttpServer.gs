! ------------------- Remove existing behavior from HttpServer
removeAllMethods HttpServer
removeAllClassMethods HttpServer
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
category: 'constants'
classmethod: HttpServer
debug

	"Share the mutex across all processes in this gem"

	^SessionTemps current
		at: #'HttpServer_debug'
		ifAbsent: [false].
%
category: 'constants'
classmethod: HttpServer
debug: aBoolean

	^SessionTemps current
		at: #'HttpServer_debug'
		put: aBoolean
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
	"Share the mutex across all processes in this gem"

	^SessionTemps current
		at: #'HttpServer_mutex'
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
			at: #'HttpServer_logName'
			ifAbsentPut: [ (System performOnServer: 'pwd') trimSeparators, '/webServer.log' ]
%
category: 'logging'
classmethod: HttpServer
logName: aString

	SessionTemps current
			at: #'HttpServer_logName'
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
"
	HttpServer supportedLogTypes: #(#'startup' #'debug' #'warning' #'error').
"
	SessionTemps current
			at: #'WebServer_logTypes'
			put: anArray
%
set compile_env: 0
category: 'running'
classmethod: HttpServer
handleRequestLogEntry: aLogEntry
	"This is called from the Gem that handles the socket and
	may be run in a separate gem (see HttpConcurrentServer).
	aLogEntry.key contains anHttpRequest and the role of this method
	is to end with aLogEntry.value containing either anHttpResponse or
	anException."

	[
		| request response |
		AlmostOutOfMemory enable.
		request := aLogEntry key.
		self log: #'debug' string: 'askDelegate: ' , self printString , ' toHandleLogEntry: ' , aLogEntry printString.
		response := self responseForRequest: request.		"<- work is done here"
		response ifNotNil: [response setDate].
		aLogEntry value: response.
		System commit.
		self postCommitAction.
	] on: Error , Admonition do: [:ex1 |
		HttpServer debug ifTrue: [self halt].
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

	^self basicNew
		initialize;
		yourself
%
category: 'running'
classmethod: HttpServer
postCommitAction
	"The application has an opportunity to do any post-response action.
	For example, one application sends an email after the commit.

		(Delay forMilliseconds: 20) wait."
%
category: 'running'
classmethod: HttpServer
purgeRequestLog

	^self purgeRequestLogKeeping: 500.
%
category: 'running'
classmethod: HttpServer
purgeRequestLogKeeping: anInteger
	"Delete everything the most recent anInteger entries"

	1 to: requestLog size by: 500 do: [:i |
		[
			0 to: 499 do: [:j |
				| k x |
				k := i + j.
				(k <= (requestLog size - anInteger) and: [(x := requestLog at: k) notNil and: [x key isKindOf: HttpRequest]]) ifTrue: [
					requestLog at: k put: nil.
				].
			].
			System commitTransaction.
		] whileFalse: [
			System abort.
		].
	].
	System commit.
	requestLog := requestLog reject: [:each | each isNil].
	System commit.
%
category: 'running'
classmethod: HttpServer
requestLog

	^requestLog ifNil: [requestLog := Array new]
%
category: 'running'
classmethod: HttpServer
resetRequestLog

	requestLog := Array new.
%
! ------------------- Instance methods for HttpServer
set compile_env: 0
category: 'Accessing'
method: HttpServer
 listenBacklog: anInteger

	listenBacklog := anInteger.
%
category: 'Accessing'
method: HttpServer
port: anInteger

	port := anInteger.
%
set compile_env: 0
category: 'Initializing'
method: HttpServer
initialize

	listenBacklog := 5.
	port := 8888.
	GsSocket closeAll.	"debugging could have left some open sockets"
	System 		"some extra overhead, but we want to get exception stacks"
		gemConfigurationAt: #GemExceptionSignalCapturesStack
		put: true.
	self class requestLog.	"to ensure that it exists; create now and commit"
	System commit.
%
set compile_env: 0
category: 'Logging'
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
			response sendContentsBlock: [:_socket |
				[gsFile atEnd not] whileTrue: [_socket write: (gsFile next: 32000)].
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
		logEntry key: request.
		request method isEmpty ifTrue: [
			self log: #'warning' string: 'Got an empty request'.
			^self.
		].
		self respondToRequestInLogEntry: logEntry.		"<- work is done here for dynamic content"
		response := logEntry value.
		response ifNil: [		"no dynamic content available, try static content"
			logEntry value: request path.
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
		HttpServer debug ifTrue: [self halt].
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

	^self critical: [self class requestLog add: DateTime now -> nil].
%
category: 'Request Handler'
method: HttpServer
openFile: pathString
	"We will check to see if there is a static file available that matches the path."

	| file path |
	file := pathString.
	(path := self class htdocs) ifNil: [^nil]. "Should we offer static files?"
	(file includesString: '../') ifTrue: [^nil]. "Is request for a file below provided path?"
	(file isEmpty or: [file = '/']) ifTrue: [file := '/index.html'].
	^GsFile openReadOnServer: path , file
%
category: 'Request Handler'
method: HttpServer
respondToRequestInLogEntry: aLogEntry
	"We are in a forked process (thread) and aLogEntry.key contains anHttpRequest.
	We put something in aLogEntry.value and return.
	The action might be done in our Gem or in a remote (worker) Gem."

	self class handleRequestLogEntry: aLogEntry.	"<- work is done either here"
%
category: 'Request Handler'
method: HttpServer
sendResponse: anHttpResponse on: aSocket

	[
		anHttpResponse sendResponseOn: aSocket.
		self class log: #'debug' string: 'Response sent to socket: ', aSocket asOop asString, ' fDesc: ' , aSocket fileDescriptor printString
	] on: Error do: [:ex |
		HttpServer debug ifTrue: [self halt].
		self class log: #'error' string: ex description , ' - socket: ', aSocket asOop asString,  Character lf asString , (GsProcess stackReportToLevel: 40).
	].
%
set compile_env: 0
category: 'Web Server'
method: HttpServer
accept

	^socket accept
%
category: 'Web Server'
method: HttpServer
configureCertificates

	| password |
	password := GsSecureSocket getPasswordFromFile: '$GEMSTONE/examples/openssl/private/server_1_server_passwd.txt'.
	GsSecureSocket
		useServerCertificateFile: '$GEMSTONE/examples/openssl/certs/server_1_servercert.pem'
		withPrivateKeyFile: '$GEMSTONE/examples/openssl/private/server_1_serverkey.pem'
		privateKeyPassphrase: password.

	"Don't request a certificate from the client. This is typical."
	GsSecureSocket disableCertificateVerificationOnServer.

	"Use all ciphers except NULL ciphers and anonymous Diffie-Hellman and sort by strength."
	GsSecureSocket setServerCipherListFromString: 'ALL:!ADH:@STRENGTH'.

	self log: #'debug' string: 'specified certificate, private key, and password'.
%
category: 'Web Server'
method: HttpServer
createListener
	"set up the listening socket"

	(socket makeServer: listenBacklog atPort: port) ifNil: [
		| string |
		string := socket lastErrorString.
		socket close.
		socket := nil.
		self error: string.
	].
	self class log: #'debug' string: 'listening on a' , socket class name , '(' , socket asOop printString , ')'.
%
category: 'Web Server'
method: HttpServer
mainLoop

	[
		self shouldKeepRunning.
	] whileTrue: [
		| flag newSocket |
		flag := socket readWillNotBlockWithin: 60000. 	"60,000 milliseconds = 60 seconds"
		[flag] whileTrue: [
			self log: #'debug' string: 'received connection request'.
			newSocket := acceptBlock value.
			self log: #'debug' string: 'accepted connection request'.
			newSocket isNil ifTrue: [
				self class log: #'warning' string: 'ReadWillNotBlock but accept failed!'.
				flag := false.
			] ifFalse: [
				self class log: #'debug' string: 'accepted serverSocket ' , newSocket asOop asString, ' fileDesc: ' , newSocket fileDescriptor printString.
				self serveClientSocket: newSocket.
				flag := socket readWillNotBlock.
			].
		].
	].
%
category: 'Web Server'
method: HttpServer
reportUrlWithProtocol: aString
	"log some startup information"

	| serverURL |
	serverURL := aString , '://' , (GsSocket getHostNameByAddress: ((System descriptionOfSession: System session) at: 11)) , ':' , port printString , '/'.
	self class log: #'startup' string: serverURL.
%
category: 'Web Server'
method: HttpServer
seccureAccept

	| newSocket | 
	newSocket := socket accept. 
	newSocket secureAccept ifTrue: [^newSocket].
	self error: newSocket lastErrorString.
%
category: 'Web Server'
method: HttpServer
serveClientSocket: aSocket
	"Serve the request on the client socket in a forked process."

	[
		[aSocket isConnected
			ifTrue: [self handleRequestOn: aSocket]		"<- work is done here"
			ifFalse: [self log: #'warning' string: 'Socket is not connected: ' , aSocket asOop asString].
		] ensure: [
			aSocket close.
		].
		System commit.
	] fork.
	Processor yield.		"let new process get started"
%
category: 'Web Server'
method: HttpServer
shouldKeepRunning

	^System commitTransaction
%
category: 'Web Server'
method: HttpServer
startHttpServer

	socket := GsSignalingSocket new.
	acceptBlock := [self accept].
	self 
		reportUrlWithProtocol: 'http';
		startServer.
%
category: 'Web Server'
method: HttpServer
startHttpsServer

	socket := GsSecureSocket newServer.
	acceptBlock := [self secureAccept].
	self 
		configureCertificates;
		reportUrlWithProtocol: 'https';
		startServer.
%
category: 'Web Server'
method: HttpServer
startServer
	"primary entry point; called immediately after initialization"

	[
		self createListener.
		self mainLoop.		"<- work is done here"
	] ensure: [
		socket close.
		socket := nil.
	].
%
