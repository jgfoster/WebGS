
expectvalue /Class
doit
WebApp comment:
'This is the abstract superclass for a HttpServer delegate.

The required methods are in the ''required'' category.'
%
expectvalue /Class
doit
WebApp category: 'User Interface'
%
! ------------------- Remove existing behavior from WebApp
expectvalue /Metaclass3
doit
WebApp removeAllMethods.
WebApp class removeAllMethods.
%
! ------------------- Class methods for WebApp
set compile_env: 0
category: 'logging'
classmethod: WebApp
purgeWebLog

	^self purgeWebLogKeeping: 500.
%
category: 'logging'
classmethod: WebApp
purgeWebLogKeeping: anInteger
	"Delete everything the most recent anInteger entries"

	| webLog |
	webLog := self log.
	1 to: webLog size by: 500 do: [:i |
		[
			0 to: 499 do: [:j |
				| k x |
				k := i + j.
				(k <= (webLog size - anInteger) and: [(x := webLog at: k) notNil and: [x key isKindOf: HttpRequest]]) ifTrue: [
					webLog at: k put: nil.
				].
			].
			System commitTransaction.
		] whileFalse: [
			System abort.
		].
	].
	System commit.
	webLog := webLog reject: [:each | each isNil].
	UserGlobals at: #'WebLog' put: webLog.
	System commit.
%
category: 'logging'
classmethod: WebApp
resetLog

	log := Array new
%
set compile_env: 0
category: 'required'
classmethod: WebApp
htdocs
	"/path/to/static/files"

	^nil
%
category: 'required'
classmethod: WebApp
log

	^log ifNil: [log := Array new]
%
category: 'required'
classmethod: WebApp
postSendAction
	"The application has an opportunity to do any post-response action.
	For example, one application sends an email after the commit.

		(Delay forMilliseconds: 20) wait."
%
category: 'required'
classmethod: WebApp
responseForRequest: anHttpRequest

	^self new responseForRequest: anHttpRequest.
%
category: 'required'
classmethod: WebApp
workerCount

	^2
%
set compile_env: 0
category: 'startup'
classmethod: WebApp
defaultPort

	^8888
%
category: 'startup'
classmethod: WebApp
externalSession

	^WebExternalSession newDefault
		login;
		yourself
"
	^(WebExternalSession
		gemNRS: GsNetworkResourceString defaultGemNRSFromCurrent
		stoneNRS: GsNetworkResourceString defaultStoneNRSFromCurrent
		username: System myUserProfile userId
		password: 'swordfish'
		hostUsername: 'gsadmin'
		hostPassword: 'swordfish')
		login;
		executeBlock: [WebAppSample doLocalSessionInitialization];
		yourself
"
%
category: 'startup'
classmethod: WebApp
httpServerClass

	^HttpServer
%
category: 'startup'
classmethod: WebApp
run
"
	WebApp run.
"
	self httpServerClass
		serveOnPort: self defaultPort
		delegate: self.
%
! ------------------- Instance methods for WebApp
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
		self buildResponseFor: selector.
		response hasContent ifFalse: [
			response content: html printString.
		].
	].
	response maxAge: self maxAge.
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
	]
%
category: 'base'
method: WebApp
responseForRequest: anHttpRequest
	"This is called from the required class-side method with the same name
	and simply populates the local instance variables."

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
