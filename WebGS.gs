
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
! ------------------- Class definition for HttpServer
expectvalue /Class
doit
Object subclass: 'HttpServer'
  instVarNames: #( delegate)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()

%
! ------------------- Class definition for HttpsServer
expectvalue /Class
doit
HttpServer subclass: 'HttpsServer'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()
%
! ------------------- Class definition for WebApp
expectvalue /Class
doit
Object subclass: 'WebApp'
  instVarNames: #( begin end exception
                    html request response)
  classVars: #()
  classInstVars: #( log)
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()
%
! ------------------- Class definition for RestSample
expectvalue /Class
doit
WebApp subclass: 'RestSample'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: WebGS
  options: #()
%
