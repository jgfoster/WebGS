! ------------------- Remove existing behavior from Router
removeAllMethods Router
removeAllClassMethods Router
! ------------------- Class methods for Router
set compile_env: 0
category: 'constructors'
classmethod: Router
new

  ^self basicNew
    initialize;
    yourself
%
! ------------------- Instance methods for Router
set compile_env: 0
category: 'routes'
method: Router
get: aPath do: aBlock

  routes add: (Route method: 'GET' path: aPath block: aBlock)
%
set compile_env: 0
category: 'handler'
method: Router
handle: aRequest

	Log instance log: #'debug' string: 'Router>>handle: ' , aRequest printString.
  routes do: [:each | 
    (each handle: aRequest) ifNotNil: [:response | 
      Log instance log: #'debug' string: response printString.
      ^response
    ].
  ].
  ^nil
%
set compile_env: 0
category: 'routes'
method: Router
head: aPath do: aBlock

  routes add: (Route method: 'HEAD' path: aPath block: aBlock).
%
set compile_env: 0
category: 'initialization'
method: Router
initialize

  routes := Array new.
%
set compile_env: 0
category: 'routes'
method: Router
post: aPath do: aBlock

  routes add: (Route method: 'POST' path: aPath block: aBlock)
%
set compile_env: 0
category: 'routes'
method: Router
put: aPath do: aBlock

  routes add: (Route method: 'PUT' path: aPath block: aBlock)
%
