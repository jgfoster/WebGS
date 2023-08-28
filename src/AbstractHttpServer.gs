! ------------------- Remove existing behavior from AbstractHttpServer
removeAllMethods AbstractHttpServer
removeAllClassMethods AbstractHttpServer
! ------------------- Class methods for AbstractHttpServer
category: 'other'
classmethod: AbstractHttpServer
serveClientSocket: aSocket router: aRouter

	self subclassResponsibility.
%
! ------------------- Instance methods for AbstractHttpServer
category: 'Initializing'
method: AbstractHttpServer
router: aRouter

	router := aRouter.
%
