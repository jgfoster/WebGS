Class {
	#name : 'HttpResponse',
	#superclass : 'Object',
	#instVars : [
		'code',
		'headers',
		'content',
		'sendContentsBlock'
	],
	#classInstVars : [
		'cachedDateTime',
		'cachedWebStringForDateTime'
	],
	#category : 'WebGS-Core'
}

{ #category : 'other' }
HttpResponse class >> new [

	^self basicNew
		initialize;
		yourself
]

{ #category : 'other' }
HttpResponse class >> notFound: aString [

	^self new notFound: aString
]

{ #category : 'other' }
HttpResponse class >> serverError: anException [

	^self new serverError: anException
]

{ #category : 'other' }
HttpResponse class >> webStringForDateTime: aDateTime [

	(cachedDateTime notNil 
		and: [aDateTime yearGmt == cachedDateTime year 
		and: [aDateTime dayOfYearGmt == cachedDateTime dayOfYearGmt 
		and: [(aDateTime millisecondsGmt // 1000) == (cachedDateTime millisecondsGmt // 1000)]]])
		ifTrue: [^cachedWebStringForDateTime].
	cachedDateTime := aDateTime.
	cachedWebStringForDateTime := (WriteStream on: String new)
		nextPutAll: (#('Sun' 'Mon' 'Tue' 'Wed' 'Thu' 'Fri' 'Sat') at: aDateTime dayOfWeekGmt); space;
		nextPutAll: (aDateTime asStringGmtUsingFormat: #(1 2 3 $  2 1 $: true true false false));
		nextPutAll: ' GMT';
		contents.
	^cachedWebStringForDateTime
]

{ #category : 'other' }
HttpResponse >> _content [

	^content
]

{ #category : 'other' }
HttpResponse >> accessControlAllowHeaders: aStringOrNil [

	aStringOrNil ifNil: [
		headers
			removeKey: 'Access-Control-Allow-Headers'
			ifAbsent: [].
	] ifNotNil: [
		headers
			at: 'Access-Control-Allow-Headers'
			put: aStringOrNil.
	].
]

{ #category : 'other' }
HttpResponse >> accessControlAllowOrigin: aStringOrNil [

	aStringOrNil ifNil: [
		headers
			removeKey: 'Access-Control-Allow-Origin'
			ifAbsent: [].
	] ifNotNil: [
		headers
			at: 'Access-Control-Allow-Origin'
			put: aStringOrNil.
	].
]

{ #category : 'other' }
HttpResponse >> beNoCache [

	headers
		at: 'Cache-Control'
		put: 'no-cache'.
]

{ #category : 'other' }
HttpResponse >> code [

	^code
]

{ #category : 'other' }
HttpResponse >> code: anInteger [

	code := anInteger.
]

{ #category : 'other' }
HttpResponse >> content: anObject [

	content := (anObject isKindOf: String)
		ifTrue: [anObject]
		ifFalse: [anObject asJson].
	self isUTF8 ifFalse: [content := content encodeAsUTF8].
	self contentLength: content size.
]

{ #category : 'other' }
HttpResponse >> contentDisposition: aStringOrNil [

	aStringOrNil ifNil: [
		headers
			removeKey: 'Content-Disposition'
			ifAbsent: [].
	] ifNotNil: [
		headers
			at: 'Content-Disposition'
			put: aStringOrNil.
	].
]

{ #category : 'other' }
HttpResponse >> contentLength: anInteger [

	(anInteger isKindOf: Integer) ifFalse: [self error: anInteger printString , ' is a(n) ' , anInteger class name].
	headers
		at: 'Content-Length'
		put: anInteger printString.
]

{ #category : 'other' }
HttpResponse >> contentType: aString [

	headers
		at: 'Content-Type'
		put: aString.
	(aString = 'image/png' or: [aString = 'image/x-icon']) ifTrue: [
		headers
			at: 'Cache-Control' 	put: 'max-age=86400';
			at: 'Expires'				put: (HttpResponse webStringForDateTime: (DateTime now addDays: 1));
			yourself.
	].
]

{ #category : 'other' }
HttpResponse >> hasContent [

	^content notNil or: [sendContentsBlock notNil].
]

{ #category : 'other' }
HttpResponse >> headers [

	^headers
]

{ #category : 'other' }
HttpResponse >> initialize [

	headers := Dictionary new
		at: 'Date'		put: (HttpResponse webStringForDateTime: DateTime now);
		at: 'Server'	put: 'WebGS';
		"at: 'Accept-Ranges'		put: 'bytes';
		at: 'Allow'							put: 'GET, HEAD, OPTIONS, POST';
		at: 'Cache-Control'			put: 'no-cache';
		at: 'Content-Encoding'	put: 'none';
		at: 'Content-Language'	put: 'en';
		at: 'Content-Type'			put: 'text/plain; charset=UTF-8';
		at: 'Access-Control-Allow-Origin'		put: '*';
		at: 'Access-Control-Allow-Methods'	put: '*';
		at: 'Access-Control-Allow-Headers'	put: '*';
		at: 'Access-Control-Max-Age'				put: '86400';	"
		yourself.
	code := 200.
]

{ #category : 'other' }
HttpResponse >> isUTF8 [

	^(headers at: 'Content-Type' ifAbsent: ['']) asLowercase includesString: 'utf-8'.
]

{ #category : 'other' }
HttpResponse >> lastModified: aDateTime [

	headers
		at: 'Last-Modified'
		put: (HttpResponse webStringForDateTime: aDateTime).
]

{ #category : 'other' }
HttpResponse >> location: aString [

	headers
		at: 'Location'
		put: aString.
]

{ #category : 'other' }
HttpResponse >> maxAge: anInteger [

	headers
		at: 'Cache-Control'
		put: 'max-age=' , anInteger printString.
]

{ #category : 'other' }
HttpResponse >> notFound: aString [

	self
		code: 404;
		content: aString , ' not found!';
		yourself.
]

{ #category : 'other' }
HttpResponse >> printAllExceptContentOn: aStream [

	| crlf |
	crlf := Character cr asString , Character lf asString.
	aStream
		nextPutAll: 'HTTP/1.1 ';
		nextPutAll: code printString; space;
		nextPutAll: self reasonPhrase;
		nextPutAll: crlf;
		yourself.
	headers keys asSortedCollection do: [:each |
		aStream
			nextPutAll: each;
			nextPutAll: ': ';
			nextPutAll: (headers at: each);
			nextPutAll: crlf;
		yourself.
	].
	aStream nextPutAll: crlf.
]

{ #category : 'other' }
HttpResponse >> printOn: aStream [

	| crlf |
	crlf := Character cr asString , Character lf asString.
	self printAllExceptContentOn: aStream.
	aStream
		nextPutAll: (content ifNil: [''] ifNotNil: [content asUnicodeString]);
		nextPutAll: crlf;
		yourself.
]

{ #category : 'other' }
HttpResponse >> reasonPhrase [

	^(Dictionary new
		at: 200 put: 'OK';
		at: 204 put: 'No Content';
		at: 303 put: 'See Other';
		at: 404 put: 'Not Found';
		at: 405 put: 'Method Not Allowed';
		at: 426 put: 'Upgrade Required';
		at: 500 put: 'Internal Server Error';
		yourself)
		at: code
		ifAbsent: ['Unknown Error'].
]

{ #category : 'other' }
HttpResponse >> redirectTo: aString [

	self
		code: 303;
		location: aString;
		yourself.
]

{ #category : 'other' }
HttpResponse >> send: aString [

	self 
		code: 200;
		content: aString;
		yourself
]

{ #category : 'other' }
HttpResponse >> sendContentsBlock: aOneArgumentBlock [
	"If you want to do your own streaming, then provide a block that takes a socket"

	sendContentsBlock := aOneArgumentBlock.
]

{ #category : 'other' }
HttpResponse >> sendResponseOn: aSocket [

	| stream string count t1 t2 |
	stream := WriteStream on: String new.
	self printAllExceptContentOn: stream.		"Headers, etc."
	string := stream contents.
	Log instance log: #'debug' string: 'HttpResponse>>sendResponseOn: - ' , string printString.
	t1 := System timeNs.
	count := aSocket write: string.
	t2 := System timeNs.
	System sessionCacheStatAt: 7 incrementBy: (t2 - t1) // 1000.	"time in socket write (us)"
	count isNil ifTrue: [self error: aSocket lastErrorString].
	count < string size ifTrue: [self error: 'Tried to write ' , string size printString , ', but wrote ' , count printString].
	sendContentsBlock ifNil: [
		content ifNotNil: [
			content class isBytes ifFalse: [self error: 'content class is is ' , content class name].
			aSocket write: content.
		].
	] ifNotNil: [
		sendContentsBlock value: aSocket.
	].
]

{ #category : 'other' }
HttpResponse >> serverError: anException [

	| html description |
	self code: 500.
	((description := anException description) isKindOf: String) ifFalse: [description := description printString].
	self content: description.
]

{ #category : 'other' }
HttpResponse >> setCookie: keyString value: valueString [

	self
		setCookie: keyString
		value: valueString
		path: nil
		maxAge: 365 * 24 * 60 * 60		"usually one year"
		secure: false
		serverOnly: false
		sameSite: false.
]

{ #category : 'other' }
HttpResponse >> setCookie: keyString
	value: valueString
	path: pathString
	maxAge: secondsInteger
	secure: secureBoolean
	serverOnly: serverBoolean
	sameSite: sameSiteBoolean [

	| string |
	string := keyString , '=' , valueString , '; Path=' , (pathString ifNil: ['/'] ifNotNil: [pathString]).
	secondsInteger		ifNotNil:	[string := string , '; Max-Age=' , secondsInteger printString].
	secureBoolean 		ifTrue: 	[string := string , '; Secure'].
	serverBoolean 			ifTrue: 	[string := string , '; HttpOnly'].
	sameSiteBoolean 		ifTrue: 	[string := string , '; SameSite=Strict'].
	headers
		at: 'Set-Cookie'
		put: string
]

{ #category : 'other' }
HttpResponse >> setDate [

	headers
		at: 'Date'
		put: (HttpResponse webStringForDateTime: DateTime now).
]
