! ------------------- Remove existing behavior from Log
removeAllMethods Log
removeAllClassMethods Log
! ------------------- Class methods for Log
set compile_env: 0
category: 'other'
classmethod: Log
instance

	instance ifNil: [
		instance := self basicNew initialize; yourself.
		System commit.
	].
	^instance
%
category: 'other'
classmethod: Log
new

	self error: 'Use #''instance''!'.
%
! ------------------- Instance methods for Log
set compile_env: 0
category: 'other'
method: Log
haltIfRequested

	haltOnError ifTrue: [self halt].
%
category: 'other'
method: Log
haltOnError: aBoolean

	haltOnError := aBoolean.
%
category: 'other'
method: Log
initialize

	haltOnError := false.
	logFileName := (System performOnServer: 'pwd') trimSeparators, '/webServer.log'.
	logTypes := #(#'startup' "#'debug' #'warning'" #'error').
%
category: 'other'
method: Log
log: aSymbol string: aString
	"Write a string to the log if aSymbol in logTypes.
Log instance log: #'debug' string: 'something'.
"

	(logTypes includes: aSymbol) ifTrue: [
		| string |
		string := DateAndTime now printStringWithRoundedSeconds , 
			' - ', System gemProcessId printString ,
			' - ', Processor activeProcess asOop printString , 
			' - ' , aSymbol  , 
			' - ' , aString.
		System clientIsRemote ifTrue: [
			(GsFile openAppendOnServer: logFileName) log: string; close.
		] ifFalse: [ 	"stdout for linked topaz"
			GsFile gciLogServer: string.
		]
	].
%
category: 'other'
method: Log
logFileName: aString

	logFileName := aString.
%
category: 'other'
method: Log
logTypes

	^logTypes
%
category: 'other'
method: Log
logTypes: anArray
"
	Log instance logTypes: #(#'startup' #'debug' #'warning' #'error').
"
	logTypes := anArray.
%
