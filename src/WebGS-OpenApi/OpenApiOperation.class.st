"Holds the OpenAPI metadata for a single (method, path) endpoint:
summary, description, tags, parameters, request body, and responses.

Path parameters are auto-derived by OpenApiSpec from the route's path string,
so you usually only declare query parameters, request bodies, and responses here."
Class {
	#name : 'OpenApiOperation',
	#superclass : 'Object',
	#instVars : [
		'summary',
		'description',
		'operationId',
		'tags',
		'parameters',
		'requestBody',
		'responses',
		'responseOrder'
	],
	#category : 'WebGS-OpenApi'
}

{ #category : 'constructors' }
OpenApiOperation class >> new [

	^self basicNew initialize; yourself
]

{ #category : 'building' }
OpenApiOperation >> description: aString [

	description := aString.
]

{ #category : 'building' }
OpenApiOperation >> operationId: aString [

	operationId := aString.
]

{ #category : 'building' }
OpenApiOperation >> queryParam: aName type: aTypeString description: aDescription [

	^self
		queryParam: aName
		type: aTypeString
		required: false
		description: aDescription
]

{ #category : 'building' }
OpenApiOperation >> queryParam: aName type: aTypeString required: aBoolean description: aDescription [

	parameters add: (Dictionary new
		at: 'name' put: aName;
		at: 'in' put: 'query';
		at: 'required' put: aBoolean;
		at: 'description' put: aDescription;
		at: 'schema' put: (OpenApiSchema new type: aTypeString; yourself) asOpenApiDictionary;
		yourself).
]

{ #category : 'building' }
OpenApiOperation >> requestBodyJson: aSchema [

	^self requestBodySchema: aSchema description: nil
]

{ #category : 'building' }
OpenApiOperation >> requestBodySchema: aSchema description: aString [

	| body content |
	content := Dictionary new
		at: 'application/json' put: (Dictionary new
			at: 'schema' put: aSchema asOpenApiDictionary;
			yourself);
		yourself.
	body := Dictionary new
		at: 'required' put: true;
		at: 'content' put: content;
		yourself.
	aString ifNotNil: [body at: 'description' put: aString].
	requestBody := body.
]

{ #category : 'building' }
OpenApiOperation >> response: aCode description: aString [

	^self response: aCode description: aString schema: nil
]

{ #category : 'building' }
OpenApiOperation >> response: aCode description: aString schema: aSchemaOrNil [

	| entry content |
	entry := Dictionary new
		at: 'description' put: aString;
		yourself.
	aSchemaOrNil ifNotNil: [
		content := Dictionary new
			at: 'application/json' put: (Dictionary new
				at: 'schema' put: aSchemaOrNil asOpenApiDictionary;
				yourself);
			yourself.
		entry at: 'content' put: content.
	].
	responses at: aCode printString put: entry.
	responseOrder add: aCode printString.
]

{ #category : 'building' }
OpenApiOperation >> summary: aString [

	summary := aString.
]

{ #category : 'building' }
OpenApiOperation >> tag: aString [

	tags add: aString.
]

{ #category : 'initialization' }
OpenApiOperation >> initialize [

	parameters := Array new.
	responses := Dictionary new.
	responseOrder := Array new.
	tags := Array new.
]

{ #category : 'serialization' }
OpenApiOperation >> asOpenApiDictionaryWithPathParameters: pathParamNames [

	| dict allParams orderedResponses |
	dict := Dictionary new.
	summary ifNotNil: [dict at: 'summary' put: summary].
	description ifNotNil: [dict at: 'description' put: description].
	operationId ifNotNil: [dict at: 'operationId' put: operationId].
	tags isEmpty ifFalse: [dict at: 'tags' put: tags asArray].

	allParams := Array new.
	pathParamNames do: [:name |
		allParams add: (Dictionary new
			at: 'name' put: name;
			at: 'in' put: 'path';
			at: 'required' put: true;
			at: 'schema' put: (Dictionary new at: 'type' put: 'string'; yourself);
			yourself).
	].
	parameters do: [:p | allParams add: p].
	allParams isEmpty ifFalse: [dict at: 'parameters' put: allParams].

	requestBody ifNotNil: [dict at: 'requestBody' put: requestBody].

	orderedResponses := Dictionary new.
	responseOrder do: [:code | orderedResponses at: code put: (responses at: code)].
	orderedResponses isEmpty ifFalse: [dict at: 'responses' put: orderedResponses].

	^dict
]
