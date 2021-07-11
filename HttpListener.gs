! ------------------- Remove existing behavior from HttpListener
removeAllMethods HttpListener
removeAllClassMethods HttpListener
! ------------------- Class methods for HttpListener
set compile_env: 0
category: 'other'
classmethod: HttpListener
debug

	"Share the mutex across all processes in this gem"

	^SessionTemps current
		at: #'HttpServer_debug'
		ifAbsent: [false].
%
category: 'other'
classmethod: HttpListener
debug: aBoolean

	^SessionTemps current
		at: #'HttpServer_debug'
		put: aBoolean
%
category: 'other'
classmethod: HttpListener
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
category: 'other'
classmethod: HttpListener
logName

	^SessionTemps current
			at: #'HttpServer_logName'
			ifAbsentPut: [ (System performOnServer: 'pwd') trimSeparators, '/webServer.log' ]
%
category: 'other'
classmethod: HttpListener
logName: aString

	SessionTemps current
			at: #'HttpServer_logName'
			put: aString
%
category: 'other'
classmethod: HttpListener
new

	^self basicNew
		initialize;
		yourself
%
category: 'other'
classmethod: HttpListener
supportedLogTypes

	^SessionTemps current
			at: #'WebServer_logTypes'
			ifAbsentPut: [ #(#'startup' " #'debug' #'warning' " #'error') ]
%
category: 'other'
classmethod: HttpListener
supportedLogTypes: anArray
"
	HttpServer supportedLogTypes: #(#'startup' #'debug' #'warning' #'error').
"
	SessionTemps current
			at: #'WebServer_logTypes'
			put: anArray
%
! ------------------- Instance methods for HttpListener
set compile_env: 0
category: 'Accessing'
method: HttpListener
 listenBacklog: anInteger

	listenBacklog := anInteger.
%
category: 'Accessing'
method: HttpListener
port: anInteger

	port := anInteger.
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
set compile_env: 0
category: 'Logging'
method: HttpListener
log: aSymbol string: aString

	HttpServer log: aSymbol string: aString
%
set compile_env: 0
category: 'Web Server'
method: HttpListener
accept

	^socket accept
%
category: 'Web Server'
method: HttpListener
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
method: HttpListener
createListener
	"set up the listening socket"

	(socket makeServer: listenBacklog atPort: port) ifNil: [
		| string |
		string := socket lastErrorString.
		socket close.
		socket := nil.
		self error: string.
	].
	self log: #'debug' string: 'listening on a' , socket class name , '(' , socket asOop asString, ' fileDesc: ' , socket fileDescriptor printString , ')'.
%
category: 'Web Server'
method: HttpListener
mainLoop

	[
		self shouldKeepRunning.
	] whileTrue: [
		| flag |
		flag := socket readWillNotBlockWithin: 60000. 	"60 seconds"
		[flag] whileTrue: [
			| newSocket |
			newSocket := acceptBlock value.
			newSocket isNil ifTrue: [
				self log: #'warning' string: 'GsSocket>>readWillNotBlock returned true but accept failed!'.
			] ifFalse: [
				[:aSocket |
					self log: #'debug' string: 'Accepted socket ' , aSocket asOop asString, 
						' fileDesc: ' , aSocket fileDescriptor printString , 
						' isConnected: ' , aSocket isConnected asString.
					self class new serveClientSocket: aSocket.		"<== work is done here"
				] forkWith: (Array with: newSocket).
			].
			flag := socket readWillNotBlock.
		].
	].
%
category: 'Web Server'
method: HttpListener
reportUrlWithProtocol: aString
	"log some startup information"

	| serverURL |
	serverURL := aString , '://' , (GsSocket getHostNameByAddress: ((System descriptionOfSession: System session) at: 11)) , ':' , port printString , '/'.
	self class log: #'startup' string: serverURL.
%
category: 'Web Server'
method: HttpListener
seccureAccept

	| newSocket | 
	newSocket := socket accept. 
	newSocket secureAccept ifTrue: [^newSocket].
	self error: newSocket lastErrorString.
%
category: 'Web Server'
method: HttpListener
serveClientSocket: aSocket

	self subclassResponsibility.
%
category: 'Web Server'
method: HttpListener
shouldKeepRunning

	^System commitTransaction
%
category: 'Web Server'
method: HttpListener
startHttpServer

	socket := GsSignalingSocket new.
	acceptBlock := [self accept].
	self 
		reportUrlWithProtocol: 'http';
		startServer.
%
category: 'Web Server'
method: HttpListener
startHttpsServer

	socket := GsSecureSocket newServer.
	acceptBlock := [self secureAccept].
	self 
		configureCertificates;
		reportUrlWithProtocol: 'https';
		startServer.
%
category: 'Web Server'
method: HttpListener
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
