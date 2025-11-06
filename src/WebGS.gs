! ------- Create dictionary if it is not present
run
| aSymbol names userProfile |
aSymbol := #'WebGS'.
userProfile := System myUserProfile.
names := userProfile symbolList names.
(names includes: aSymbol) ifFalse: [
	| symbolDictionary |
	symbolDictionary := SymbolDictionary new name: aSymbol; yourself.
	userProfile insertDictionary: symbolDictionary at: names size + 1.
].
%
set compile_env: 0
! ------------------- Class definition for WebExternalSession
expectvalue /Class
doit
GsExternalSession subclass: 'WebExternalSession'
  instVarNames: #( hostPassword password isAvailable
                    port)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
WebExternalSession comment: 
'It seems that GsExternalSession does not properly handle hostPassword encryption (see HR9764 and http://kermit.gemtalksystems.com/bug?bug=47308).'
%
expectvalue /Class
doit
WebExternalSession category: 'User Interface'
%
! ------------------- Class definition for AbstractHttpServer
expectvalue /Class
doit
Object subclass: 'AbstractHttpServer'
  instVarNames: #( router)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
AbstractHttpServer comment: 
'Abstract superclass for object that handles socket after listener''s accept'
%
expectvalue /Class
doit
AbstractHttpServer category: 'User Interface'
%
! ------------------- Class definition for HttpLoadBalancer
expectvalue /Class
doit
AbstractHttpServer subclass: 'HttpLoadBalancer'
  instVarNames: #( gemCount mutex server
                    sessions)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #( dbTransient)

%
expectvalue /Class
doit
HttpLoadBalancer comment: 
'sessions:
	A collection of Association instances
		key: GsExternalSession
		value: aBoolean indicating whether session is available'
%
expectvalue /Class
doit
HttpLoadBalancer category: 'User Interface'
%
! ------------------- Class definition for HttpServer
expectvalue /Class
doit
AbstractHttpServer subclass: 'HttpServer'
  instVarNames: #( request response socket)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
HttpServer comment: 
'Sample runHttp.'
%
expectvalue /Class
doit
HttpServer category: 'User Interface'
%
! ------------------- Class definition for WebApp
expectvalue /Class
doit
HttpServer subclass: 'WebApp'
  instVarNames: #( html)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
WebApp comment: 
'This is the abstract superclass for a web application.

The required methods are in the ''required'' category.'
%
expectvalue /Class
doit
WebApp category: 'User Interface'
%
! ------------------- Class definition for Sample
expectvalue /Class
doit
WebApp subclass: 'Sample'
  instVarNames: #( clientString)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
Sample comment: 
'No class-specific documentation for Sample, hierarchy is:
Object
  WebApp( begin end exception html request response)
    Sample( main)
'
%
expectvalue /Class
doit
Sample category: 'User Interface'
%
! ------------------- Class definition for DbTransientSocket
expectvalue /Class
doit
Object subclass: 'DbTransientSocket'
  instVarNames: #( socket)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #( dbTransient)

%
expectvalue /Class
doit
DbTransientSocket comment: 
'It is an error to try to persist a Socket so any object that references a Socket is similarly ineligible to be persisted. This class provides a wrapper for a Socket so the wrapper can be referenced.'
%
expectvalue /Class
doit
DbTransientSocket category: 'User Interface'
%
! ------------------- Class definition for HttpListener
expectvalue /Class
doit
Object subclass: 'HttpListener'
  instVarNames: #( listenBacklog port socket
                    server router)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
HttpListener comment: 
'I listen for incoming requests and am configured with an AbstractHttpServer and Router.'
%
expectvalue /Class
doit
HttpListener category: 'User Interface'
%
! ------------------- Class definition for HttpRequest
expectvalue /Class
doit
Object subclass: 'HttpRequest'
  instVarNames: #( socket stream method
                    uri path version headers
                    arguments bodyContents sizeLeft multipartFormDataBoundary)
  classVars: #()
  classInstVars: #( contentTypeHandlers)
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
HttpRequest category: 'Model'
%
! ------------------- Class definition for HttpResponse
expectvalue /Class
doit
Object subclass: 'HttpResponse'
  instVarNames: #( code headers content
                    sendContentsBlock)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
HttpResponse category: 'Model'
%
! ------------------- Class definition for Log
expectvalue /Class
doit
Object subclass: 'Log'
  instVarNames: #( haltOnError logFileName logTypes)
  classVars: #()
  classInstVars: #( instance)
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
Log category: 'User Interface'
%
! ------------------- Class definition for Route
expectvalue /Class
doit
Object subclass: 'Route'
  instVarNames: #( method pathPieces block)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
Route comment: 
'I describe a route.'
%
expectvalue /Class
doit
Route category: 'User Interface'
%
! ------------------- Class definition for Router
expectvalue /Class
doit
Object subclass: 'Router'
  instVarNames: #( routes)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
Router comment: 
'This is the abstract superclass for a web router.

The required methods are in the ''required'' category.'
%
expectvalue /Class
doit
Router category: 'User Interface'
%
! ------------------- Class definition for WebSocketDataFrame
expectvalue /Class
doit
Object subclass: 'WebSocketDataFrame'
  instVarNames: #( fin rsv1 rsv2
                    rsv3 opcode data)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
WebSocketDataFrame comment: 
'Frame format (best viewed with a fixed-width font!):

      0                   1                   2                   3
      0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
     +-+-+-+-+-------+-+-------------+-------------------------------+
     |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
     |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
     |N|V|V|V|       |S|             |   (if payload len==126/127)   |
     | |1|2|3|       |K|             |                               |
     +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
     |     Extended payload length continued, if payload len == 127  |
     + - - - - - - - - - - - - - - - +-------------------------------+
     |                               |Masking-key, if MASK set to 1  |
     +-------------------------------+-------------------------------+
     | Masking-key (continued)       |          Payload Data         |
     +-------------------------------- - - - - - - - - - - - - - - - +
     :                     Payload Data continued ...                :
     + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
     |                     Payload Data continued ...                |
     +---------------------------------------------------------------+'
%
expectvalue /Class
doit
WebSocketDataFrame category: 'Model'
%

input AbstractHttpServer.gs
input DbTransientSocket.gs
input HttpListener.gs
input HttpLoadBalancer.gs
input HttpRequest.gs
input HttpResponse.gs
input HttpServer.gs
input Log.gs
input Route.gs
input Router.gs
input Sample.gs
input WebApp.gs
input WebExternalSession.gs
input WebSocketDataFrame.gs
