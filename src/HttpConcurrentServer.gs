! ------------------- Remove existing behavior from HttpConcurrentServer
removeAllMethods HttpConcurrentServer
removeAllClassMethods HttpConcurrentServer
! ------------------- Class methods for HttpConcurrentServer
set compile_env: 0
category: 'constants'
classmethod: HttpConcurrentServer
contentTypeFor: aPath
		"Used when sending a file"

	^self contentTypes
		at: (aPath subStrings: $.) last asLowercase
		otherwise: 'text/html; UTF-8'.
%
category: 'constants'
classmethod: HttpConcurrentServer
contentTypes
		"Used when sending a file"

	^KeyValueDictionary new
		at: 'css'		put: 'text/css';
		at: 'gif'		put: 'image/gif';
		at: 'html'	put: 'text/html; charset=UTF-8';
		at: 'ico'		put: 'image/x-icon';
		at: 'jpg'		put: 'image/jpg';
		at: 'js'		put: 'text/javascript';
		at: 'json'	put: 'text/json';
		at: 'png'		put: 'image/png';
		yourself.
%
set compile_env: 0
category: 'critical'
classmethod: HttpConcurrentServer
critical: aBlock
	"Evaluate aBlock inside a commit while holding the mutex"

	^self mutex critical: [
		| result |
		[
			result := aBlock value.
			System commitTransaction.
		] whileFalse: [
			System abort.
		].
		result
	].
%
category: 'critical'
classmethod: HttpConcurrentServer
mutex
	"Share the mutex across all processes in this gem"

	^SessionTemps current
		at: #'HttpServer_mutex'
		ifAbsentPut: [Semaphore forMutualExclusion].
%
set compile_env: 0
category: 'other'
classmethod: HttpConcurrentServer
purgeRequestLogKeeping: anInteger
	"Delete everything the most recent anInteger entries"

	1 to: requestLog size by: 500 do: [:i |
		[
			0 to: 499 do: [:j |
				| k x |
				k := i + j.
				(k <= (requestLog size - anInteger) and: [(x := requestLog at: k) notNil and: [x key isKindOf: HttpRequest]]) ifTrue: [
					requestLog at: k put: nil.
				].
			].
			System commitTransaction.
		] whileFalse: [
			System abort.
		].
	].
	System commit.
	requestLog := requestLog reject: [:each | each isNil].
	System commit.
%
category: 'other'
classmethod: HttpConcurrentServer
requestLog

	^requestLog ifNil: [requestLog := Array new]
%
category: 'other'
classmethod: HttpConcurrentServer
resetRequestLog

	requestLog := Array new.
%
set compile_env: 0
category: 'running'
classmethod: HttpConcurrentServer
handleRequestLogEntry: aLogEntry
	"This is called from the Gem that handles the socket and
	may be run in a separate gem (see HttpConcurrentServer).
	aLogEntry.key contains anHttpRequest and the role of this method
	is to end with aLogEntry.value containing either anHttpResponse or
	anException."

	[
		| request response |
		AlmostOutOfMemory enable.
		request := aLogEntry key.
		self log: #'debug' string: 'HttpServer class>> handleRequestLogEntry: - a - ' , aLogEntry printString.
		self log: #'debug' string: 'HttpServer class>> handleRequestLogEntry: - b' , ' - ' ,
			(SessionTemps current at: #'HttpServer_listeningSocket') readWillNotBlock printString.
		response := self responseForRequest: request.		"<- work is done here"
		self log: #'debug' string: 'HttpServer class>> handleRequestLogEntry: - c'.
		(SessionTemps current at: #'HttpServer_listeningSocket') readWillNotBlock.
		self log: #'debug' string: 'HttpServer class>> handleRequestLogEntry: - d'.
		response ifNotNil: [response setDate].
		aLogEntry value: response.
		"System commit.
		self postCommitAction."
	] on: Error , Admonition do: [:ex1 |
		HttpServer debug ifTrue: [self halt].
		[
			System abort.
			aLogEntry value: ex1.
			System commit.
		] on: Error do: [:ex2 |
			self log: #'error' string: ex1 printString , Character lf asString , ex2 printString , Character lf asString , (GsProcess stackReportToLevel: 50).
			ex2 return: nil.
		].
	].
%
category: 'running'
classmethod: HttpConcurrentServer
postCommitAction
	"The application has an opportunity to do any post-response action.
	For example, one application sends an email after the commit.

		(Delay forMilliseconds: 20) wait."
%
category: 'running'
classmethod: HttpConcurrentServer
purgeRequestLog

	^self purgeRequestLogKeeping: 500.
%
category: 'running'
classmethod: HttpConcurrentServer
responseForRequest: anHttpRequest

	| response |
	self log: #'debug' string: 'HttpServer class>>responseForRequest: - a'.
	self log: #'debug' string: 'HttpServer class>>responseForRequest: - b' , ' - ' ,
			(SessionTemps current at: #'HttpServer_listeningSocket') readWillNotBlock printString.
	response := self new responseForRequest: anHttpRequest.
	self log: #'debug' string: 'HttpServer class>>responseForRequest: - c'.
	(SessionTemps current at: #'HttpServer_listeningSocket') readWillNotBlock.
	self log: #'debug' string: 'HttpServer class>>responseForRequest: - d'.
	^response
%
! ------------------- Instance methods for HttpConcurrentServer
set compile_env: 0
category: 'other'
method: HttpConcurrentServer
abortIdleSessions

	self critical: [	"so no other process changes a session state"
		System abort.
		sessions do: [:each |
			each value ifTrue: [		"session is available (idle)"
				each key executeBlock: [		"block evaluated in remote (worker) process"
					(Delay forMilliseconds: 100) wait. 	"Allow background processes to run"
					System abort.								"Avoid CR backlog"
				].
			].
		].
	].
%
category: 'other'
method: HttpConcurrentServer
gemCount: anInteger

	gemCount := anInteger.
%
category: 'other'
method: HttpConcurrentServer
getSession
	"Returns a GciExternalSession that is idle and can be used to build an HttpResponse"

	| assoc  |
	sessions isEmpty ifTrue: [^nil].
	[
		self critical: [
			assoc := sessions
				detect: [:each | each value] 		"session is available"
				ifNone: [nil].
			assoc ifNotNil: [assoc value: false].		"session is not available"
		].
		assoc isNil.
	] whileTrue: [
		(Delay forMilliseconds: 10) wait. 			"wait to see if something becomes available"
	].
	^assoc key
%
category: 'other'
method: HttpConcurrentServer
initialize

	super initialize.
	gemCount := 0.
	sessions := IdentitySet new.
	self loginSessions.
%
category: 'other'
method: HttpConcurrentServer
loginSessions
	"part of the initialization sequence"

	gemCount timesRepeat: [
		sessions add: self externalSession -> true.		"logged-in session is available"
	].
	sessions do: [:each |
		each key executeBlock: [System gemConfigurationAt: #GemExceptionSignalCapturesStack put: true].
	].
%
category: 'other'
method: HttpConcurrentServer
respondToRequestInLogEntry: aLogEntry
	"We are in a forked process (thread) and aLogEntry.key contains anHttpRequest.
	We put something in aLogEntry.value and return.
	The action might be done in our Gem or in a remote (worker) Gem.
	In either case, we call self class>>handleRequestLogEntry: to do the work."

	| session useLocalGem |
	useLocalGem := aLogEntry key needsSocket		"We need the local socket to read request"
		or: [(session := self getSession) isNil]. 		"No worker gem available"
	useLocalGem ifTrue: [
		^super respondToRequestInLogEntry: aLogEntry.	"<- work is done either here or below"
	].
	"Let a worker gem handle the request"
	self log: #'debug' string: 'sending task to ' , session printString.
	[
		System commit.
		session
			executeBlock: [System abort];	"so it can see the new logEntry"
			send: #'handleRequestLogEntry:' 							"<- or work is done here"
				to: self class asOop
				withArguments: (Array with: aLogEntry);
			yourself.
	] ensure: [
		self returnSession: session.
	].
%
category: 'other'
method: HttpConcurrentServer
returnSession: aGciSession
	"all done using this remote, worker, Gem"

	self critical: [
		| assoc |
		assoc := sessions detect: [:each | each key == aGciSession].
		assoc value: true.
	].
%
category: 'other'
method: HttpConcurrentServer
shouldKeepRunning

	self abortIdleSessions.	"this does an abort/commit in the current gem as well"
	^true.
%
category: 'other'
method: HttpConcurrentServer
startServer
	"primary entry point; called immediately after initialization"

	[
		super startServer.
	] ensure: [
		sessions copy do: [:each | 
			each key forceLogout. 
			sessions remove: each.
		].
	].
%
set compile_env: 0
category: 'Request Handler'
method: HttpConcurrentServer
critical: aBlock
	"Evaluate aBlock inside a commit while holding the mutex"

	^self class critical: aBlock
%
category: 'Request Handler'
method: HttpConcurrentServer
handleRequest
	"We are in a forked process (thread) and socket has the unread request (new socket from accept)"

	| error logEntry |
	[
		request := HttpRequest readFromSocket: socket.
		request method isEmpty ifTrue: [
			self log: #'warning' string: 'Got an empty request'.
			^self.
		].
		request isWebSocketUpgrade ifTrue: [
			^self wsRequest: request socket: socket
		].
		logEntry := self newWebLogEntry.	"might include a #'critical:' block"
		logEntry key: request.
		self respondToRequestInLogEntry: logEntry.		"<- work is done here for dynamic content"
		response := logEntry value.
		response ifNil: [		"no dynamic content available, try static content"
			logEntry value: request path.
			self handleRequestForFile.
		] ifNotNil: [
			(response isKindOf: Exception) ifTrue: [
				error := response.
			] ifFalse: [
				self log: #'debug' string: 'HttpServer>>handleRequestOn: ' , socket printString , ' - f'.
				socket readWillNotBlock.
				self sendResponse: response on: socket.	"dynamic content is returned here"
				self log: #'debug' string: 'HttpServer>>handleRequestOn: ' , socket printString , ' - g'.
			].
		].
	] on: Error , Admonition do: [:ex1 |
		HttpServer debug ifTrue: [self halt].
		[
			self critical: [System abort. logEntry value: ex1].
		] on: Error do: [:ex2 |
			self class log: #'error' string:
				ex1 printString , Character lf asString ,
				ex2 printString , Character lf asString ,
				(GsProcess stackReportToLevel: 50).
			ex2 return: nil.
		].
		error := ex1.
	].
	error ifNotNil: [
		response := HttpResponse serverError: error.
		self sendResponse.
	].
%
category: 'Request Handler'
method: HttpConcurrentServer
newWebLogEntry
	"A weblog entry is an association. Its contents indicates a status:
		timestamp -> nil
			we have accepted a connection, but not read the request; if this is the result, then the request was likely empty
		anHttpRequest -> nil
			we have read the request, but have not generated a response; this should only be work-in-progress
		anHttpRequest -> 'path/to/static/content'
			indicates an attempt to get static content; actual result is not indicated
		anHttpRequest -> anException
			anException happened while generating the result (dynamic or static)
		anHttpRequest -> anHttpResponse
			dynamic content was generated
"

	^self critical: [self class requestLog add: DateTime now -> nil].
%
