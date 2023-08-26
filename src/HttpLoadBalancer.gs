! ------------------- Remove existing behavior from HttpLoadBalancer
removeAllMethods HttpLoadBalancer
removeAllClassMethods HttpLoadBalancer
! ------------------- Class methods for HttpLoadBalancer
set compile_env: 0
category: 'other'
classmethod: HttpLoadBalancer
for: aClass

	^self
		for: aClass
		gemCount: 2
%
category: 'other'
classmethod: HttpLoadBalancer
for: aClass gemCount: anInteger

	^self basicNew
		initialize;
		webAppClass: aClass;
		gemCount: anInteger;
		loginSessions;
		yourself
%
category: 'other'
classmethod: HttpLoadBalancer
new

	self error: 'Use #for: aWebAppClass'.
%
! ------------------- Instance methods for HttpLoadBalancer
set compile_env: 0
category: 'Initializing'
method: HttpLoadBalancer
gemCount: anInteger

	0 < anInteger ifFalse: [self error: 'Load balancer requires some gems!'].
	gemCount := anInteger.
%
category: 'Initializing'
method: HttpLoadBalancer
initialize

	Log instance log: #'debug' string: 'HttpLoadBalancer>>initialize'.
	super initialize.
	gemCount := 2.
	mutex := Semaphore forMutualExclusion.
	sessions := IdentitySet new.
%
category: 'Initializing'
method: HttpLoadBalancer
loginSessions
	"part of the initialization sequence"

	Log instance log: #'debug' string: 'HttpLoadBalancer>>loginSessions'.
	gemCount timesRepeat: [
		sessions add: (WebExternalSession for: webAppClass).
	].
%
category: 'Initializing'
method: HttpLoadBalancer
webAppClass: aClass

	webAppClass := aClass.
%
category: 'other'
method: HttpLoadBalancer
getSession
	"find a listener that is idle and can be called"

	Log instance log: #'debug' string: 'HttpLoadBalancer>>getProxy'.
	[true] whileTrue: [
		mutex critical: [
			| session |
			session := sessions
				detect: [:each | each isAvailable] 		"session is available"
				ifNone: [nil].
			session ifNotNil: [^session beNotAvailable].	"session is not available"
		].
		(Delay forMilliseconds: 10) wait. 			"wait to see if something becomes available"
	].
%
category: 'other'
method: HttpLoadBalancer
serveClientSocket: aSocket

	Log instance log: #'debug' string: 'HttpLoadBalancer>>serveClientSocket: ' , aSocket printString.
 	^self getSession serveClientSocket: aSocket
%
category: 'other'
method: HttpLoadBalancer
shutdown

	Log instance log: #'debug' string: 'HttpLoadBalancer>>shutdown'.
	sessions do: [:each | each forceLogout].
	sessions := IdentitySet new.
%
