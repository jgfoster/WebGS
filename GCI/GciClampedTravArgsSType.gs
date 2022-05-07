! ------------------- Remove existing behavior from GciClampedTravArgsSType
removeAllMethods GciClampedTravArgsSType
removeAllClassMethods GciClampedTravArgsSType
! ------------------- Class methods for GciClampedTravArgsSType
set compile_env: 0
category: 'Instance Creation'
classmethod: GciClampedTravArgsSType
new

	^self gcMalloc: 40.
%
category: 'Instance Creation'
classmethod: GciClampedTravArgsSType
on: aCByteArray

	^self withAll: aCByteArray.
%
! ------------------- Instance methods for GciClampedTravArgsSType
set compile_env: 0
category: 'Accessing'
method: GciClampedTravArgsSType
clampSpec

	^self uint64At: 0.
%
category: 'Accessing'
method: GciClampedTravArgsSType
isRpc

	^self int32At: 32.
%
category: 'Accessing'
method: GciClampedTravArgsSType
level

	^self int32At: 24.
%
category: 'Accessing'
method: GciClampedTravArgsSType
resultOop

	^self uint64At: 8.
%
category: 'Accessing'
method: GciClampedTravArgsSType
retrievalFlags

	^self int32At: 28.
%
category: 'Accessing'
method: GciClampedTravArgsSType
travBuff

	^self
		pointerAt: 16
		resultClass: CByteArray.
%
set compile_env: 0
category: 'Conversion'
method: GciClampedTravArgsSType
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
method: GciClampedTravArgsSType
initialize
%
category: 'Initialization'
method: GciClampedTravArgsSType
initialize: aCByteArray

	1 to: (self size min: aCByteArray size) do: [:i |
		self uint8At: i put: (aCByteArray uint8At: i).
	].
%
set compile_env: 0
category: 'Updating'
method: GciClampedTravArgsSType
clampSpec: anObject

	self 
		uint64At: 0
		put: anObject.
%
category: 'Updating'
method: GciClampedTravArgsSType
isRpc: anObject

	self 
		int32At: 32
		put: anObject.
%
category: 'Updating'
method: GciClampedTravArgsSType
level: anObject

	self 
		int32At: 24
		put: anObject.
%
category: 'Updating'
method: GciClampedTravArgsSType
resultOop: anObject

	self 
		uint64At: 8
		put: anObject.
%
category: 'Updating'
method: GciClampedTravArgsSType
retrievalFlags: anObject

	self 
		int32At: 28
		put: anObject.
%
category: 'Updating'
method: GciClampedTravArgsSType
travBuff: aCByteArray

	self
		pointerAt: 16
		put: aCByteArray.
%
