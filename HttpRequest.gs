! ------------------- Remove existing behavior from HttpRequest
removeAllMethods HttpRequest
removeAllClassMethods HttpRequest
! ------------------- Class methods for HttpRequest
set compile_env: 0
category: 'other'
classmethod: HttpRequest
contentTypeHandlers

	" I return a dictionary with all configured Content-type handlers.
	  Handlers are blocks that take a httpRequest and a string as arguments. "

	contentTypeHandlers isNil ifTrue: [
		self installContentTypeHandlers
	].

	^contentTypeHandlers
%
category: 'other'
classmethod: HttpRequest
fromBytes: aByteArray
	"Used exclusively by tests"

	| listener server client string request |
	listener := GsSocket new.
	(listener makeServer: 1) ifNil: [
		string := listener lastErrorString.
		listener close.
		listener error: string.
	].
	client := GsSocket new.	"browser sending the request"
	(client connectTo: listener port on: 'localhost') ifFalse: [
		string := client lastErrorString.
		client close.
		client error: string.
	].
	(listener readWillNotBlockWithin: 1000) ifFalse: [
		client close.
		listener close.
		self error: 'Listener did not receive request from client!'.
	].
	(server := listener accept) ifNil: [
		string := listener lastErrorString.
		client close.
		listener close.
		listener error: string.
	].
	listener close.
	[:socket :bytes |
		1 to: bytes size by: 4000 do: [:i |
			(socket writeWillNotBlockWithin: 1000) ifTrue: [
				socket write: (bytes copyFrom: i to: (i + 3999 min: bytes size)).
			] ifFalse: [
				self error: 'Unable to write data!'.
			].
		].
		socket close.
	] forkWith: (Array with: client with: (ByteArray withAll: aByteArray)).
	request := self readFromSocket: server.
	^request
%
category: 'other'
classmethod: HttpRequest
fromString: aString
	"Used exclusively by tests"

	^self fromBytes: aString encodeAsUTF8.
%
category: 'other'
classmethod: HttpRequest
installContentTypeHandlers

	" I set a dictionary with all configured Content-type handlers.
	  Handlers are blocks that take a httpRequest and a string as arguments. "

	contentTypeHandlers := Dictionary new
		at: 'application/x-www-form-urlencoded' put:  [ :httpReq :str | httpReq readArgumentsFrom: str ];
		"at: 'application/json' put: [ :httpReq :str | httpReq parseContentsFrom: str interpreterClassName: #JSONReader action: #fromJSON:  ];"
	yourself
%
category: 'other'
classmethod: HttpRequest
new

	self error: 'use #''readFromSocket:'''.
%
category: 'other'
classmethod: HttpRequest
readFromSocket: aSocket

	^self basicNew
		initializeWithSocket: aSocket;
		yourself.
%
category: 'other'
classmethod: HttpRequest
unsetContentTypeHandlers

	" I dischard old contentTypeHandlers. "

	contentTypeHandlers := nil
%
! ------------------- Instance methods for HttpRequest
set compile_env: 0
category: 'Accessing'
method: HttpRequest
arguments

   ^arguments
%
category: 'Accessing'
method: HttpRequest
argumentsAt: aKey

   ^arguments at: aKey
%
category: 'Accessing'
method: HttpRequest
argumentsAt: aKey ifAbsent: aBlock

   ^arguments at: aKey ifAbsent: aBlock
%
category: 'Accessing'
method: HttpRequest
argumentsAt: aKey ifAbsentPut: aBlock

   ^arguments at: aKey ifAbsentPut: aBlock
%
category: 'Accessing'
method: HttpRequest
bodyContents

   ^bodyContents

%
category: 'Accessing'
method: HttpRequest
contentType

   ^headers at: 'Content-Type' ifAbsent: nil
%
category: 'Accessing'
method: HttpRequest
cookie

   ^self cookies
%
category: 'Accessing'
method: HttpRequest
cookies

	| cookie string |
	cookie := Dictionary new.
	string := headers at: 'Cookie' ifAbsent: [^cookie].
	(string subStrings: $;) do: [:each |
		| pieces |
		pieces := each subStrings: $=.
		cookie at: pieces first trimSeparators put: pieces last trimSeparators.
	].
   ^cookie
%
category: 'Accessing'
method: HttpRequest
headers

   ^headers
%
category: 'Accessing'
method: HttpRequest
method

   ^method
%
category: 'Accessing'
method: HttpRequest
multipartFormDataBoundary

   ^multipartFormDataBoundary
%
category: 'Accessing'
method: HttpRequest
path

   ^path
%
category: 'Accessing'
method: HttpRequest
uri

   ^uri
%
category: 'Accessing'
method: HttpRequest
version

   ^version
%
category: 'Accessing'
method: HttpRequest
_sizeLeft

	^sizeLeft.
%
category: 'Accessing'
method: HttpRequest
_socket

	^(SessionTemps current at: #'HttpRequest_socket') at: Processor activeProcess.
%
category: 'Accessing'
method: HttpRequest
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
	(dict at: process otherwise: nil) ifNotNil: [:socket | dict removeKey: process].
	aSocket ifNotNil: [dict at: process put: aSocket].
%
set compile_env: 0
category: 'other'
method: HttpRequest
closeSocket

	self _socket ifNotNil: [:socket |
		socket close.
		self _socket: nil.
	].
%
category: 'other'
method: HttpRequest
initializeWithSocket: aSocket

	self _socket: aSocket.
	arguments := Dictionary new.
	headers := Dictionary new
		at: 'X-Date' 				put: (HttpResponse webStringForDateTime: DateTime now);
		at: 'X-Peer-Name' 		put: aSocket peerName;
		at: 'X-Peer-Address' 	put: aSocket peerAddress;
		at: 'X-Peer-Port' 			put: aSocket peerPort asString;
		yourself.
	self readRequest ifTrue: [self _socket: nil].	"did the read finish?"
%
category: 'other'
method: HttpRequest
isClientChrome

	^(headers at: 'User-Agent') includesString: 'Chrome'.
%
category: 'other'
method: HttpRequest
isClientFirefox

	^(headers at: 'User-Agent') includesString: 'Firefox'.
%
category: 'other'
method: HttpRequest
isClientIE

	| userAgent |
	userAgent := headers at: 'User-Agent'.
	^(userAgent includesString: 'MSIE') or: [userAgent includesString: 'Trident'].
%
category: 'other'
method: HttpRequest
isClientWindows

	^(headers at: 'User-Agent') includesString: 'Windows'
%
category: 'other'
method: HttpRequest
isMultiPart

	| contentType pieces string |
	multipartFormDataBoundary ifNotNil: [^true].
	contentType := headers at: 'Content-Type' ifAbsent: [^false].
	(pieces := contentType subStrings: $;) first = 'multipart/form-data' ifFalse: [^false].
	((string := pieces at: 2) copyFrom: 1 to: 10) = ' boundary=' ifFalse: [self error: 'Unrecognized field in multipart/form-data'].
	multipartFormDataBoundary := '--' , (string copyFrom: 11 to: string size).
	^true.
%
category: 'other'
method: HttpRequest
isWebSocketUpgrade

	| connection upgrade |
	connection := headers at: 'Connection' ifAbsent: [''].
	upgrade := headers at: 'Upgrade' ifAbsent: [''].
	^connection = 'Upgrade'  and: [upgrade = 'websocket']
%
category: 'other'
method: HttpRequest
needsSocket

	^self isMultiPart or: [self isWebSocketUpgrade]
%
category: 'other'
method: HttpRequest
parseContentsFrom: aString interpreterClassName: aClassName action: aSelector

	" I resolve the interpreter class and send it aSelector, the result is saved in bodyContents attribute. "

	| interpreterClass |
	(interpreterClass := System myUserProfile resolveSymbol: aClassName) ifNil: [
		self error: 'Can''t resolve symbol: ' , aClassName printString , ' - Handle of request content fail.'
	].

	bodyContents := interpreterClass value perform: aSelector with: aString
%
category: 'other'
method: HttpRequest
printOn: aStream

	aStream nextPutAll: (method ifNil: ['???']).
	aStream space.
	aStream nextPutAll: (uri ifNil: ['???']).
%
category: 'other'
method: HttpRequest
readArgumentsFrom: aString

	(aString subStrings: $&) do: [:each |
		| index key value values |
		index := each indexOf: $=.
		key := each copyFrom: 1 to: index - 1.
		value := self translate: (each copyFrom: index + 1 to: each size).
		(6 < key size and: [(key copyFrom: key size - 5 to: key size) = '%5B%5D']) ifTrue: [
			key := key copyFrom: 1 to: key size - 6.
			values := arguments at: key ifAbsent: [Array new].
			values add: value.
			value := values.
		].
		key notEmpty ifTrue: [
			(arguments includesKey: key) ifFalse: [
				arguments at: key put: value.
			] ifTrue: [
				| current |
				((current := arguments at: key) isKindOf: Array) ifTrue: [
					current add: value.
				] ifFalse: [
					arguments at: key put: (Array with: current with: value).
				].
			].
		].
	].

%
category: 'other'
method: HttpRequest
readContents

	" Read and parse the content itself.
	  In GET method there are interpreted as arguments.
	  For POST methos how I handle contents depends on Content-Type value.
	  For each Content-Type supported must be a handler configured.
	  If none, the original string contents is saved.
	  For handlers configuration see class method #contentTypeHandlers.  "

	| string pieces handler |

	method = 'GET' ifTrue: [
		pieces := uri subStrings: $?.
		path := pieces at: 1.
		string := 1 < pieces size
			ifTrue: [pieces at: 2]
			ifFalse: [''].
		^self readArgumentsFrom: string
	].
	string := self upToEnd.
	method = 'POST' ifTrue: [
		handler := self class contentTypeHandlers
			at: (headers at: 'Content-Type')
			ifAbsent: [ nil ].
		handler isNil ifTrue: [
			" No handler for current Content-Type, just set the string as bodyContents "
			bodyContents := string.
			^self
		].

		handler value: self value: string
	]
%
category: 'other'
method: HttpRequest
readHeaders

	| line |
	[
		line := self nextLine.
		line notEmpty.
	] whileTrue: [
		| index key value |
		index := line indexOf: $:.
		key := line copyFrom: 1 to: index - 1.
		value := (line copyFrom: index + 1 to: line size) trimBlanks.
		key notEmpty ifTrue: [headers at: key asString put: value asString].
	].

	sizeLeft := headers at: 'Content-Length' ifAbsent: [nil].
	sizeLeft notNil ifTrue: [
		| bytes |
		bytes := stream upToEnd.
		sizeLeft := sizeLeft asNumber - bytes size.
		stream := ReadStream on: bytes.
	].
%
category: 'other'
method: HttpRequest
readLine1

	method := [
		self upToSpace asString.
	] on: EndOfStream do: [:ex |
		HttpServer debug ifTrue: [self halt].
		ex return: ''.
	].
	HttpServer log: #'debug' string: 'HttpRequest>>readLine1 got method of ' , method printString.
	method isEmpty ifTrue: [^self].
	(#('GET' 'HEAD' 'OPTIONS' 'POST') includes: method) ifFalse: [
		self error: 'Expected a GET, HEAD, OPTIONS, or POST but got ' , method printString , ' (' , method size printString , ' characters)'
	].
	uri := self upToSpace asString.
	path := uri.
	version := self nextLine asString.
	HttpServer log: #'debug' string: method , ' ' , (uri copyFrom: 1 to: (40 min: uri size)).
%
category: 'other'
method: HttpRequest
readRequest
	"answer whether we are done reading"

	self readLine1.
	method isEmpty ifTrue: [^true].
	self readHeaders.
	self needsSocket ifTrue: [^false].
	self readContents.
	^true.
%
category: 'other'
method: HttpRequest
translate: aString

	| readStream writeStream string |
	readStream := ReadStream on: aString.
	writeStream := WriteStream on: ByteArray new.
	[
		readStream atEnd not.
	] whileTrue: [
		| char |
		char := readStream next.
		char = $+ ifTrue: [
			writeStream nextPut: Character space codePoint.
		] ifFalse: [
			char = $% ifTrue: [
				| array value |
				array := #($0 $1 $2 $3 $4 $5 $6 $7 $8 $9 $A $B $C $D $E $F).
				value := (array indexOf: readStream next) - 1 * 16 + (array indexOf: readStream next) - 1.
				writeStream nextPut: value.
			] ifFalse: [
				writeStream nextPut: char codePoint.
			].
		]
	].
	string := writeStream contents bytesIntoUnicode asString.
	string = 'nil' ifTrue: [^nil].
	string = 'null' ifTrue: [^nil].
	string = 'true' ifTrue: [^true].
	string = 'false' ifTrue: [^false].
	^string
		copyReplaceAll: Character cr asString , Character lf asString
		with: Character lf asString.
%
set compile_env: 0
category: 'stream'
method: HttpRequest
nextLine

	| bytes |
	bytes := self
		upTo: Character lf
		ifNotFoundWaitMs: 20.
	(bytes notEmpty and: [bytes last == Character cr codePoint]) ifTrue: [
		bytes size: bytes size - 1.
	].
	^bytes bytesIntoUnicode
%
category: 'stream'
method: HttpRequest
nextPartHeaders

	| string dict |
	dict := Dictionary new.
	[
		string := self nextLine.
		string notEmpty.
	] whileTrue: [
		| index key value |
		0 == (index := string indexOf: $:) ifTrue: [self error: 'Expected header but got ' , string printString].
		key := string copyFrom: 1 to: index - 1.
		value := string copyFrom: index + 1 to: string size.
		dict at: key put: value trimBlanks.
	].
	^dict.
%
category: 'stream'
method: HttpRequest
peekFor: aCharacter

	self _fillStream.
	^stream peekFor: aCharacter codePoint.
%
category: 'stream'
method: HttpRequest
upTo: aCharacter ifNotFoundWaitMs: anInteger

	| utf8 didFindCharacter |
	self _fillStream.
	utf8 := stream upTo: aCharacter codePoint.		"stream consumes aCharacter but does not return it"
	didFindCharacter := stream atEnd not	"if there is more, then we stopped because we found aCharacter"
		or: [ | x |
			x := stream contents.
			x notEmpty and: [
				x last == aCharacter codePoint.			"we read up to end and there was aCharacter at the end"
			].
		].
	didFindCharacter ifTrue: [
		^utf8
	].
	(Delay forMilliseconds: anInteger) wait.			"give a bit of time for more data to arrive"
	200 < anInteger ifTrue: [self error: 'Tired of waiting for client to send full request!'].
	^utf8 , (self upTo: aCharacter ifNotFoundWaitMs: anInteger + 20).
%
category: 'stream'
method: HttpRequest
upToEnd
	"Called by #'readContents'"

	| utf8 |
	utf8 := stream upToEnd.
	sizeLeft isNil ifTrue: [^utf8 asUnicodeString asString].
	[
		0 < sizeLeft.
	]whileTrue: [
		self _fillStream.
		utf8 addAll: stream upToEnd.
	].
	^utf8 asUnicodeString asString
%
category: 'stream'
method: HttpRequest
upToNextPartAsUnicode

	| bytes |
	bytes := ByteArray new.
	self upToNextPartDo: [:data | bytes addAll: data].
	^bytes bytesIntoUnicode
%
category: 'stream'
method: HttpRequest
upToNextPartDo: aOneArgumentBlock
	"ByteArray passed to block"

	| bytes count i j k |
	bytes := ByteArray new.
	count := 0.
	k := 0.
	[true] whileTrue: [
		[
			bytes addAll: stream upToEnd.
			self _fillStream.		"we could get an EndOfStream here"
			bytes addAll: stream upToEnd.
		] on: Error do: [:ex |
			HttpServer debug ifTrue: [self halt].
			(ex isKindOf: EndOfStream) ifTrue: [ex return].
			ex pass.
		].
		i := bytes indexOfSubCollection: multipartFormDataBoundary startingAt: 1.
		0 < i ifTrue: [		"found boundary"
			(1 < i and: [(bytes at: i - 1) == Character lf codePoint]) ifFalse: [
				j := i - 1.
			] ifTrue: [
				(2 < i and: [(bytes at: i - 2) == Character cr codePoint]) ifFalse: [
					j := i - 2.
				] ifTrue: [
					j := i - 3.
				].
			].
			aOneArgumentBlock value: (bytes copyFrom: 1 to: j).
			i := i + multipartFormDataBoundary size.
			(i < bytes size and: [(bytes at: i) == Character cr codePoint]) ifTrue: [i := i + 1].
			(i < bytes size and: [(bytes at: i) == Character lf codePoint]) ifTrue: [i := i + 1].
			bytes := bytes copyFrom: i to: bytes size.
			stream := ReadStream on: bytes.
			^self.
		].
		i := bytes size - multipartFormDataBoundary size - 1.
		0 < i ifTrue: [		"didn't find boundary, but might have part of it"
			aOneArgumentBlock value: (bytes copyFrom: 1 to: i).
			k := k + i.
			bytes := bytes copyFrom: i + 1 to: bytes size.
			stream := ReadStream on: bytes copy.	"#44335"
			bytes size: 0.
			count := 0.
		] ifFalse: [			"didn't have enough to even check for a boundary"
			20 < (count := count + 1) ifTrue: [self error: 'Timeout waiting on socket!'].
		].
	].
%
category: 'stream'
method: HttpRequest
upToSpace

	| bytes |
	bytes := self
		upTo: Character space
		ifNotFoundWaitMs: 20.
	^bytes bytesIntoUnicode
%
category: 'stream'
method: HttpRequest
_fillStream

	| bytes want |
	(stream isNil or: [stream atEnd]) ifFalse: [^self].	"No need to get more yet"
	bytes := ByteArray new.
	want := sizeLeft ifNil: [4096].
	4096 < want ifTrue: [want := 4096].
	[
		HttpServer log: #'debug' string: 'HttpRequest>>_fillStream - 1 - want = ' , want printString , '; have = ' , bytes size printString.
		self _socket readWillNotBlockWithin: 1000.
	] whileTrue: [
		| bytesRead |
		bytesRead := self _socket read: want into: bytes startingAt: bytes size + 1.
		HttpServer log: #'debug' string: 'HttpRequest>>_fillStream - 2 - bytesRead = ' , bytesRead printString.
		bytesRead == 0 ifTrue: [
			| errors |
			self _socket fetchLastIoErrorString ifNotNil: [:value |
				HttpServer log: #'error' string: value.
				EndOfStream signal: value.
			].
			(errors := self _socket class fetchErrorStringArray) notEmpty ifTrue: [
				errors do: [:each |
					((each subStrings: $:) copyFrom: 1 to: 6) = #('error' '1410E114' 'SSL routines' 'SSL_peek' 'uninitialized' 'ssl/ssl_lib.c') ifTrue: [
						HttpServer log: #'warn' string: each.
					] ifFalse: [
						HttpServer log: #'error' string: each.
					].
				].
				EndOfStream signal: errors.
			].
			HttpServer log: #'warning' string: 'nothing more to read'.
			EndOfStream signal: 'nothing more to read'.
		].
		((sizeLeft notNil and: [sizeLeft <= bytes size]) or: [0 < (bytes indexOf: Character lf codePoint)]) ifTrue: [
			stream := ReadStream on: bytes.
			sizeLeft notNil ifTrue: [sizeLeft := sizeLeft - bytes size].
			HttpServer log: #'debug' string: 'HttpRequest>>_fillStream - 4'.
			^self
		].
	].
	EndOfStream signal: 'Read ' , bytes size printString , ' bytes but wanted ' ,
		(sizeLeft ifNil: ['a line'] ifNotNil: [sizeLeft printString]).
%
