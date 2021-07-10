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
  instVarNames: #( hostPassword password)
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
set compile_env: 0
! ------------------- Class definition for Html4Element
expectvalue /Class
doit
Object subclass: 'Html4Element'
  instVarNames: #( tag attributes children)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
Html4Element comment: 
'This class represents an HTML Element. To learn more see books about HTML or on-line resources, including the following:
	http://en.wikipedia.org/wiki/HTML_element
	http://www.w3schools.com/html/html_elements.asp

Although you can get a new instance using the class-side #''new'' method, the typical approach is to send the #''html'' message to get a new HTML document (an element with the tag ''html''). This top-level element is initialized with two child elements, a <head> <meta charset="utf-8" />
and a <body>, accessed with the #''head'' and #''body'' messages respectively.

You can set attributes using messages based on the attribute name (e.g., the #''class:'' message will set the element''s class attribute).

You can create additional elements inside the head and/or body by sending messages based on the child element''s tag (e.g., the #''div'' message will create a <div> element). The basic way of creating a child element is based on a unary selector that returns the element. For example, the following creates a <b> element and add to it some text:
	HtmlElement html body bold text: ''Name''.

Most child elements can also be created with a keyword selector that takes a single argument, a one-argument block that receives the new element as an argument. This is useful for setting additional attributes or defining children of the new element (e.g., a <select> element typically has <option> elements as its children). For example:
	HtmlElement html body bold: [:bold | bold text: ''Name''].

Several of the elements also have multi-argument keyword selectors that handle common use-cases. For example:
	HtmlElement html body boldWithText: ''Name''.

The advantage of the last two examples is that they allow cascades to send additional messages to the <body> element while the first example would send additional messages to the <b> element.

Sending #''printString'' to an element shows you how it will be rendered.'
%
expectvalue /Class
doit
Html4Element category: 'Model'
%
set compile_env: 0
! ------------------- Class definition for HtmlElement
expectvalue /Class
doit
Html4Element subclass: 'HtmlElement'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
HtmlElement comment: 
'This class represents an HTML Element. To learn more see books about HTML or on-line resources, including the following:
	http://en.wikipedia.org/wiki/HTML_element
	http://www.w3schools.com/html/html_elements.asp

Although you can get a new instance using the class-side #''new'' method, the typical approach is to send the #''html'' message to get a new HTML document (an element with the tag ''html''). This top-level element is initialized with two child elements, a <head> and a <body>, accessed with the #''head'' and #''body'' messages respectively.

You can set attributes using messages based on the attribute name (e.g., the #''class:'' message will set the element''s class attribute).

You can create additional elements inside the head and/or body by sending messages based on the child element''s tag (e.g., the #''div'' message will create a <div> element). The basic way of creating a child element is based on a unary selector that returns the element. For example, the following creates a <b> element and add to it some text:
	HtmlElement html body bold text: ''Name''.

Most child elements can also be created with a keyword selector that takes a single argument, a one-argument block that receives the new element as an argument. This is useful for setting additional attributes or defining children of the new element (e.g., a <select> element typically has <option> elements as its children). For example:
	HtmlElement html body bold: [:bold | bold text: ''Name''].

Several of the elements also have multi-argument keyword selectors that handle common use-cases. For example:
	HtmlElement html body boldWithText: ''Name''.

The advantage of the last two examples is that they allow cascades to send additional messages to the <body> element while the first example would send additional messages to the <b> element.

Sending #''printString'' to an element shows you how it will be rendered.'
%
expectvalue /Class
doit
HtmlElement category: 'Model'
%
set compile_env: 0
! ------------------- Class definition for HttpRequest
expectvalue /Class
doit
Object subclass: 'HttpRequest'
  instVarNames: #( stream method uri
                    path version headers arguments
                    bodyContents sizeLeft multipartFormDataBoundary)
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
set compile_env: 0
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
set compile_env: 0
! ------------------- Class definition for HttpServer
expectvalue /Class
doit
Object subclass: 'HttpServer'
  instVarNames: #( acceptBlock listenBacklog port
                    socket)
  classVars: #()
  classInstVars: #( requestLog)
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
HttpServer comment: 
'WebApp new startHttpServer.'
%
expectvalue /Class
doit
HttpServer category: 'User Interface'
%
set compile_env: 0
! ------------------- Class definition for HttpConcurrentServer
expectvalue /Class
doit
HttpServer subclass: 'HttpConcurrentServer'
  instVarNames: #( gemCount sessions)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
HttpConcurrentServer comment: 
'sessions:
	A collection of Association instances
		key: GsExternalSession
		value: aBoolean indicating whether session is available'
%
expectvalue /Class
doit
HttpConcurrentServer category: 'User Interface'
%
set compile_env: 0
! ------------------- Class definition for WebApp
expectvalue /Class
doit
HttpServer subclass: 'WebApp'
  instVarNames: #( begin end exception
                    html request response)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
WebApp comment: 
'This is the abstract superclass for a HttpServer delegate.

The required methods are in the ''required'' category.'
%
expectvalue /Class
doit
WebApp category: 'User Interface'
%
set compile_env: 0
! ------------------- Class definition for WebAppSample
expectvalue /Class
doit
WebApp subclass: 'WebAppSample'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
expectvalue /Class
doit
WebAppSample comment: 
'No class-specific documentation for WebAppSample, hierarchy is:
Object
  WebApp( begin end exception html request response)
    WebAppSample( main)
'
%
expectvalue /Class
doit
WebAppSample category: 'User Interface'
%
set compile_env: 0
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

input Html4Element.gs
input HtmlElement.gs
input HttpConcurrentServer.gs
input HttpRequest.gs
input HttpResponse.gs
input HttpServer.gs
input WebApp.gs
input WebAppSample.gs
input WebExternalSession.gs
input WebSocketDataFrame.gs
