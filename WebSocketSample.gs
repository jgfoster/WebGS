! ------------------- Remove existing behavior from WebSocketSample
removeAllMethods WebSocketSample
removeAllClassMethods WebSocketSample
! ------------------- Class methods for WebSocketSample
set compile_env: 0
category: 'required'
classmethod: WebSocketSample
workerCount
	"Do everything in one Gem"
	^0
%
set compile_env: 0
category: 'startup'
classmethod: WebSocketSample
httpServerClass

	^HttpsServer
%
! ------------------- Instance methods for WebSocketSample
