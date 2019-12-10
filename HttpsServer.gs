
expectvalue /Class
doit
HttpsServer category: 'User Interface'
%

! ------------------- Remove existing behavior from HttpsServer
expectvalue /Metaclass3
doit
HttpsServer removeAllMethods.
HttpsServer class removeAllMethods.
%
! ------------------- Class methods for HttpsServer
set compile_env: 0
category: 'other'
classmethod: HttpsServer
serveOnPort: portInteger delegate: anObject withWorkerGemCount: sessionCountInteger

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
	super
		serveOnPort: portInteger
		delegate: anObject
		withWorkerGemCount: sessionCountInteger
%
! ------------------- Instance methods for HttpsServer
set compile_env: 0
category: 'Web Server'
method: HttpsServer
acceptSocket

	| socket |
	(socket := self listeningSocket accept) ifNil: [^nil].
	self log: #'debug' string: 'accepted normal connection on ' , socket printString.
	[
		socket secureAccept.
	] on: SocketError do: [:ex |
		self log: #'error' string: ex description.
		socket close.
		^nil
	].
	self log: #'debug' string: 'established secure connection on ' , socket printString.
	^socket
%
category: 'Web Server'
method: HttpsServer
newServerSocket

	^GsSecureSocket newServer
%
category: 'Web Server'
method: HttpsServer
protocol

	^'https'
%
