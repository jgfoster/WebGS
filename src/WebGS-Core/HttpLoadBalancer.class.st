"sessions:
	A collection of Association instances
		key: GsExternalSession
		value: aBoolean indicating whether session is available"
Class {
	#name : 'HttpLoadBalancer',
	#superclass : 'AbstractHttpServer',
	#instVars : [
		'gemCount',
		'mutex',
		'server',
		'sessions'
	],
	#gs_options : [ 'dbTransient' ],
	#category : 'WebGS-Core'
}

{ #category : 'other' }
HttpLoadBalancer class >> new [

	self error: 'Use #startWithRouter: aRouter'.
]

{ #category : 'other' }
HttpLoadBalancer class >> startServer: aServer withRouter: aRouter [

	^self
		startServer: aServer 
		withRouter: aRouter
		gemCount: 2
]

{ #category : 'other' }
HttpLoadBalancer class >> startServer: aServer withRouter: aRouter gemCount: anInteger [

	^self basicNew
		initialize;
		server: aServer;
		router: aRouter;
		gemCount: anInteger;
		loginSessions;
		yourself
]

{ #category : 'Initializing' }
HttpLoadBalancer >> gemCount: anInteger [

	0 < anInteger ifFalse: [self error: 'Load balancer requires some gems!'].
	gemCount := anInteger.
]

{ #category : 'Initializing' }
HttpLoadBalancer >> initialize [

	Log instance log: #'debug' string: 'HttpLoadBalancer>>initialize'.
	super initialize.
	gemCount := 2.
	mutex := Semaphore forMutualExclusion.
	sessions := IdentitySet new.
]

{ #category : 'Initializing' }
HttpLoadBalancer >> loginSessions [
	"part of the initialization sequence"

	Log instance log: #'debug' string: 'HttpLoadBalancer>>loginSessions'.
	gemCount timesRepeat: [
		sessions add: (WebExternalSession startServer: server withRouter: router).
	].
]

{ #category : 'Initializing' }
HttpLoadBalancer >> server: aServer [

	server := aServer.
]

{ #category : 'other' }
HttpLoadBalancer >> getSession [
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
		(Delay forMilliseconds: 10) wait. 			"wait to see if something becomes available"
	].
]

{ #category : 'other' }
HttpLoadBalancer >> serveClientSocket: aSocket router: aRouter [

	Log instance log: #'debug' string: 'HttpLoadBalancer>>serveClientSocket: ' , aSocket printString.
 	^self getSession serveClientSocket: aSocket
]

{ #category : 'other' }
HttpLoadBalancer >> shutdown [

	Log instance log: #'debug' string: 'HttpLoadBalancer>>shutdown'.
	sessions do: [:each | each forceLogout].
	sessions := IdentitySet new.
]
