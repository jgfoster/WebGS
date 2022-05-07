! ------------------- Remove existing behavior from GciObjInfoSType
removeAllMethods GciObjInfoSType
removeAllClassMethods GciObjInfoSType
! ------------------- Class methods for GciObjInfoSType
set compile_env: 0
category: 'Instance Creation'
classmethod: GciObjInfoSType
new

	^self gcMalloc: 32.
%
category: 'Instance Creation'
classmethod: GciObjInfoSType
on: aCByteArray

	^self withAll: aCByteArray.
%
! ------------------- Instance methods for GciObjInfoSType
set compile_env: 0
category: 'Accessing'
method: GciObjInfoSType
_bits

	^self uint16At: 30.
%
category: 'Accessing'
method: GciObjInfoSType
namedSize

	^self int32At: 24.
%
category: 'Accessing'
method: GciObjInfoSType
objClass

	^self uint64At: 8.
%
category: 'Accessing'
method: GciObjInfoSType
objectSecurityPolicyId

	^self uint16At: 28.
%
category: 'Accessing'
method: GciObjInfoSType
objId

	^self uint64At: 0.
%
category: 'Accessing'
method: GciObjInfoSType
objSize

	^self int64At: 16.
%
set compile_env: 0
category: 'Conversion'
method: GciObjInfoSType
_stringFromBytes: aByteArray

	| index |
	index := aByteArray indexOf: 0.
	^aByteArray
		at: 1
		sizeBytes: 1
		stringSize: (0 == index ifTrue: [aByteArray size] ifFalse: [index - 1]).
%
set compile_env: 0
category: 'Initialization'
method: GciObjInfoSType
initialize
%
category: 'Initialization'
method: GciObjInfoSType
initialize: aCByteArray

	1 to: (self size min: aCByteArray size) do: [:i |
		self uint8At: i put: (aCByteArray uint8At: i).
	].
%
set compile_env: 0
category: 'Updating'
method: GciObjInfoSType
_bits: anObject

	self 
		uint16At: 30
		put: anObject.
%
category: 'Updating'
method: GciObjInfoSType
namedSize: anObject

	self 
		int32At: 24
		put: anObject.
%
category: 'Updating'
method: GciObjInfoSType
objClass: anObject

	self 
		uint64At: 8
		put: anObject.
%
category: 'Updating'
method: GciObjInfoSType
objectSecurityPolicyId: anObject

	self 
		uint16At: 28
		put: anObject.
%
category: 'Updating'
method: GciObjInfoSType
objId: anObject

	self 
		uint64At: 0
		put: anObject.
%
category: 'Updating'
method: GciObjInfoSType
objSize: anObject

	self 
		int64At: 16
		put: anObject.
%
