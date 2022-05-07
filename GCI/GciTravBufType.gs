! ------------------- Remove existing behavior from GciTravBufType
removeAllMethods GciTravBufType
removeAllClassMethods GciTravBufType
! ------------------- Class methods for GciTravBufType
set compile_env: 0
category: 'Instance Creation'
classmethod: GciTravBufType
new

	^self gcMalloc: 16.
%
category: 'Instance Creation'
classmethod: GciTravBufType
on: aCByteArray

	^self withAll: aCByteArray.
%
! ------------------- Instance methods for GciTravBufType
set compile_env: 0
category: 'Accessing'
method: GciTravBufType
allocatedBytes

	^self uint32At: 0.
%
category: 'Accessing'
method: GciTravBufType
body

	^self _stringFromBytes: (self 
		byteArrayFrom: 8
		to: 15).
%
category: 'Accessing'
method: GciTravBufType
usedBytes

	^self uint32At: 4.
%
set compile_env: 0
category: 'Conversion'
method: GciTravBufType
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
method: GciTravBufType
initialize
%
category: 'Initialization'
method: GciTravBufType
initialize: aCByteArray

	1 to: (self size min: aCByteArray size) do: [:i |
		self uint8At: i put: (aCByteArray uint8At: i).
	].
%
set compile_env: 0
category: 'Updating'
method: GciTravBufType
allocatedBytes: anObject

	self 
		uint32At: 0
		put: anObject.
%
category: 'Updating'
method: GciTravBufType
body: aByteArray

	self
		replaceFrom: 8
		to: 7 + (8 min: aByteArray size)
		with: aByteArray
		startingAt: 1.
%
category: 'Updating'
method: GciTravBufType
usedBytes: anObject

	self 
		uint32At: 4
		put: anObject.
%
