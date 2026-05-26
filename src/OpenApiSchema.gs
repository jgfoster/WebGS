! ------------------- Remove existing behavior from OpenApiSchema
removeallmethods OpenApiSchema
removeallclassmethods OpenApiSchema
! ------------------- Class methods for OpenApiSchema
category: 'constructors'
classmethod: OpenApiSchema
array: itemSchema

	^self new
		type: 'array';
		items: itemSchema;
		yourself
%
category: 'constructors'
classmethod: OpenApiSchema
boolean

	^self new type: 'boolean'
%
category: 'constructors'
classmethod: OpenApiSchema
integer

	^self new type: 'integer'
%
category: 'constructors'
classmethod: OpenApiSchema
new

	^self basicNew initialize; yourself
%
category: 'constructors'
classmethod: OpenApiSchema
number

	^self new type: 'number'
%
category: 'constructors'
classmethod: OpenApiSchema
object

	^self new type: 'object'
%
category: 'constructors'
classmethod: OpenApiSchema
ref: aName
	"A reference to a named schema declared in OpenApiSpec components."

	^self new ref: aName
%
category: 'constructors'
classmethod: OpenApiSchema
string

	^self new type: 'string'
%
! ------------------- Instance methods for OpenApiSchema
category: 'building'
method: OpenApiSchema
description: aString

	description := aString.
%
category: 'building'
method: OpenApiSchema
enum: aCollection

	enum := aCollection.
%
category: 'building'
method: OpenApiSchema
example: anObject

	example := anObject.
%
category: 'building'
method: OpenApiSchema
format: aString

	format := aString.
%
category: 'building'
method: OpenApiSchema
items: aSchema

	items := aSchema.
%
category: 'building'
method: OpenApiSchema
property: aName schema: aSchema

	properties ifNil: [properties := Dictionary new].
	propertyOrder ifNil: [propertyOrder := Array new].
	(properties includesKey: aName) ifFalse: [propertyOrder add: aName].
	properties at: aName put: aSchema.
%
category: 'building'
method: OpenApiSchema
property: aName type: aTypeString

	^self property: aName schema: (OpenApiSchema new type: aTypeString; yourself)
%
category: 'building'
method: OpenApiSchema
property: aName type: aTypeString description: aString

	^self property: aName schema: (OpenApiSchema new
		type: aTypeString;
		description: aString;
		yourself)
%
category: 'building'
method: OpenApiSchema
ref: aName

	ref := aName.
%
category: 'building'
method: OpenApiSchema
required: aCollection

	required := aCollection.
%
category: 'building'
method: OpenApiSchema
type: aString

	type := aString.
%
category: 'initialization'
method: OpenApiSchema
initialize
%
category: 'serialization'
method: OpenApiSchema
asOpenApiDictionary

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
%
