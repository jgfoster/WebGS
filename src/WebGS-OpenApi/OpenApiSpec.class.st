"Top-level OpenAPI 3.0 document. Populated automatically by DocumentedRouter as
routes are registered; configure title/version/description/servers/schemas
through the spec accessor on a DocumentedRouter."
Class {
	#name : 'OpenApiSpec',
	#superclass : 'Object',
	#instVars : [
		'title',
		'version',
		'description',
		'servers',
		'paths',
		'pathOrder',
		'schemas',
		'schemaOrder'
	],
	#category : 'WebGS-OpenApi'
}

{ #category : 'constructors' }
OpenApiSpec class >> new [

	^self basicNew initialize; yourself
]

{ #category : 'utilities' }
OpenApiSpec class >> openApiPathFor: aWebGsPath [
	"Translate WebGS '/films/:id' into OpenAPI '/films/{id}'."

	| stream pathStream ch paramName |
	stream := WriteStream on: String new.
	pathStream := ReadStream on: aWebGsPath.
	[pathStream atEnd] whileFalse: [
		ch := pathStream next.
		ch == $: ifTrue: [
			paramName := String new.
			[pathStream atEnd not and: [
				| c |
				c := pathStream peek.
				c isLetter or: [c isDigit or: [c == $_]]
			]] whileTrue: [paramName add: pathStream next].
			stream nextPut: ${; nextPutAll: paramName; nextPut: $}.
		] ifFalse: [stream nextPut: ch].
	].
	^stream contents
]

{ #category : 'utilities' }
OpenApiSpec class >> pathParameterNamesIn: aWebGsPath [
	"Extract the parameter names from a WebGS-style path: '/films/:id/views/:k' -> #('id' 'k')."

	| pathStream names ch paramName |
	names := Array new.
	pathStream := ReadStream on: aWebGsPath.
	[pathStream atEnd] whileFalse: [
		ch := pathStream next.
		ch == $: ifTrue: [
			paramName := String new.
			[pathStream atEnd not and: [
				| c |
				c := pathStream peek.
				c isLetter or: [c isDigit or: [c == $_]]
			]] whileTrue: [paramName add: pathStream next].
			names add: paramName.
		].
	].
	^names
]

{ #category : 'building' }
OpenApiSpec >> addOperation: anOperation method: aMethodString path: aPathString [
	"Register an operation under (method, path). Multiple methods on the same path are allowed."

	| openApiPath byMethod |
	openApiPath := self class openApiPathFor: aPathString.
	byMethod := paths at: openApiPath ifAbsent: [
		| m |
		m := Dictionary new.
		paths at: openApiPath put: m.
		pathOrder add: openApiPath.
		m
	].
	byMethod at: aMethodString asLowercase put: (Array with: anOperation with: aPathString).
]

{ #category : 'building' }
OpenApiSpec >> description: aString [

	description := aString.
]

{ #category : 'building' }
OpenApiSpec >> schema: aName definition: aSchema [

	(schemas includesKey: aName) ifFalse: [schemaOrder add: aName].
	schemas at: aName put: aSchema.
]

{ #category : 'building' }
OpenApiSpec >> server: aUrl description: aDescription [

	| entry |
	entry := Dictionary new
		at: 'url' put: aUrl;
		yourself.
	aDescription ifNotNil: [entry at: 'description' put: aDescription].
	servers add: entry.
]

{ #category : 'building' }
OpenApiSpec >> title: aString [

	title := aString.
]

{ #category : 'building' }
OpenApiSpec >> version: aString [

	version := aString.
]

{ #category : 'initialization' }
OpenApiSpec >> initialize [

	title := 'WebGS API'.
	version := '1.0.0'.
	servers := Array new.
	paths := Dictionary new.
	pathOrder := Array new.
	schemas := Dictionary new.
	schemaOrder := Array new.
]

{ #category : 'serialization' }
OpenApiSpec >> asJson [

	^self asOpenApiDictionary asJson
]

{ #category : 'serialization' }
OpenApiSpec >> asOpenApiDictionary [

	| root info pathsDict componentsDict schemasDict |
	root := Dictionary new.
	root at: 'openapi' put: '3.0.3'.

	info := Dictionary new
		at: 'title' put: title;
		at: 'version' put: version;
		yourself.
	description ifNotNil: [info at: 'description' put: description].
	root at: 'info' put: info.

	servers isEmpty ifFalse: [root at: 'servers' put: servers asArray].

	pathsDict := Dictionary new.
	pathOrder do: [:openApiPath |
		| byMethod pathItem |
		byMethod := paths at: openApiPath.
		pathItem := Dictionary new.
		byMethod keysAndValuesDo: [:methodKey :pair |
			| op webGsPath pathParamNames |
			op := pair at: 1.
			webGsPath := pair at: 2.
			pathParamNames := self class pathParameterNamesIn: webGsPath.
			pathItem at: methodKey put: (op asOpenApiDictionaryWithPathParameters: pathParamNames).
		].
		pathsDict at: openApiPath put: pathItem.
	].
	root at: 'paths' put: pathsDict.

	schemas isEmpty ifFalse: [
		schemasDict := Dictionary new.
		schemaOrder do: [:name | schemasDict at: name put: (schemas at: name) asOpenApiDictionary].
		componentsDict := Dictionary new at: 'schemas' put: schemasDict; yourself.
		root at: 'components' put: componentsDict.
	].

	^root
]
