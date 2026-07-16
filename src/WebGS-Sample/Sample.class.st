"No class-specific documentation for Sample, hierarchy is:
Object
  WebApp( begin end exception html request response)
    Sample( main)
"
Class {
	#name : 'Sample',
	#superclass : 'WebApp',
	#instVars : [
		'clientString'
	],
	#classVars : [
		'Counter'
	],
	#category : 'WebGS-Sample'
}

{ #category : 'other' }
Sample class >> runDistributedHttp [
"
	Sample runDistributedHttp.
"
	self runDistributedHttp: 4.
]

{ #category : 'other' }
Sample class >> runDistributedHttp: anInteger [
"
	Sample runDistributedHttp: 4.
"
	self htdocs: (System performOnServer: 'pwd') trimSeparators , '/htdocs'.
	System commit.
	HttpListener new
		listenBacklog: 200;
		port: 8888;
		server: (HttpLoadBalancer startServer: self withRouter: nil gemCount: anInteger);
		run.
]

{ #category : 'other' }
Sample class >> runDistributedHttps [
"
	Sample runDistributedHttps.
"
	self runDistributedHttps: 4.
]

{ #category : 'other' }
Sample class >> runDistributedHttps: anInteger [
"
	Sample runDistributedHttps: 4.
"
	self htdocs: (System performOnServer: 'pwd') trimSeparators , '/htdocs'.
	System commit.
	HttpsListener new
		listenBacklog: 200;
		port: 8888;
		server: (HttpLoadBalancer startServer: self withRouter: nil gemCount: anInteger);
		run.
]

{ #category : 'other' }
Sample class >> runHttp [
"
	Sample runHttp.
"
	HttpListener new
		listenBacklog: 200;
		port: 8888;
		server: self;
		run.
]

{ #category : 'other' }
Sample class >> runHttps [
"
	Sample runHttps.
"
	HttpsListener new
		listenBacklog: 100;
		port: 8888;
		server: self;
		run.
]

{ #category : 'REST API' }
Sample >> add_gs: args [
	"localhost:8888/add.gs?x=1&y=2"

	| x y |
	x := (args at: 'x') asInteger.
	y := (args at: 'y') asInteger.
	^Dictionary new
		at: 'sum' put: x + y;
		yourself.
]

{ #category : 'REST API' }
Sample >> counter_gs: args [
	"localhost:8888/counter.gs"

	Counter ifNil: [Counter := 0].
	Counter := Counter + 1.
	System commit.
	^Dictionary new
		at: 'counter' put: Counter;
		yourself.
]

{ #category : 'REST API' }
Sample >> cpu_gs: args [

	| ms endTime |
	ms := (args at: 'ms') asInteger.
	endTime := System _timeGmtFloat + (ms / 1000).
	[System _timeGmtFloat < endTime] whileTrue: [].
	^Dictionary new
		at: 'ms' put: ms;
		yourself
]

{ #category : 'REST API' }
Sample >> echo_gs: args [

	"UserGlobals at: #'James' put: args.
	System commit."
	^args
]

{ #category : 'REST API' }
Sample >> sleep_gs: args [

	| ms |
	ms := (args at: 'ms') asInteger.
	(Delay forMilliseconds: ms) wait.
	^Dictionary new
		at: 'ms' put: ms;
		yourself
]

{ #category : 'REST API' }
Sample >> stone_gs [

	^System stoneConfigurationReport
]

{ #category : 'REST API' }
Sample >> uploadFile_gs [

	| dict headers part pieces size string |
	dict := Dictionary new.
	part := request upToNextPartAsUnicode.	"should be an empty string"
	2 timesRepeat: [
		headers := request nextPartHeaders.		"should be a Dictionary"
		string := headers at: (Unicode7 withAll: 'content-disposition').
		pieces := string subStrings: $;.
		string := ((pieces at: 3) subStrings: $=) at: 2.
		string := string copyFrom: 2 to: string size - 1.
		part := request upToNextPartAsUnicode.	"should be file contents"
		size := part size.
		dict at: string put: size.
	].
	^dict
]

{ #category : 'WebSockets' }
Sample >> webSocket_gs [

	Log instance log: #'debug' string: 'Sample>>webSocket_gs'.
	"We can send arbitrary data on the socket"
	[self wsSendToClient] fork.
	"We can receive arbitrary data on the socket.
	The following never returns but quietly terminates when the other side closes the connection"
	super webSocket_gs.
]

{ #category : 'WebSockets' }
Sample >> wsBinaryData: aByteArray [

	Log instance log: #'debug' string: 'Sample>>webSocket_gs - ' , aByteArray printString.
]

{ #category : 'WebSockets' }
Sample >> wsSendToClient [

	[
		(Delay forSeconds: 1) wait.
		socket isConnected.
	] whileTrue: [
		WebSocketDataFrame sendText: clientString printString , ' at ' , Time now printString onSocket: socket.
	].
]

{ #category : 'WebSockets' }
Sample >> wsTextData: unicode [

	Log instance log: #'debug' string: 'Sample>>webSocket_gs - ' , unicode printString.
	clientString := unicode asString.
]
