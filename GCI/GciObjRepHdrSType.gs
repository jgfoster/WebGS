! ------------------- Remove existing behavior from GciObjRepHdrSType
removeAllMethods GciObjRepHdrSType
removeAllClassMethods GciObjRepHdrSType
! ------------------- Class methods for GciObjRepHdrSType
set compile_env: 0
category: 'Instance Creation'
classmethod: GciObjRepHdrSType
new

	^self gcMalloc: 40.
%
category: 'Instance Creation'
classmethod: GciObjRepHdrSType
on: aCByteArray

	^self withAll: aCByteArray.
%
! ------------------- Instance methods for GciObjRepHdrSType
set compile_env: 0
category: 'Accessing'
method: GciObjRepHdrSType
_idxSizeBits

	^self uint64At: 32.
%
category: 'Accessing'
method: GciObjRepHdrSType
firstOffset

	^self int64At: 24.
%
category: 'Accessing'
method: GciObjRepHdrSType
namedSize

	^self int16At: 4.
%
category: 'Accessing'
method: GciObjRepHdrSType
objectSecurityPolicyId

	^self uint16At: 6.
%
category: 'Accessing'
method: GciObjRepHdrSType
objId

	^self uint64At: 8.
%
category: 'Accessing'
method: GciObjRepHdrSType
oclass

	^self uint64At: 16.
%
category: 'Accessing'
method: GciObjRepHdrSType
valueBuffSize

	^self int32At: 0.
%
set compile_env: 0
category: 'Conversion'
method: GciObjRepHdrSType
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
method: GciObjRepHdrSType
initialize
%
category: 'Initialization'
method: GciObjRepHdrSType
initialize: aCByteArray

	1 to: (self size min: aCByteArray size) do: [:i |
		self uint8At: i put: (aCByteArray uint8At: i).
	].
%
set compile_env: 0
category: 'Updating'
method: GciObjRepHdrSType
_idxSizeBits: anObject

	self 
		uint64At: 32
		put: anObject.
%
category: 'Updating'
method: GciObjRepHdrSType
firstOffset: anObject

	self 
		int64At: 24
		put: anObject.
%
category: 'Updating'
method: GciObjRepHdrSType
namedSize: anObject

	self 
		int16At: 4
		put: anObject.
%
category: 'Updating'
method: GciObjRepHdrSType
objectSecurityPolicyId: anObject

	self 
		uint16At: 6
		put: anObject.
%
category: 'Updating'
method: GciObjRepHdrSType
objId: anObject

	self 
		uint64At: 8
		put: anObject.
%
category: 'Updating'
method: GciObjRepHdrSType
oclass: anObject

	self 
		uint64At: 16
		put: anObject.
%
category: 'Updating'
method: GciObjRepHdrSType
valueBuffSize: anObject

	self 
		int32At: 0
		put: anObject.
%
