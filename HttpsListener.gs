! ------------------- Remove existing behavior from HttpsListener
removeAllMethods HttpsListener
removeAllClassMethods HttpsListener
! ------------------- Class methods for HttpsListener
! ------------------- Instance methods for HttpsListener
set compile_env: 0
category: 'other'
method: HttpsListener
accept

	| newSocket | 
	newSocket := socket accept. 
	newSocket secureAccept ifTrue: [^newSocket].
	self error: newSocket lastErrorString.
%
category: 'other'
method: HttpsListener
initialize

	super initialize.
	self configureCertificates.
%
category: 'other'
method: HttpsListener
protocol

	^'https'
%
category: 'other'
method: HttpsListener
socketClass

	^GsSecureSocket
%
set compile_env: 0
category: 'Web Server'
method: HttpsListener
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
