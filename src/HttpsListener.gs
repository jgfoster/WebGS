! ------------------- Remove existing behavior from HttpsListener
removeAllMethods HttpsListener
removeAllClassMethods HttpsListener
! ------------------- Class methods for HttpsListener
! ------------------- Instance methods for HttpsListener
set compile_env: 0
category: 'Web Server'
method: HttpsListener
initialize

	super initialize.
	self configureCertificates.
%
category: 'Web Server'
method: HttpsListener
mainLoopBody: aSocket

	| t1 t2 |
	t1 := System timeNs.
	[
		aSocket secureAccept ifFalse: [
			System sessionCacheStatAt: 2 incrementBy: 1.	"secure accept failure count"
			Log instance log: #'warning' string: aSocket lastErrorString.
			^self
		].
	] on: Error do: [:ex |
		System sessionCacheStatAt: 2 incrementBy: 1.	"secure accept failure count"
		Log instance log: #'warning' string: aSocket lastErrorString.
		^self
	]
	t2 := System timeNs.
	System sessionCacheStatAt: 1 incrementBy: (t2 - t1) // 1000.	"time in secure accept (us)"
	super mainLoopBody: aSocket.
%
category: 'Web Server'
method: HttpsListener
newSocket

	^GsSecureSocket newServer
%
category: 'Web Server'
method: HttpsListener
protocol

	^'https'
%
category: 'Web Server'
method: HttpsListener
configureCertificates

	| password |
	Log instance log: #'debug' string: 'HttpsListener>>configureCertificates'.
	password := GsSecureSocket getPasswordFromFile: '$GEMSTONE/examples/openssl/private/server_1_server_passwd.txt'.
	GsSecureSocket
		useServerCertificateFile: '$GEMSTONE/examples/openssl/certs/server_1_servercert.pem'
		withPrivateKeyFile: '$GEMSTONE/examples/openssl/private/server_1_serverkey.pem'
		privateKeyPassphrase: password.

	"Don't request a certificate from the client. This is typical."
	GsSecureSocket disableCertificateVerificationOnServer.

	"Use all ciphers except NULL ciphers and anonymous Diffie-Hellman and sort by strength."
	GsSecureSocket setServerCipherListFromString: 'ALL:!ADH:@STRENGTH'.
%
