! ------------------- Remove existing behavior from WebApp
removeAllMethods WebApp
removeAllClassMethods WebApp
! ------------------- Class methods for WebApp
! ------------------- Instance methods for WebApp
set compile_env: 0
category: 'Accessing'
method: WebApp
_socket

	^(SessionTemps current at: #'HttpRequest_socket') at: Processor activeProcess.
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
	html := nil. "HtmlElement html."
	Log instance log: #'debug' string: 'WebApp>>buildResponse'.
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
	request method = 'HEAD' ifTrue: [

	] ifFalse: [request method = 'OPTIONS' ifTrue: [
		response code: 204. "No Content"
	] ifFalse: [(request method = 'GET' or: [request method = 'POST']) ifTrue: [
		self buildResponseFor: selector.
		response hasContent ifFalse: [
			response content: html printString.
		].
	] ifFalse: [
		self error: 'Unrecognized request method: ' , request method printString.
	]]].
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
	Log instance log: #'debug' string: 'WebApp>>buildResponseFor: ' , aString printString.
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
			request method = 'GET' ifTrue: [
				dict := request arguments.
			] ifFalse: [
				dict := JsonParser parse: request bodyContents.
				dict isPetitFailure ifTrue: [self error:dict message].
			].
			dict := self perform: aString asSymbol with: dict.
		].
		(dict isKindOf: AbstractDictionary) ifTrue: [
			response content: dict asJson.
		].
	].
%
set compile_env: 0
category: 'override options'
method: WebApp
defaultSelector
	"if the path is empty, e.g., http://localhost/, then default to this 'directory' or method selector."

	^'index.html'
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
