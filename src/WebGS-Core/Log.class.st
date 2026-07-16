Class {
	#name : 'Log',
	#superclass : 'Object',
	#instVars : [
		'haltOnError',
		'logFileName',
		'logTypes'
	],
	#classInstVars : [
		'instance'
	],
	#category : 'WebGS-Core'
}

{ #category : 'other' }
Log class >> instance [

	instance ifNil: [
		instance := self basicNew initialize; yourself.
		System commit.
	].
	^instance
]

{ #category : 'other' }
Log class >> new [

	self error: 'Use #''instance''!'.
]

{ #category : 'other' }
Log >> haltIfRequested [

	haltOnError ifTrue: [self halt].
]

{ #category : 'other' }
Log >> haltOnError: aBoolean [

	haltOnError := aBoolean.
]

{ #category : 'other' }
Log >> initialize [

	haltOnError := false.
	logFileName := (System performOnServer: 'pwd') trimSeparators, '/webServer.log'.
	logTypes := #(#'startup' "#'debug' #'warning'" #'error').
]

{ #category : 'other' }
Log >> log: aSymbol string: aString [
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
]

{ #category : 'other' }
Log >> logFileName: aString [

	logFileName := aString.
]

{ #category : 'other' }
Log >> logTypes [

	^logTypes
]

{ #category : 'other' }
Log >> logTypes: anArray [
"
	Log instance logTypes: #(#'startup' #'debug' #'warning' #'error').
"
	logTypes := anArray.
]
