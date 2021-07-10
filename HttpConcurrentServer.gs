! ------------------- Remove existing behavior from HttpConcurrentServer
removeAllMethods HttpConcurrentServer
removeAllClassMethods HttpConcurrentServer
! ------------------- Class methods for HttpConcurrentServer
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
