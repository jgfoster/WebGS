! ------------------- Remove existing behavior from WebExternalSession
expectvalue /Metaclass3       
doit
WebExternalSession removeAllMethods.
WebExternalSession class removeAllMethods.
%
! ------------------- Class methods for WebExternalSession
! ------------------- Instance methods for WebExternalSession
set compile_env: 0
category: 'other'
method: WebExternalSession
hostPassword: aString

	hostPassword := aString copy
%
category: 'other'
method: WebExternalSession
login

	| result |
	stoneSessionId ifNotNil: [
		ImproperOperation signal: 'Stone session ' , stoneSessionId printString ,
			' already associated with this GsExternalSession!'.
	].
	self _gciLibrary
		GciSetNetEx_: parameters gemStoneName
		_: parameters hostUsername
		_: hostPassword
		_: parameters gemService
		_: 0.		"parameters passwordIsEncryptedAsIntegerBoolean."	"1 or 0: GCI_LOGIN_PW_ENCRYPTED"
	self _signalIfError.
	result := self _gciLibrary
		GciLoginEx_: parameters username
		_: password
		_: (parameters loginFlags bitAnd: 1 bitInvert)
		_: 0. "haltOnErrNum"
	self _signalIfError.
	0 == result ifTrue: [
		self error: 'Login failed for unknown reason!'.
	].
	gciSessionId := self _gciLibrary GciGetSessionId.
	stoneSessionId := Object _objectForOop: (self _gciLibrary GciPerform_: System asOop _: 'session' _: nil _: 0).
	self _signalIfError.
	self _isOnMyStone ifTrue: [
		stoneSessionSerial := GsSession serialOfSession: stoneSessionId.
		gemProcessId := (System descriptionOfSession: stoneSessionId) at: 2.
	] ifFalse: [
		stoneSessionSerial := self executeString: 'GsSession currentSession serialNumber'.
		gemProcessId := self executeString: 'System gemVersionAt: #''processId'''.
	].
	self log: 'GsExternalSession login: ' , self _describe.
%
category: 'other'
method: WebExternalSession
password: aString

	password := aString copy
%
category: 'other'
method: WebExternalSession
_isOnMyStone
	"GemStone has a bug in this method and we are always on the current stone!"

	^true
%
category: 'other'
method: WebExternalSession
_signalIfError

	(GsExternalSession canUnderstand: #'_signalIfError') ifTrue: [	"3.6.0 and later"
		super _signalIfError.
	] ifFalse: [
		self _signalIfError: self _gciLibrary.
	].
%
