! ------------------- Remove existing behavior from Sample
removeAllMethods Sample
removeAllClassMethods Sample
! ------------------- Class methods for Sample
set compile_env: 0
category: 'other'
classmethod: Sample
runDistributedHttps
"
	Sample runDistributedHttps.
"
	HttpsListener new
		listenBacklog: 100;
		port: 8888;
		webApp: (HttpLoadBalancer for: self gemCount: 2);
		run.
%
category: 'other'
classmethod: Sample
runHttp
"
	Sample runHttp.
"
	HttpListener new
		listenBacklog: 100;
		port: 8888;
		webApp: self;
		run.
%
category: 'other'
classmethod: Sample
runHttps
"
	Sample runHttps.
"
	HttpsListener new
		listenBacklog: 100;
		port: 8888;
		webApp: self;
		run.
%
category: 'required'
classmethod: Sample
htdocs
	"/path/to/static/files"

	| string |
	string := System performOnServer: 'pwd'.
	string := string copyFrom: 1 to: string size - 1.		"remove trailing \n"
	^string
%
! ------------------- Instance methods for Sample
category: 'index'
method: Sample
index

	html head
		addTo: 'load()' script: self load;
		addTo: 'handleAdd()' script: self handleAdd;
		addTo: 'handleStoneConfig()' script: self handleStoneConfig;
		addTo: 'webSocket()' script: self webSocket;
		yourself.
	html body: [:b | b
		h2: [:h1 | h1 addChild: 'Addition'];
		div: [:d | d
			input: [:i | i id: 'x'; type: 'number'];
			addChild: '+';
			input: [:i | i id: 'y'; type: 'number'];
			button: [:bu | bu id: 'addButton'; type: 'button'; addChild: 'POST'];
			input: [:i | i id: 'sum'; type: 'number'];
			yourself.
		];
		hr;
		h2: [:h1 | h1 addChild: 'Stone Configuration'];
		button: [:bu | bu id: 'configButton'; type: 'button'; addChild: 'GET'];
		table: [:t | t
			thead: [:th | th
				tr: [:tr | tr
					th: [:c | c text: 'Key'];
					th: [:c | c text: 'Value'];
					yourself.
				];
				yourself.
			];
			tbody: [:tb | tb yourself];
			yourself.
		];
		hr;
		"https://github.com/tigoe/websocket-examples/blob/main/jsClient/index.html"
		h2: [:h1 | h1 addChild: 'WebSocket Client'];
		p: [:p | p addChild: 'This client connects to a WebSocket server and sends when you press return in the outgoing message box (try "foo").'];
		div: [:d | d
			addChild: 'Connected to server: ';
			span: [:s | s id: 'connection'; addChild: 'false'];	br;
			input: [:i | i type: 'button'; id: 'connectButton'; value: 'Connect']; br;
			addChild: 'Outgoing message: ';
			input: [:i | i type: 'text'; id: 'outgoing']; br;
			addChild: 'Incoming message: ';
			span: [:s | s id: 'incoming']; br;
			yourself.
		];
		yourself.
	];
	yourself.
%
category: 'index'
method: Sample
load

	^'
	handleAdd();
	handleStoneConfig();
	webSocket();
	'
%
category: 'index'
method: Sample
handleAdd

	^'
	document.getElementById("addButton").addEventListener(''click'', getSum);

	// button click callback
	function getSum() {
		var httpRequest = new XMLHttpRequest();

		if (!httpRequest) {
			alert(''Giving up :( Cannot create an XMLHTTP instance'');
			return false;
		}
		let x = document.getElementById(''x'').value;
		let y = document.getElementById(''y'').value;
		httpRequest.onreadystatechange = () => showSum(httpRequest);
		httpRequest.open(''POST'', ''http://localhost:8888/add.gs'');
		httpRequest.setRequestHeader("Content-Type", "application/json");
		httpRequest.send(''{"x":'' + x + '',"y":'' + y + ''}'');
	}

	// received response to request
	function showSum(httpRequest) {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				var response = JSON.parse(httpRequest.responseText);
				let sum = response[''sum''];
				document.getElementById(''sum'').value = sum;
			} else {
				alert(''There was a problem with the request.'');
			}
		}
	}
	'
%
category: 'index'
method: Sample
handleStoneConfig

	^'
	document.getElementById("configButton").addEventListener(''click'', getConfig);

	// button click callback
	function getConfig() {
		httpRequest = new XMLHttpRequest();

		if (!httpRequest) {
			alert(''Giving up :( Cannot create an XMLHTTP instance'');
			return false;
		}
		httpRequest.onreadystatechange = addConfigRows;
		httpRequest.open(''GET'', ''http://localhost:8888/stone.gs'');
		httpRequest.send();
	}

	// received response to request
	function addConfigRows() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				var response = JSON.parse(httpRequest.responseText);
				var tbody = document.querySelector("tbody");
				for (var key in response) {
					if (response.hasOwnProperty(key)) {
						let row = tbody.insertRow();
						let cell = row.insertCell();
						let text = document.createTextNode(key);
						cell.appendChild(text);
						cell = row.insertCell();
						text = document.createTextNode(response[key]);
						cell.appendChild(text);
					}
				}
			} else {
				alert(''There was a problem with the request.'');
			}
		}
	}
	'
%
category: 'index'
method: Sample
webSocket
	"https://github.com/tigoe/websocket-examples/blob/main/jsClient/script.js"
	^'
	const pieces = window.location.href.split('':'');
	const protocol = pieces[0].endsWith(''s'') ? ''wss:'' : ''ws:'';
	const serverURL = protocol + pieces[1] + '':'' + pieces[2] + ''webSocket.gs'';
	console.log(serverURL);

	let socket;
	// variables for the DOM elements:
	let incomingSpan;
	let outgoingText;
	let connectionSpan;
	let connectButton;

	function setup() {
		// get all the DOM elements that need listeners:
		incomingSpan = document.getElementById(''incoming'');
		outgoingText = document.getElementById(''outgoing'');
		connectionSpan = document.getElementById(''connection'');
		connectButton = document.getElementById(''connectButton'');
		// set the listeners:
		outgoingText.addEventListener(''change'', sendMessage);
		connectButton.addEventListener(''click'', changeConnection);
		openSocket(serverURL);
	}

	function openSocket(url) {
		// open the socket:
		socket = new WebSocket(url);
		socket.addEventListener(''open'', openConnection);
		socket.addEventListener(''close'', closeConnection);
		socket.addEventListener(''message'', readIncomingMessage);
	}


	function changeConnection(event) {
		// open the connection if it''s closed, or close it if open:
		if (socket.readyState === WebSocket.CLOSED) {
			openSocket(serverURL);
		} else {
			socket.close();
		}
	}

	function openConnection() {
		// display the change of state:
		connectionSpan.innerHTML = "true";
		connectButton.value = "Disconnect";
	}

	function closeConnection() {
		// display the change of state:
		connectionSpan.innerHTML = "false";
		connectButton.value = "Connect";
	}

	function readIncomingMessage(event) {
		// display the incoming message:
		incomingSpan.innerHTML = event.data;
	}

	function sendMessage() {
		//if the socket''s open, send a message:
		if (socket.readyState === WebSocket.OPEN) {
			socket.send(outgoingText.value);
		}
	}

	setup();
	'
%
category: 'REST API'
method: Sample
add_gs: args

	| x y |
	x := args at: 'x'.
	y := args at: 'y'.
	^Dictionary new
		at: 'sum' put: x + y;
		yourself.
%
category: 'REST API'
method: Sample
echo_gs: args

	"UserGlobals at: #'James' put: args.
	System commit."
	^args
%
category: 'REST API'
method: Sample
stone_gs

	^System stoneConfigurationReport
%
category: 'REST API'
method: Sample
uploadFile_gs

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
%
category: 'WebSockets'
method: Sample
webSocket_gs
	| string |

	request isWebSocketUpgrade ifFalse: [self error: 'Expected a WebSocket protocol!'].
	Log instance log: #'debug' string: 'Sample>>webSocket_gs'.
	"We can send arbitrary data on the socket"
	[
		[
			(Delay forSeconds: 1) wait.
			socket isConnected.
		] whileTrue: [
			WebSocketDataFrame sendText: string printString , ' at ' , Time now printString onSocket: socket.
		].
	] fork.
	"We can receive arbitrary data on the socket.
	The following never returns but quietly terminates when the other side closes the connection"
	self
		wsWithBinaryDo: [:aByteArray |
			Log instance log: #'debug' string: 'Sample>>webSocket_gs - ' , aByteArray printString.
		]
		withTextDo: [:unicode |
			Log instance log: #'debug' string: 'Sample>>webSocket_gs - ' , unicode printString.
			string := unicode asString.
		].
%
