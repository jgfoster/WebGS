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
category: 'running'
classmethod: HttpServer
handleRequestLogEntry: aLogEntry
	"This is called from the Gem that handles the socket and
	may be run in a separate gem (see HttpConcurrentServer).
	aLogEntry.key contains anHttpRequest and the role of this method
	is to end with aLogEntry.value containing either anHttpResponse or
	anException."

self error: 'do we call this?'.
	[
		| request response |
		AlmostOutOfMemory enable.
		request := aLogEntry key.
		self log: #'debug' string: 'HttpServer class>> handleRequestLogEntry: - a - ' , aLogEntry printString.
		self log: #'debug' string: 'HttpServer class>> handleRequestLogEntry: - b' , ' - ' ,
			(SessionTemps current at: #'HttpServer_listeningSocket') readWillNotBlock printString.
		response := self responseForRequest: request.		"<- work is done here"
		self log: #'debug' string: 'HttpServer class>> handleRequestLogEntry: - c'.
		(SessionTemps current at: #'HttpServer_listeningSocket') readWillNotBlock.
		self log: #'debug' string: 'HttpServer class>> handleRequestLogEntry: - d'.
		response ifNotNil: [response setDate].
		aLogEntry value: response.
		"System commit.
		self postCommitAction."
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
postCommitAction
	"The application has an opportunity to do any post-response action.
	For example, one application sends an email after the commit.

		(Delay forMilliseconds: 20) wait."
%
category: 'running'
classmethod: HttpServer
responseForRequest: anHttpRequest

	| response |
self error: 'do we call this?'.
	self log: #'debug' string: 'HttpServer class>>responseForRequest: - a'.
	self log: #'debug' string: 'HttpServer class>>responseForRequest: - b' , ' - ' ,
			(SessionTemps current at: #'HttpServer_listeningSocket') readWillNotBlock printString.
	response := self new responseForRequest: anHttpRequest.
	self log: #'debug' string: 'HttpServer class>>responseForRequest: - c'.
	(SessionTemps current at: #'HttpServer_listeningSocket') readWillNotBlock.
	self log: #'debug' string: 'HttpServer class>>responseForRequest: - d'.
	^response
%
! ------------------- Instance methods for HttpServer
set compile_env: 0
category: 'Request Handler'
method: HttpServer
buildResponse

	self subclassResponsibility.
%
category: 'Request Handler'
method: HttpServer
handleRequest
	"We are in a forked process (thread) and socket has the unread request (new socket from accept)"

	self log: #'debug' string: 'HttpServer>>handleRequest'.
	request := HttpRequest readFromSocket: socket.
	request method isEmpty ifTrue: [
		self log: #'warning' string: 'Got an empty request'.
		^self.
	].
	request isWebSocketUpgrade ifTrue: [
		^self wsRequest: request socket: socket
	].
	response := HttpResponse new.
	self buildResponse.		"<- work is done here for dynamic content"
	response ifNil: [		"no dynamic content available, try static content"
		self handleRequestForFile.
	] ifNotNil: [
		self sendResponse.	"dynamic content is returned here"
	].
%
category: 'Request Handler'
method: HttpServer
handleRequestForFile
	"The delegate returned nil, indicating that it didn't have a response to offer.
	We will check to see if there is a static file available that matches the path."

	| gsFile |
	(gsFile := self openFile) ifNil: [	"does file exist?"
		response := HttpResponse notFound: request path.
		self sendResponse.
		^self.
	].
	[
		response := HttpResponse new
			contentLength: gsFile fileSize;
			lastModified: gsFile lastModified;
			contentType: (self class contentTypeFor: gsFile pathName);
			yourself.
		request method = 'HEAD' ifFalse: [	"A HEAD request has the file size and type but not the contents."
			response sendContentsBlock: [:_socket |
				[gsFile atEnd not] whileTrue: [socket write: (gsFile next: 32000)].
			].
		].
		self sendResponse.
	] ensure: [
		gsFile close.
	].
%
category: 'Request Handler'
method: HttpServer
handleRequestWithErrorHandling
	"We are in a forked process (thread) and socket has the unread request (new socket from accept)"

	[
		self handleRequest.
	] on: Error , Admonition do: [:ex |
		HttpServer debug ifTrue: [self halt].
		self class log: #'error' string:
			ex printString , Character lf asString ,
			(GsProcess stackReportToLevel: 50).
		response := HttpResponse serverError: ex.
		self sendResponse.
	].
%
category: 'Request Handler'
method: HttpServer
openFile
	"We will check to see if there is a static file available that matches the path."

	| file path |
	file := request path.
	(path := self class htdocs) ifNil: [^nil]. "Should we offer static files?"
	(file includesString: '../') ifTrue: [^nil]. "Is request for a file below provided path?"
	(file isEmpty or: [file = '/']) ifTrue: [file := '/index.html'].
	^GsFile openReadOnServer: path , file
%
category: 'Request Handler'
method: HttpServer
sendResponse

	[
		response sendResponseOn: socket.
		self class log: #'debug' string: 'Response sent to socket: ', socket asOop asString, ' fDesc: ' , socket fileDescriptor printString.
	] on: Error do: [:ex |
		HttpServer debug ifTrue: [self halt].
		self class log: #'error' string: ex description , ' - socket: ', socket asOop asString,  Character lf asString , (GsProcess stackReportToLevel: 40).
	].
%
category: 'Request Handler'
method: HttpServer
serveClientSocket: aSocket
	"Serve the request in a forked process."

	socket := aSocket.
	self log: #'debug' string: 'HttpServer>>serveClientSocket: ' , socket asOop asString , 
		' isConnected ' , socket isConnected asString, '; error: ' , socket lastErrorString printString.
	[socket isConnected
		ifTrue: [self handleRequestWithErrorHandling]		"<- work is done here"
		ifFalse: [self log: #'warning' string: 'Socket is not connected: ' , socket asOop asString].
	] ensure: [
		socket close.
		socket := nil.
	].
%
set compile_env: 0
category: 'WebSockets'
method: HttpServer
wsEventOn: aSocket

	| frame |
	(aSocket readWillNotBlockWithin: self wsReadTimeoutMS) ifFalse: [
		^self wsOnIdle
	].
	frame := WebSocketDataFrame fromSocket: aSocket.
	frame isPing ifTrue: [
		WebSocketDataFrame sendPongData: frame data onSocket: aSocket.
		^self
	].
	frame isText ifTrue: [
		^self wsOnText: frame data
	].
	frame isDisconnect ifTrue: [
		WebSocketDataFrame sendPongData: frame data onSocket: aSocket.
		aSocket close.
		Processor activeProcess terminate.	"There isn't really anything to return!"
	].
	self error: 'Unrecognized frame'.
%
category: 'WebSockets'
method: HttpServer
wsOnIdle
	"override to do something interesting"
%
category: 'WebSockets'
method: HttpServer
wsOnText: bytes
	"override to do something interesting"
%
category: 'WebSockets'
method: HttpServer
wsReadTimeoutMS

	^10000
%
category: 'WebSockets'
method: HttpServer
wsRequest: aRequest socket: aSocket

	self wsUpgradeRequest: aRequest socket: aSocket.
	[aSocket isConnected] whileTrue: [
		self wsEventOn: aSocket.
	].
	self error: 'Client did not send proper disconnect message!'.
%
category: 'WebSockets'
method: HttpServer
wsSecureResponseFor: aKey
	"If the Key is 'dGhlIHNhbXBsZSBub25jZQ==', the response is 's3pPLMBiTxaQ9kYGzzhZRbK+xOo='."

	| bytes key sha1 stream |
	key := aKey , '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'.
	sha1 := key asSha1String.
	stream := ReadStream on: sha1.
	bytes := ByteArray new.
	[stream atEnd not] whileTrue: [
		bytes add: ('16r' , stream next asString , stream next asString) asNumber.
	].
	^bytes asBase64String
%
category: 'WebSockets'
method: HttpServer
wsUpgradeRequest: aRequest socket: aSocket

	| count crlf key version |
	version := aRequest headers at: 'Sec-WebSocket-Version' ifAbsent: ['0'].
	version asNumber < 13 ifTrue: [
		self error: 'WebSocketSample requires at least version 13!'.
	].
	crlf := Character cr asString , Character lf asString.
	key := aRequest headers at: 'Sec-WebSocket-Key' ifAbsent: [''].
	key := self wsSecureResponseFor: key.
	response := 'HTTP/1.1 101 Switching Protocols' , crlf ,
		'Upgrade: websocket' , crlf ,
		'Connection: Upgrade' , crlf ,
		'Sec-WebSocket-Accept: ' , key , crlf , crlf.
	count := aSocket write: response.
	count == response size ifFalse: [self error: 'Unable to write response!'].
%
