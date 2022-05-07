! ------------------- Remove existing behavior from GciTsObjInfo
removeAllMethods GciTsObjInfo
removeAllClassMethods GciTsObjInfo
! ------------------- Class methods for GciTsObjInfo
set compile_env: 0
category: 'Instance Creation'
classmethod: GciTsObjInfo
new

	^self gcMalloc: 40.
%
category: 'Instance Creation'
classmethod: GciTsObjInfo
on: aCByteArray

	^self withAll: aCByteArray.
%
! ------------------- Instance methods for GciTsObjInfo
set compile_env: 0
category: 'Accessing'
method: GciTsObjInfo
_bits

	^self uint16At: 34.
%
category: 'Accessing'
method: GciTsObjInfo
access

	^self uint32At: 28.
%
category: 'Accessing'
method: GciTsObjInfo
namedSize

	^self int32At: 24.
%
category: 'Accessing'
method: GciTsObjInfo
objClass

	^self uint64At: 8.
%
category: 'Accessing'
method: GciTsObjInfo
objectSecurityPolicyId

	^self uint16At: 32.
%
category: 'Accessing'
method: GciTsObjInfo
objId

	^self uint64At: 0.
%
category: 'Accessing'
method: GciTsObjInfo
objSize

	^self int64At: 16.
%
set compile_env: 0
category: 'Conversion'
method: GciTsObjInfo
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
method: GciTsObjInfo
initialize
%
category: 'Initialization'
method: GciTsObjInfo
initialize: aCByteArray

	1 to: (self size min: aCByteArray size) do: [:i |
		self uint8At: i put: (aCByteArray uint8At: i).
	].
%
set compile_env: 0
category: 'Updating'
method: GciTsObjInfo
_bits: anObject

	self 
		uint16At: 34
		put: anObject.
%
category: 'Updating'
method: GciTsObjInfo
access: anObject

	self 
		uint32At: 28
		put: anObject.
%
category: 'Updating'
method: GciTsObjInfo
namedSize: anObject

	self 
		int32At: 24
		put: anObject.
%
category: 'Updating'
method: GciTsObjInfo
objClass: anObject

	self 
		uint64At: 8
		put: anObject.
%
category: 'Updating'
method: GciTsObjInfo
objectSecurityPolicyId: anObject

	self 
		uint16At: 32
		put: anObject.
%
category: 'Updating'
method: GciTsObjInfo
objId: anObject

	self 
		uint64At: 0
		put: anObject.
%
category: 'Updating'
method: GciTsObjInfo
objSize: anObject

	self 
		int64At: 16
		put: anObject.
%
