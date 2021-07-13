! ------------------- Remove existing behavior from HttpResponse
removeAllMethods HttpResponse
removeAllClassMethods HttpResponse
! ------------------- Class methods for HttpResponse
set compile_env: 0
category: 'other'
classmethod: HttpResponse
new

	^self basicNew
		initialize;
		yourself.
%
category: 'other'
classmethod: HttpResponse
notFound: aString

	^self new notFound: aString.
%
category: 'other'
classmethod: HttpResponse
serverError: anException

	^self new serverError: anException.
%
category: 'other'
classmethod: HttpResponse
webStringForDateTime: aDateTime

	^(WriteStream on: String new)
		nextPutAll: (#('Sun' 'Mon' 'Tue' 'Wed' 'Thu' 'Fri' 'Sat') at: aDateTime dayOfWeekGmt); space;
		nextPutAll: (aDateTime asStringGmtUsingFormat: #(1 2 3 $  2 1 $: true true false false));
		nextPutAll: ' GMT';
		contents.
%
! ------------------- Instance methods for HttpResponse
set compile_env: 0
category: 'other'
method: HttpResponse
accessControlAllowHeaders: aStringOrNil

	aStringOrNil ifNil: [
		headers
			removeKey: 'Access-Control-Allow-Headers'
			ifAbsent: [].
	] ifNotNil: [
		headers
			at: 'Access-Control-Allow-Headers'
			put: aStringOrNil.
	].
%
category: 'other'
method: HttpResponse
accessControlAllowOrigin: aStringOrNil

	aStringOrNil ifNil: [
		headers
			removeKey: 'Access-Control-Allow-Origin'
			ifAbsent: [].
	] ifNotNil: [
		headers
			at: 'Access-Control-Allow-Origin'
			put: aStringOrNil.
	].
%
category: 'other'
method: HttpResponse
beNoCache

	headers
		at: 'Cache-Control'
		put: 'no-cache'.
%
category: 'other'
method: HttpResponse
code

	^code.
%
category: 'other'
method: HttpResponse
code: anInteger

	code := anInteger.
%
category: 'other'
method: HttpResponse
content: aString

	content := aString.
	self isUTF8 ifFalse: [content := content encodeAsUTF8].
	self contentLength: content size.
%
category: 'other'
method: HttpResponse
contentDisposition: aStringOrNil

	aStringOrNil ifNil: [
		headers
			removeKey: 'Content-Disposition'
			ifAbsent: [].
	] ifNotNil: [
		headers
			at: 'Content-Disposition'
			put: aStringOrNil.
	].
%
category: 'other'
method: HttpResponse
contentLength: anInteger

	(anInteger isKindOf: Integer) ifFalse: [self error: anInteger printString , ' is a(n) ' , anInteger class name].
	headers
		at: 'Content-Length'
		put: anInteger printString.
%
category: 'other'
method: HttpResponse
contentType: aString

	headers
		at: 'Content-Type'
		put: aString.
	(aString = 'image/png' or: [aString = 'image/x-icon']) ifTrue: [
		headers
			at: 'Cache-Control' 	put: 'max-age=86400';
			at: 'Expires'				put: (HttpResponse webStringForDateTime: (DateTime now addDays: 1));
			yourself.
	].
%
category: 'other'
method: HttpResponse
hasContent

	^content notNil or: [sendContentsBlock notNil].
%
category: 'other'
method: HttpResponse
headers

	^headers.
%
category: 'other'
method: HttpResponse
initialize

	headers := Dictionary new
		at: 'Accept-Ranges'			put: 'bytes';
		at: 'Allow'						put: 'GET, HEAD, OPTIONS, POST';
		at: 'Cache-Control'			put: 'no-cache';
		at: 'Content-Encoding'		put: 'none';
		at: 'Content-Language'		put: 'en';
		at: 'Content-Type'			put: 'text/html; charset=UTF-8';
		at: 'Server'						put: 'GemStone/S 64 Bit HttpServer';
		yourself.
	code := 200.
%
category: 'other'
method: HttpResponse
isUTF8

	^(headers at: 'Content-Type') asLowercase includesString: 'utf-8'.
%
category: 'other'
method: HttpResponse
lastModified: aDateTime

	headers
		at: 'Last-Modified'
		put: (HttpResponse webStringForDateTime: aDateTime).
%
category: 'other'
method: HttpResponse
location: aString

	headers
		at: 'Location'
		put: aString.
%
category: 'other'
method: HttpResponse
maxAge: anInteger

	headers
		at: 'Cache-Control'
		put: 'max-age=' , anInteger printString.
%
category: 'other'
method: HttpResponse
notFound: aString

	| html |
	html := HtmlElement html.
	html body content: aString , ' not found!'.
	self
		code: 404;
		content: html printString;
		yourself.
%
category: 'other'
method: HttpResponse
printAllExceptContentOn: aStream

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
%
category: 'other'
method: HttpResponse
printOn: aStream

	| crlf |
	crlf := Character cr asString , Character lf asString.
	self printAllExceptContentOn: aStream.
	aStream
		nextPutAll: (content ifNil: [''] ifNotNil: [content asUnicodeString]);
		nextPutAll: crlf;
		yourself.
%
category: 'other'
method: HttpResponse
reasonPhrase

	^(Dictionary new
		at: 200 put: 'OK';
		at: 303 put: 'See Other';
		at: 404 put: 'Not Found';
		at: 405 put: 'Method Not Allowed';
		at: 426 put: 'Upgrade Required';
		at: 500 put: 'Internal Server Error';
		yourself)
		at: code
		ifAbsent: ['Unknown Error'].
%
category: 'other'
method: HttpResponse
redirectTo: aString

	self
		code: 303;
		location: aString;
		yourself.
%
category: 'other'
method: HttpResponse
sendContentsBlock: aOneArgumentBlock
	"If you want to do your own streaming, then provide a block that takes a socket"

	sendContentsBlock := aOneArgumentBlock.
%
category: 'other'
method: HttpResponse
sendResponseOn: aSocket

	| stream string count |
	stream := WriteStream on: String new.
	self printAllExceptContentOn: stream.		"Headers, etc."
	string := stream contents.
	count := aSocket write: string.
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
%
category: 'other'
method: HttpResponse
serverError: anException

	| html description |
	self code: 500.
	((description := anException description) isKindOf: String) ifFalse: [description := description printString].
	html := HtmlElement html.
	html body h3: [:h3 | h3 content: description].
	"(anException isKindOf: KermitUserError) ifTrue: [
		self code: 200.
	] ifFalse: ["
		(anException isKindOf: LockError) ifFalse: [
			| stackReport |
			stackReport := anException stackReport ifNil: [GsProcess stackReportToLevel: 100].
			(stackReport subStrings: Character lf) do: [:each |
				html body
					content: each;
					br.
			].
		].
	"]."
	html body form: [:form | form
		submitButton
			name: 'submit';
			value: 'Back';
			onclick: 'history.go(-1); return false;';
			yourself.
	].
	self content: html printString.
%
category: 'other'
method: HttpResponse
setCookie: keyString value: valueString

	self
		setCookie: keyString
		value: valueString
		path: nil
		maxAge: 365 * 24 * 60 * 60		"usually one year"
		secure: false
		serverOnly: false
		sameSite: false.
%
category: 'other'
method: HttpResponse
setCookie: keyString
	value: valueString
	path: pathString
	maxAge: secondsInteger
	secure: secureBoolean
	serverOnly: serverBoolean
	sameSite: sameSiteBoolean

	| string |
	string := keyString , '=' , valueString , '; Path=' , (pathString ifNil: ['/'] ifNotNil: [pathString]).
	secondsInteger		ifNotNil:	[string := string , '; Max-Age=' , secondsInteger printString].
	secureBoolean 		ifTrue: 	[string := string , '; Secure'].
	serverBoolean 			ifTrue: 	[string := string , '; HttpOnly'].
	sameSiteBoolean 		ifTrue: 	[string := string , '; SameSite=Strict'].
	headers
		at: 'Set-Cookie'
		put: string
%
category: 'other'
method: HttpResponse
setDate

	headers
		at: 'Date'
		put: (HttpResponse webStringForDateTime: DateTime now).
%
category: 'other'
method: HttpResponse
_content

	^content.
%
