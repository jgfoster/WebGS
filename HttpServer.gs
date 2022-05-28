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
		otherwise: 'text/html; charset=UTF-8'.
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
category: 'other'
classmethod: HttpServer
serveClientSocket: aSocket

	self new serveClientSocket: aSocket
%
category: 'other'
classmethod: HttpServer
shutdown
	"Nothing needs to be done!"
%
set compile_env: 0
category: 'required'
classmethod: HttpServer
htdocs
	"/path/to/static/files"

	^nil
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

	Log instance log: #'debug' string: 'HttpServer>>handleRequest'.
	request := HttpRequest readFromSocket: socket.
	request method isEmpty ifTrue: [
		Log instance log: #'warning' string: 'Got an empty request'.
		^self.
	].
	request isWebSocketUpgrade ifTrue: [
		self wsUpgradeRequest.
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
	Log instance log: #'debug' string: 'HttpServer>>handleRequestForFile'.
	(gsFile := self openFile) ifNil: [	"does file exist?"
		Log instance log: #'debug' string: 'HttpServer>>handleRequestForFile - not found!'.
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
		Log instance haltIfRequested.
		Log instance log: #'error' string:
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
	path := path , file.
	Log instance log: #'debug' string: 'HttpServer>>openFile - ' , path printString.
	^GsFile openReadOnServer: path
%
category: 'Request Handler'
method: HttpServer
sendResponse

	[
		response sendResponseOn: socket.
		Log instance log: #'debug' string: 'Response sent to socket: ', socket printString.
	] on: Error do: [:ex |
		Log instance haltIfRequested.
		Log instance log: #'error' string: ex description , ' - socket: ', socket printString,  Character lf asString , (GsProcess stackReportToLevel: 40).
	].
%
category: 'Request Handler'
method: HttpServer
serveClientSocket: aSocket
	"Serve the request in a forked process."

	socket := aSocket.
	Log instance log: #'debug' string: 'HttpServer>>serveClientSocket: ' , socket printString.
	[socket isConnected
		ifTrue: [self handleRequestWithErrorHandling]		"<- work is done here"
		ifFalse: [Log instance log: #'warning' string: 'Socket is not connected: ' , socket printString].
	] ensure: [
		socket close.
		socket := nil.
	].
%
set compile_env: 0
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
wsUpgradeRequest

	| count crlf key version |
	version := request headers at: 'sec-websocket-version' ifAbsent: ['0'].
	version asNumber < 13 ifTrue: [
		self error: 'WebSocketSample requires at least version 13!'.
	].
	crlf := Character cr asString , Character lf asString.
	key := request headers at: 'sec-websocket-key' ifAbsent: [''].
	key := self wsSecureResponseFor: key.
	response := 'HTTP/1.1 101 Switching Protocols' , crlf ,
		'Upgrade: websocket' , crlf ,
		'Connection: Upgrade' , crlf ,
		'Sec-WebSocket-Accept: ' , key , crlf , crlf.
	count := socket write: response.
	count == response size ifFalse: [self error: 'Unable to write response!'].
%
category: 'WebSockets'
method: HttpServer
wsWithBinaryDo: binaryBlock withTextDo: textBlock

	self wsWithBinaryDo: binaryBlock withTextDo: textBlock onDisconnectDo: [].
%
category: 'WebSockets'
method: HttpServer
wsWithBinaryDo: binaryBlock withTextDo: textBlock onDisconnectDo: disconnectBlock

	Log instance log: #'debug' string: 'HttpServer>>wsWithBinaryDo:withTextDo:'.
	[
		socket readWillNotBlockWithin: -1.	"Wait forever (other GsProcess instances can run and abort)"
	] whileTrue: [
		| frame |
		[
			frame := WebSocketDataFrame fromSocket: socket.
		] on: Error do: [:ex | 
			Log instance log: #'debug' string: 'HttpServer>>wsWithBinaryDo:withTextDo: - ' , ex description.
			Log instance haltIfRequested.
			WebSocketDataFrame sendDisconnect: 1002 onSocket: socket.
			socket close.
			Processor activeProcess terminate.	"There isn't really anything to return!"
		].
		frame isDisconnect ifTrue: [
			Log instance log: #'debug' string: 'HttpServer>>onDataDo: - disconnect - ' , frame data printString.
			WebSocketDataFrame sendDisconnect: frame data onSocket: socket.
			disconnectBlock value.
			socket close.
			Processor activeProcess terminate.	"There isn't really anything to return!"
		].
		frame isPing ifTrue: [
			Log instance log: #'debug' string: 'HttpServer>>onDataDo: - ping - ' , frame data printString.
			WebSocketDataFrame sendPongData: frame data onSocket: socket.
		] ifFalse: [
			frame isBinary ifTrue: [
				binaryBlock value: frame data.
			] ifFalse: [
				textBlock value: frame data decodeFromUTF8ToUnicode.
			].
		].
	].
%
