! ------------------- Remove existing behavior from WebApp
removeAllMethods WebApp
removeAllClassMethods WebApp
! ------------------- Class methods for WebApp
set compile_env: 0
category: 'required'
classmethod: WebApp
htdocs
	"/path/to/static/files"

	^nil
%
set compile_env: 0
category: 'startup'
classmethod: WebApp
run
"
	WebApp run.
"
	self new startHttpServer.
%
! ------------------- Instance methods for WebApp
set compile_env: 0
category: 'Accessing'
method: WebApp
_socket

	^(SessionTemps current at: #'HttpRequest_socket') at: Processor activeProcess.
%
category: 'Accessing'
method: WebApp
_socket: aSocket

	| dict process |
	dict := SessionTemps current at: #'HttpRequest_socket' ifAbsentPut: [Dictionary new].
	dict copy keysAndValuesDo: [:eachProcess :eachSocket |
		eachProcess _isTerminated ifTrue: [
			eachSocket close.
			dict removeKey: eachProcess.
		].
	].
	process := Processor activeProcess.
	(dict at: process otherwise: nil) ifNotNil: [:_socket | dict removeKey: process].
	aSocket ifNotNil: [dict at: process put: aSocket].
%
set compile_env: 0
category: 'base'
method: WebApp
buildResponse
	"If you override this method, then you simply need to populate (or remove) the response object:

		response
			content: self myObject asJson;
			contentType: 'text/json';
			yourself.

	This implementation assumes that the first piece of the path is a differentiator (e.g., a selector to be performed).
	For example, 'http://localhost:8888/foo/bar' will build a response for 'foo'."

	| newSelector pieces selector size |
	html := HtmlElement html.
	self log: #'debug' string: 'WebApp>>buildResponse - a'.
	pieces := request path subStrings: $/.
	selector := pieces at: 2.
	selector isEmpty ifTrue: [selector := self defaultSelector].
	size := selector size.
	(3 < size and: [(selector copyFrom: size - 2 to: size) = '.gs' and: [
		(self class canUnderstand: (newSelector := (selector copyFrom: 1 to: size - 3) , '_gs')) or: [
			self class canUnderstand: (newSelector := (selector copyFrom: 1 to: size - 3) , '_gs:')
		]]])
		ifTrue: [selector := newSelector]
		ifFalse: [
			(self pathExists: selector asString) ifFalse: [
				response := nil.
				^self
			].
		].
	"We don't generate the response body, so we don't know the content length (as we would for a file).
	According to the standard, we SHOULD provide the length, but that is optional
	(versus SHALL which would be required)."
	request method = 'HEAD' ifFalse: [
		self log: #'debug' string: 'WebApp>>buildResponse - b'.
		self buildResponseFor: selector.
		response hasContent ifFalse: [
			response content: html printString.
		].
	].
	response maxAge: self maxAge.
	self log: #'debug' string: 'WebApp>>buildResponse - c'.
%
category: 'base'
method: WebApp
buildResponseFor: aString
	"aString will contain the first directory in the path. In this implementation,
	http://localhost:8888/foo/bar will automatically send #foo to self.

	If you have portions of the page that are standard and don't depend on the request,
	then you can override this method to add things before and after. For example,
	a top section could come before and a bottom section could come after."

	| size |
	self log: #'debug' string: 'WebApp>>buildResponseFor: ' , aString printString.
	size := aString size.
	((3 < size and: [(aString copyFrom: size - 2 to: size) = '_gs']) or: [
		4 < size and: [(aString copyFrom: size - 3 to: size) = '_gs:']
	]) ifFalse: [
		self perform: aString asSymbol.
	] ifTrue: [
		| dict |
		(aString last == $:) ifFalse: [
			dict := self perform: aString asSymbol.
		] ifTrue: [
			dict := JsonParser parse: request bodyContents.
			dict := self perform: aString asSymbol with: dict.
		].
		(dict isKindOf: AbstractDictionary) ifTrue: [
			response content: dict asJson.
		].
	].
	self log: #'debug' string: 'WebApp>>buildResponseFor:  returning response'.
%
category: 'base'
method: WebApp
responseForRequest: anHttpRequest
	"This is called from the required class-side method with the same name
	and simply populates the local instance variables."

	self error: 'do we get here?'.
	request := anHttpRequest.
	response := HttpResponse new.
	html := HtmlElement html.
	self buildResponse.
	^response
%
set compile_env: 0
category: 'convenience'
method: WebApp
message
	"The requested path starts with 'message'."

	self messageOnElement: self messageLocation.
%
category: 'convenience'
method: WebApp
message: aString
	"This will redirect to a new page that shows a message."

	response redirectTo: 'message?message=' , (aString collect: [:each | each == Character lf ifTrue: [$\] ifFalse: [each]]).
%
category: 'convenience'
method: WebApp
messageLocation
	"Override this method to put a message into a nice location in your HTML document."

	^html body
%
category: 'convenience'
method: WebApp
messageOnElement: anElement
	"The actual implementation presents the message with a 'Back' button."

	((request argumentsAt: 'message') subStrings: $\) do: [:each |
		anElement content: each; br.
	].
	anElement form: [:form | form
		submitButton
			name: 'submit';
			value: 'Back';
			onclick: 'history.go(-1); return false;';
			yourself.
	].
%
category: 'convenience'
method: WebApp
titleWithContent: aString

	html head titleWithContent: aString.
%
set compile_env: 0
category: 'override options'
method: WebApp
defaultSelector
	"if the path is empty, e.g., http://localhost/, then default to this 'directory' or method selector."

	^'index'
%
category: 'override options'
method: WebApp
index

	response content: '<html>
 <head>
 </head>
 <body>
   <h1>WebApp is running!<h1>
 </body>
</html>'.
%
category: 'override options'
method: WebApp
maxAge
	"This result can be cached and reused for this many seconds."

	^0
%
set compile_env: 0
category: 'selectors'
method: WebApp
allowedSelectors
	"If we are using selectors as the first piece of the path, then we can provide
	some security by listing the allowed selectors. This prevents malicious clients
	from executing arbitrary code."

	^#('index' 'message')
%
category: 'selectors'
method: WebApp
pathExists: aString
	"You could override this to answer true if you don't
	want to maintain the #allowedSelectors list."

	^self allowedSelectors includes: aString
%
set compile_env: 0
category: 'utilities'
method: WebApp
encode: aString
	"HTML encoding for certain characters."

	| stream x |
	stream := WriteStream on: String new.
	aString do: [:each |
		| index |
		index := #($" $& $' $< $>) indexOf: each.
		0 < index ifTrue: [
			stream nextPutAll: (#('&quot;' '&amp;' '&#39;' '&lt;' '&gt;') at: index).
		] ifFalse: [
			((x := each codePoint) < 32 or: [127 < x]) ifTrue: [
				stream nextPutAll: '&#'; print: x; nextPut: $;.
			] ifFalse: [
				stream nextPut: each.
			].
		].
	].
	^stream contents
%
set compile_env: 0
category: 'WebSockets'
method: WebApp
wsLoop

	self upgradeToWebsocket.
	[self serverSocket isConnected] whileTrue: [
		self wsEvent.
	].
	self error: 'Client did not send proper disconnect message!'.
%
category: 'WebSockets'
method: WebApp
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
