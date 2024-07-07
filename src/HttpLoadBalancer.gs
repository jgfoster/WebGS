! ------------------- Remove existing behavior from HttpLoadBalancer
removeAllMethods HttpLoadBalancer
removeAllClassMethods HttpLoadBalancer
! ------------------- Class methods for HttpLoadBalancer
set compile_env: 0
category: 'other'
classmethod: HttpLoadBalancer
startServer: aServer withRouter: aRouter

	^self
		startServer: aServer 
		withRouter: aRouter
		gemCount: 2
%
category: 'other'
classmethod: HttpLoadBalancer
startServer: aServer withRouter: aRouter gemCount: anInteger

	^self basicNew
		initialize;
		server: aServer;
		router: aRouter;
		gemCount: anInteger;
		loginSessions;
		yourself
%
category: 'other'
classmethod: HttpLoadBalancer
new

	self error: 'Use #startWithRouter: aRouter'.
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
		sessions add: (WebExternalSession startServer: server withRouter: router).
	].
%
category: 'other'
method: HttpLoadBalancer
getSession
	"find a listener that is idle and can be called"

	Log instance log: #'debug' string: 'HttpLoadBalancer>>getSession'.
	[true] whileTrue: [
		mutex critical: [
			| session |
			session := sessions
				detect: [:each | each isAvailable] 		"session is available"
				ifNone: [nil].
			session ifNotNil: [^session beNotAvailable].	"session is not available"
		].
		Processor yield. 			"wait to see if something becomes available"
	].
%
category: 'other'
method: HttpLoadBalancer
serveClientSocket: aSocket router: aRouter

	Log instance log: #'debug' string: 'HttpLoadBalancer>>serveClientSocket: ' , aSocket printString.
 	^self getSession serveClientSocket: aSocket
%
category: 'Initializing'
method: HttpLoadBalancer
server: aServer

	server := aServer.
%
category: 'other'
method: HttpLoadBalancer
shutdown

	Log instance log: #'debug' string: 'HttpLoadBalancer>>shutdown'.
	sessions do: [:each | each forceLogout].
	sessions := IdentitySet new.
%
