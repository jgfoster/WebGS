"A builder for a JSON Schema fragment used inside an OpenAPI document.

Use class methods (string, integer, number, boolean, object, array:, ref:) to construct,
then send instance messages to add properties, required-lists, descriptions, etc."
Class {
	#name : 'OpenApiSchema',
	#superclass : 'Object',
	#instVars : [
		'type',
		'format',
		'description',
		'example',
		'properties',
		'propertyOrder',
		'required',
		'items',
		'ref',
		'enum'
	],
	#category : 'WebGS-OpenApi'
}

{ #category : 'constructors' }
OpenApiSchema class >> array: itemSchema [

	^self new
		type: 'array';
		items: itemSchema;
		yourself
]

{ #category : 'constructors' }
OpenApiSchema class >> boolean [

	^self new type: 'boolean'
]

{ #category : 'constructors' }
OpenApiSchema class >> integer [

	^self new type: 'integer'
]

{ #category : 'constructors' }
OpenApiSchema class >> new [

	^self basicNew initialize; yourself
]

{ #category : 'constructors' }
OpenApiSchema class >> number [

	^self new type: 'number'
]

{ #category : 'constructors' }
OpenApiSchema class >> object [

	^self new type: 'object'
]

{ #category : 'constructors' }
OpenApiSchema class >> ref: aName [
	"A reference to a named schema declared in OpenApiSpec components."

	^self new ref: aName
]

{ #category : 'constructors' }
OpenApiSchema class >> string [

	^self new type: 'string'
]

{ #category : 'building' }
OpenApiSchema >> description: aString [

	description := aString.
]

{ #category : 'building' }
OpenApiSchema >> enum: aCollection [

	enum := aCollection.
]

{ #category : 'building' }
OpenApiSchema >> example: anObject [

	example := anObject.
]

{ #category : 'building' }
OpenApiSchema >> format: aString [

	format := aString.
]

{ #category : 'building' }
OpenApiSchema >> items: aSchema [

	items := aSchema.
]

{ #category : 'building' }
OpenApiSchema >> property: aName schema: aSchema [

	properties ifNil: [properties := Dictionary new].
	propertyOrder ifNil: [propertyOrder := Array new].
	(properties includesKey: aName) ifFalse: [propertyOrder add: aName].
	properties at: aName put: aSchema.
]

{ #category : 'building' }
OpenApiSchema >> property: aName type: aTypeString [

	^self property: aName schema: (OpenApiSchema new type: aTypeString; yourself)
]

{ #category : 'building' }
OpenApiSchema >> property: aName type: aTypeString description: aString [

	^self property: aName schema: (OpenApiSchema new
		type: aTypeString;
		description: aString;
		yourself)
]

{ #category : 'building' }
OpenApiSchema >> ref: aName [

	ref := aName.
]

{ #category : 'building' }
OpenApiSchema >> required: aCollection [

	required := aCollection.
]

{ #category : 'building' }
OpenApiSchema >> type: aString [

	type := aString.
]

{ #category : 'initialization' }
OpenApiSchema >> initialize [

]

{ #category : 'serialization' }
OpenApiSchema >> asOpenApiDictionary [

	| dict props |
	ref ifNotNil: [
		^Dictionary new
			at: '$ref' put: '#/components/schemas/' , ref;
			yourself
	].
	dict := Dictionary new.
	type ifNotNil: [dict at: 'type' put: type].
	format ifNotNil: [dict at: 'format' put: format].
	description ifNotNil: [dict at: 'description' put: description].
	items ifNotNil: [dict at: 'items' put: items asOpenApiDictionary].
	properties ifNotNil: [
		props := Dictionary new.
		propertyOrder do: [:k |
			props at: k put: (properties at: k) asOpenApiDictionary.
		].
		dict at: 'properties' put: props.
	].
	required ifNotNil: [dict at: 'required' put: required asArray].
	enum ifNotNil: [dict at: 'enum' put: enum asArray].
	example ifNotNil: [dict at: 'example' put: example].
	^dict
]
